const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');

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
  img: {
    data: Buffer,
    contentType: String
  },
  time : { type : Date, default: Date.now },
  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
