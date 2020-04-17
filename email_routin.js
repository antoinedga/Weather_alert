var schedule = require('node-schedule');
const hours_db = require('./Model/Hours');
const users_db = require("./Model/User");
const axios = require('axios');
var fs = require('fs');
var nodemailer = require('nodemailer');
const Handlebars = require("handlebars");
const isEmpty = require('is-empty');
const mongoose = require('mongoose');
require('dotenv').config();

var transporter;
var current_opt_hour = 0;

var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

function createEmailTransport() {

    transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: process.env.EMAIL,
       pass: process.env.EMAIL_PW
     }
   });
}


  module.exports = function start() {

    createEmailTransport();
    console.log('scheduler started');
    schedule.scheduleJob('55 * * * *', function() {
        var current_time = new Date().getHours() + 1;
        console.log(current_time)
        getUser(current_time).then((result) => {
            result.forEach(report);
        }).catch(err => console.log(err)) ;
    
    });
    
}

function getUser(time) {
    current_opt_hour = time;

    return new Promise((resolve, reject) => {

        hours_db.find({ hours: time }, "user_id -_id")
        .then((result) => {
            if (isEmpty(result))
                return reject(null);
            else {
                return resolve(result);
            }
               
        });
    });

}

function report(user, time) {

    var id = user.user_id;
    console.log(time);

    users_db.findById(id, '-date -password')

    .then((result) => {

        if(result == null)
            return;
        else {
          forecast(result).then((user) => {
            formatTemplate(user);
          });
        }
            
    }).catch((err) => {
        return;
    })

}

function forecast(user) { 

    return new Promise(function (resolve, reject) {

        axios.get(`https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${user.latitude},${user.longitude}?exclude=flags,minutely,daily`)
        .then((result) => {
            var temp = {};
            temp.opt = current_opt_hour;
            temp.greetings = greetings(current_opt_hour);
            temp.hours = result.data.hourly.data.splice(24);
            temp.current = result.data.currently;
            temp.email = user.email;
            temp.location = user.city;
            temp.name = user.name;
         
            return resolve(temp);
        }).catch((err) => {
            return reject(err);
        });

    })

}

function greetings(time) {
    if (time < 12) 
        return "Good Morning";
    if ( time > 12 && time < 6)
        return "Good Afternoon";
    else
        return "Good Evening";
}


Handlebars.registerHelper('msToTime', function msToTime() {

    var temp = new Date(this.time * 1000);
    var hour = temp.getHours();
    var time_day = false;

    if (hour > 12) {
      time_day = true;
      hour = hour - 12;
    }
    if (hour === 0)
      hour = 12;
  
    return ((hour + ":00") + ((time_day) ? "pm" : "am"));
  }
);

Handlebars.registerHelper('roundTemp', function roundTemp() {

    return Math.round(this.temperature);
});

Handlebars.registerHelper("roundUpPrecip", function roundUpPrecip() {

   return ((Math.round( this.precipProbability * 100)) + "%")
});


function formatTemplate(user) {

    readHTMLFile(__dirname + '/Controller/EmailController/emailTemplate.hbs', function(err, html) {
        var template = Handlebars.compile(html);
        var htmlToSend = template(user);
        var options = createMailOption(user.email, htmlToSend);

        
        transporter.sendMail(options, function (error, response) {
            if (error) {
                console.log(error);
            }
        });
    });

}

function createMailOption (email, message) {

    var mailOptions =
        {
        from: 'ag.weatheremail@gmail.com',
        to: email,
        subject: 'Weather Alert Report',
        html: message
      };

    return mailOptions;
  } 
