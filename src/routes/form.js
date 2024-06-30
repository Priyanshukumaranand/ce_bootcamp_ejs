const express = require('express');
const { jwtAuthMiddleware } = require('../middleware/jwt');
const router = express.Router();
const User=require('../models/user');


router.get('/form', async (req, res) => {
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