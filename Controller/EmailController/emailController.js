var nodemailer = require('nodemailer');

var mailOptions;
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

function createMailOption(email_list, message)
{
    mailOptions =
      {
      from: 'ag.weatheremail@gmail.com',
      to: email_list.join(', '),
      subject: 'Weather Alert Report',
      text: message
    };

}


transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});