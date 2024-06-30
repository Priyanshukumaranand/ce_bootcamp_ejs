const User = require('../models/user');
const sendPasswordResetEmail = require('../../utils/sendPasswordResetEmail');
const {generateToken}=require('../middleware/jwt')
// In your forgetPasswordController.js
exports.getForgetPasswordPage = (req, res) => {
  res.render('forgetPassword');
};

// In your forgetPasswordController.js
exports.postForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log('email in req.body is ', email);
    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email not found' });
    }

    // Generate a password reset token
    const resetToken =await generateToken({email});
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send the password reset email
    await sendPasswordResetEmail(email, resetToken);

    res.status(200).json({ message: 'Password reset instructions sent to your email' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

