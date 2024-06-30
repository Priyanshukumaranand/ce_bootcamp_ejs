const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { jwtAuthMiddleware, generateToken } = require('../middleware/jwt');
const multer = require('multer');
const path = require('path');
const fs=require('fs');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

const upload = multer({ storage });
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

router.get('/form', jwtAuthMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const email = user.email;
    const details = await User.findOne({ email });
    res.render('form', {
      user: {
        name: details.name,
        place: details.place,
        about: details.about,
        instagram: details.instagram,
        linkedin: details.linkedin,
        github: details.github,
        // profilePicture: user.profilePicture
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




router.post('/update-profile', jwtAuthMiddleware, upload.single('profilePicture'), async (req, res) => {
    try {
      let email;
      if (req.user.email) {
        email = req.user.email;
      } else if (req.session.passport && req.session.passport.user) {
        email = req.session.passport.user.email;
      } else {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      const { name, place, collegeId, description, instagram, linkedin, github } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.name = name;
      user.email = email;
      user.collegeId = collegeId;
      user.place = place;
      user.about = description;
      user.instagram = instagram;
      user.linkedin = linkedin;
      user.github = github;
  
      if (req.file) {
        user.img.data = fs.readFileSync(req.file.path);
        user.img.contentType = req.file.mimetype;
      }
  
      await user.save();
      res.redirect(`/form?email=${email}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;