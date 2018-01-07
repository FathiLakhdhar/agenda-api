const nodemailer = require('nodemailer');

function mailer(mailOptions) {


  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'calendly.tn@gmail.com',
      pass: 'azerty#0000#'
    }
  });


  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });

}


module.exports = mailer;
