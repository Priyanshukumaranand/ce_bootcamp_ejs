const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const authController=require('../controllers/authController')
const User=require('../models/user');
const bcrypt=require('bcrypt');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// routes/auth.js
const sendPasswordResetEmail = require('../../utils/sendPasswordResetEmail');

// Reset Password Route
router.get('/reset-password/:token', (req, res) => {
    const { token } = req.params;
  
    // Find the user associated with the reset token
    User.findOne({ passwordResetToken: token, passwordResetExpires: { $gt: Date.now() } })
      .then((user) => {
        if (!user) {
          // If no user is found, display an error message
          req.flash('error', 'Invalid or expired reset password token.');
          return res.redirect('/');
        }
  
        // Render the reset password EJS template
        res.render('reset-password', { token });
      })
      .catch((err) => {
        console.error(err);
        req.flash('error', 'An error occurred while processing the reset password request.');
        res.redirect('/');
      });
  });

  router.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;
  
    try {
      // Find the user associated with the reset token
      const user = await User.findOne({ passwordResetToken: token, passwordResetExpires: { $gt: Date.now() } });
  
      if (!user) {
        // If no user is found, redirect to the login page
        return res.redirect('/');
      }
  
      // Update the user's password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.password=hashedPassword;
  
      // Clear the reset password token and expiration
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
  
      // Save the updated user
      await user.save();
  
      // Redirect the user to the login page
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.redirect('/');
    }
  });

  module.exports = router;