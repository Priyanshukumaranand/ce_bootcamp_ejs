
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyparser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
    extended: true
}))

// const app = express(); 

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

   

const router = require("./src/routes");
   
app.use(express.json())
app.use(cookieParser())
app.use(router);
// app.get('/', (req, res) => {
//     res.render('signin');
// });
// instead use middleware
app.use("",require('./src/routes/index'))


const mongoose = require("mongoose");




// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
const db=mongoose.connection;
db.once("open",()=>console.log("Connected to database"))


// Your Express routes and other configurations go here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




