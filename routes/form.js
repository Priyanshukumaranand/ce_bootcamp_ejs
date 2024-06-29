const express = require("express");
const User = require('../models/user');

const router = express.Router();

router.post('/form', (req, res) => {
  if (req.isAuthenticated()) {
    const filter = { email: req.session.passport.user.email };
    User.updateOne(filter, {
      about_me: req.body.description,
      place: req.body.place,
      instagram: req.body.instagram,
      linkedin: req.body.linkedin,
      github: req.body.github
    }).then((err) => {
      if (!err) {
        console.log(err);
      } else {
        res.redirect('/home');
      }
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
