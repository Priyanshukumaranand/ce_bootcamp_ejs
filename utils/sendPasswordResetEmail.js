const nodemailer = require('nodemailer');

const sendPasswordResetEmail = async (email, resetToken) => {
  // Configure the email transporter
  const transporter = nodemailer.createTransport({
    // Add your email transport configuration here
                host:process.env.MAIL_HOST,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
  });

  // Define the email options
  const mailOptions = {
    from: 'wasteemial9099@gmail.com',
    to: email,
    subject: 'Password Reset Instructions',
    text: `Please click the following link to reset your password: http://127.0.0.1:3000/reset-password/${resetToken}`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendPasswordResetEmail;
