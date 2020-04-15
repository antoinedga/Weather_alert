var nodemailer = require('nodemailer');

var transporter;

function createEmailTransport() {

   transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PW
    }
  });
}

function createMailOption(email, message) {
  var mailOptions =
      {
      from: 'ag.weatheremail@gmail.com',
      to: email,
      subject: 'Weather Alert Report',
      html: message
    };
    return mailOptions
} 

function sendEmailToUser(user, mesaage, mailOptions) {



  transporter.sendMail(mailOptions, function(error, info){

    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  
  });

}

