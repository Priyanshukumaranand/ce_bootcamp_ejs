require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("./config/passport");
const PORT = process.env.PORT || 3000;
const app = express();

// Express setup
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Session setup
app.use(session({
  secret: "Our little secret.",
  resave: true,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// MongoDB setup
mongoose.connect(process.env.MONGODB_URI, {});
// mongoose.set("useCreateIndex", true);

// Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const formRoutes = require('./routes/form');

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/", uploadRoutes);
app.use("/", formRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
