const express = require("express");
const router = express.Router();
const User = require('../models/user');
router.get("/", (req, res) => {
  res.render("signin");
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/home", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("homepage");
  } else {
    res.redirect('/');
  }
});

router.get("/form", (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    res.render("form", { user });
  } else {
    res.redirect('/');
  }
});

router.get("/about", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("about");
  } else {
    res.redirect('/');
  }
});

router.get("/society", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("society");
  } else {
    res.redirect('/');
  }
});

router.get("/batch", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const users = await User.find().sort('email');
      res.render('batch.ejs', { users });
     
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
      res.redirect('/');
    }
  } else {
    res.redirect('/');
  }
});

module.exports = router;
