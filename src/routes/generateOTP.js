const express = require('express');
const OTP=require('../models/OTP');
const User=require('../models/user');
const { sendVerificationEmail } = require('../models/OTP'); 


exports.generateOTP = async (req, res) => {
    try {
      const { email } = req.body;
  
      if (!email || email.trim() === '') {
        return res.status(400).json({ error: 'Email is required' });
      }
  
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpDocument = await OTP.create({ email, otp });
      console.log('otpDocument is ', otpDocument);
  
      await sendVerificationEmail(email, otp);
  
      res.status(200).json({ otp });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  