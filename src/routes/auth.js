const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const authController=require('../controllers/authController')


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// // const express = require("express");
// const passport = require("passport");

// // const router = express.Router();

// router.get("/google", passport.authenticate('google', { scope: ["profile", "email"] }));

// router.get("/google/home",
//   passport.authenticate('google', { failureRedirect: "/" }),
//   (req, res) => {
//     res.redirect("/home");
//   }
// );






module.exports = router;