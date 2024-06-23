// require('dotenv').config();
const express = require("express");
const bodyparser = require("body-parser");
// const ejs = require('ejs');
// const mongoose = require('mongoose');
// const encrypt=require('mongoose-encryption');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
    extended: true
}))


app.get('/', (req, res) => {
    res.render("signin");
});
// app.post("/register", async (req, res) => {
//     const newUser = new User({
//         email: req.body.username,
//         password: req.body.password

//     });
//     // await newUser.save();
//     try {
//         newUser.save();
//         res.render('secrets');
//     } catch (err) {
//         console.log(err);
//     }
// })
app.listen(3000, function () {
    console.log("Server started on port 3000");
})