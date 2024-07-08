const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
const User = require("../src/models/user");

// Plugins for User model
// User.plugin(passportLocalMongoose);
// User.plugin(findOrCreate);

// Passport local strategy
passport.use(User.createStrategy());

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, { id: user.id, name: user.name, email: user.email });
});

// Deserialize user from session
passport.deserializeUser(async (user, done) => {
  try {
    const foundUser = await User.findOne({ email: user.email });
    done(null, foundUser);
  } catch (err) {
    done(err, null);
  }
});

// Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/home",
  // callbackURL: "https://ce-bootcamp-ejs.onrender.com/auth/google/home",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, cb) => {
  try {
    const email = profile.emails[0].value;

    if (!email.endsWith('@iiit-bh.ac.in') || !email.startsWith('b5220')) {
      return cb(null, false, { message: 'Invalid email domain' });
    }

    // Find or create the user
    const result = await User.findOrCreate({ email });
    const user = result.doc;

    // Update user information
    const updatedUser = await User.findOneAndUpdate(
      { email }, // Filter to find the user
      { googleId: profile.id, name: profile.displayName ,collegeId:email.substring(0, 7)}, // Data to update
      { new: true } // Return the updated document
    );

    return cb(null, updatedUser);
  } catch (err) {
    return cb(err);
  }
}));

module.exports = passport;