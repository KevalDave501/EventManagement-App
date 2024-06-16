const nodemailer = require('nodemailer');
const userModel = require('../models/userModel');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'kevalsdave@gmail.com',
    pass: 'azef tpxd wzof cuux'
  }
});

const sendSignupMail = async (userName, userEmail) => {
    try {
      const admins = await userModel.findAll({ where: { r_type: 'admin' } });
  
      const mailOptions = {
        from: "kevalsdave@gmail.com",
        subject: 'Signup Process',
        text: `${userName} is trying to create a new account. Please accept or reject the request. Visit: http://localhost:3000/adminDashboard`
      };
  
      for (const admin of admins) {
        mailOptions.to = admin.u_email;
        await transporter.sendMail(mailOptions);
      }
  
      console.log('Emails sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };  

const sendPasswordResetEmail = async (u_email, token) => {
  try {
    const resetLink = `http://localhost:3000/resetPassword?token=${token}`;
    const mailOptions = {
      from: 'kevalsdave@gmail.com',
      to: u_email,
      subject: 'Password Reset Request',
      html: `<p>You are receiving this email because a password reset request was received for your account.</p>
            <p>Please click the following link to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent: ', info.messageId);
  } catch (error) {
    console.error('Error sending password reset email: ', error);
    throw new Error('Failed to send password reset email.');
  }
};

module.exports = {
  sendSignupMail,
  sendPasswordResetEmail
};
