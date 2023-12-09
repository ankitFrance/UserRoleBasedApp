const nodemailer = require('nodemailer');

async function sendVerificationEmail(email, verificationToken) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'infoankitkumar6@gmail.com',
      pass: 'nemi zxvh ousc ykmi', // replace with your Gmail  App Password
    },
  });

  const verificationLink = `http://localhost:3080/auth/verify?token=${verificationToken}`;
  const mailOptions = {
    from: 'infoankitkumar6@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Click on the link to verify your email: ${verificationLink}`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendVerificationEmail };