const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
const User = require("../src/models/user");

// User.plugin(passportLocalMongoose);
// User.plugin(findOrCreate);

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
  done(null, { id: user.id, username: user.username, email: user.email });
});


passport.deserializeUser(async (user, done) => {
  try {
    const foundUser = await User.findOne({ email: user.email });
    done(null, foundUser);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/home",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  scope: ['profile', 'email']
}, (accessToken, refreshToken, profile, cb) => {
  const email = profile.emails[0].value;
  if (email.endsWith('@iiit-bh.ac.in') && email.startsWith('b5220')) {
    User.findOrCreate({ email: email }, (err, user) => {
      return cb(err, user);
    });
  } else {
    return cb(null, false, { message: 'Invalid email domain' });
  }
}));

module.exports = passport;