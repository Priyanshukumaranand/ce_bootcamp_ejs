require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const path = require('path');
const multer = require('multer');
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: "Our little secret.",
  resave: true,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  place: String,
  about_me: String,
  instagram: String,
  linkedin: String,
  github: String,
  googleId: String,
  secret: String,
  img: {
    data: Buffer,
    contentType: String
  }
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
  done(null,{ id: user.id, username: user.username, email: user.email });
});

passport.deserializeUser((user, done) => {
  User.findById(user.id, (err, user) => {
    done(err, user);
  });
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
    // console.log(profile)
    User.findOrCreate({ email: email, googleId: profile.id ,username:profile.displayName }, (err, user) => {
      return cb(err, user);
    });
  } else {
    return cb(null, false, { message: 'Invalid email domain' });
  }
}));

app.get("/", (req, res) => {
  res.render("signin");
});

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile", "email"] })
);

app.get("/auth/google/home",
  passport.authenticate('google', { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/home");
  }
);

app.post('/form', (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.session.passport);
    const filter = {email: req.session.passport.user.email };
    User.updateOne(filter, {
      
      about_me: req.body.description,
      place: req.body.place,
      // username: req.body.name,
      instagram: req.body.instagram,
      linkedin: req.body.linkedin,
      github: req.body.github
    }).then((item, err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/home');
      }
    });
  } else {
    res.redirect('/');
  }
});

app.get("/home", (req, res) => {
  if (req.isAuthenticated()) {
    User.find({ "home": { $ne: null } }, (err, foundUsers) => {
      if (err) {
        console.log(err);
      } else {
        if (foundUsers) {
          res.render("homepage");
        }
      }
    });
  } else {
    res.redirect('/');
  }
});

app.get("/submit", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("home");
  } else {
    res.redirect("/login");
  }
});

app.post("/submit", (req, res) => {
  if (req.isAuthenticated()) {
    const submittedSecret = req.body.secret;

    User.findById(req.user.id, (err, foundUser) => {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          foundUser.secret = submittedSecret;
          foundUser.save(() => {
            res.redirect("/secrets");
          });
        }
      }
    });
  } else {
    res.redirect('/login');
  }
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.post("/register", (req, res) => {
  User.register({ username: req.body.username }, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secrets");
      });
    }
  });
});

app.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/homepage");
      });
    }
  });
});

app.get("/home", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("homepage");
  } else {
    res.redirect('/');
  }
});

app.get("/form", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("form");
  } else {
    res.redirect('/');
  }
});

app.get("/about", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("about");
  } else {
    res.redirect('/');
  }
});

app.get("/society", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("society");
  } else {
    res.redirect('/');
  }
 
});

app.get("/batch", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("batch");
  } else {
    res.redirect('/');
  }
 
});

app.listen(3000, () => {
  console.log("Server started on port 3000.");
});
