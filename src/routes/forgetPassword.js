const express = require('express');
const router = express.Router();
const forgetPasswordController=require('../controllers/forgetPasswordController');

// In your routes file
router.get('/forgetPassword', forgetPasswordController.getForgetPasswordPage);


// In your routes file
router.post('/forgetPassword', forgetPasswordController.postForgetPassword);

module.exports = router;