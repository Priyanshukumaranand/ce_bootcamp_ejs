const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const User=require('../models/user');

// Configure rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

// Apply rate limiter to the /form route
router.get('/form', limiter, async (req, res) => {
    try{
        
        const user=req.user;
        const email=user.email;
        const details=await User.findOne({email});
        // console.log(details);
        // console.log(user);
        
        res.render('form', {
            user: {
              name: details.name,
              place: details.place,
              about: details.about,
              instagram: details.instagram,
              linkedin: details.linkedin,
              github: details.github,
              
            }
          });



    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports=router;