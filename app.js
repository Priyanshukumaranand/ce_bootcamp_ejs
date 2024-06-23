
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyparser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
    extended: true
}))

// const app = express(); 


   
// app.get('/', (req, res) => { 
//    res.sendFile('signin');   
// }); 
const router = require("./src/routes");
   
app.use(express.json())
app.use(cookieParser())
app.use(router);
app.get('/', (req, res) => {
    res.render('signin');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});