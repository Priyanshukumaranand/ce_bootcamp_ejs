const express = require('express');
const router = express.Router();
const forgetPasswordController=require('../controllers/forgetPasswordController');
const rateLimit = require('express-rate-limit');

// Set up rate limiter: maximum of 5 requests per minute
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5 // limit each IP to 5 requests per windowMs
});

// In your routes file
router.get('/forgetPassword', forgetPasswordController.getForgetPasswordPage);


// In your routes file
router.post('/forgetPassword', limiter, forgetPasswordController.postForgetPassword);

module.exports = router;