require("dotenv").config();
const express = require('express');
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("./config/passport");
const app = express();
// Express setup
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));
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
mongoose.connect(process.env.MONGODB_URI);

const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
    extended: true
}))



app.use(
    session({
        secret:"My secret key",
        saveUninitialized:true,
        resave:false,
    })
);

app.use((req,res,next)=>{
    res.locals.message=req.session.message;
    delete req.session.message;
    next();
});
app.get('/', (req, res) => { 
    res.render('signin');   
 }); 

   
// const indexRoutes = require('./src/routes/index');
const aboutRoutes=require('./src/routes/about');
const authRoutes = require('./src/routes/auth');
const batchRoutes=require('./src/routes/batch');
const homeRoutes=require('./src/routes/home');
const societyRoutes=require('./src/routes/society');
const userRoutes=require('./src/routes/user');
const uploadRoutes = require('./src/routes/upload');
const AuthorisationRoutes=require('./src/routes/Authorisation');


// app.use('/', indexRoutes);
app.use('/', aboutRoutes);
app.use('/', authRoutes);
app.use('/Auth',AuthorisationRoutes);
app.use('/', batchRoutes);
app.use('/', homeRoutes);
app.use('/', societyRoutes);
app.use('/', userRoutes);
app.use("/", uploadRoutes);


// OTP verification 
const OTP = require('./src/models/OTP');



// Connect to MongoDB

const db=mongoose.connection;
db.once("open",()=>console.log("Connected to database"))


// Your Express routes and other configurations go here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




