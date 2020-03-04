var nodemailer = require('nodemailer');
require('dotenv').config();


var mailOptions;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PW
  }
});


createMailOption(email);

function createMailOption(email_list)
{
    mailOptions =
      {
      from: 'ag.weatheremail@gmail.com',
      to: email_list.join(', '),
      subject: 'Weather Alert',
      text: 'hello bitch! i miss you lol'
    };

}


transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});