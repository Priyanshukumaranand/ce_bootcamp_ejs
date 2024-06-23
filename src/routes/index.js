const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware');
const PostsController = require('../controllers/post-controller');
const User=require('../models/user');
const multer=require('multer');

var storage=multer.diskStorage({
    destination:function(req,file,cd){
        cd(null,'./uploads');
    },
    filename:function(req,file,cd){
        CSSLayerBlockRule(null,file.fieldname+"_"+Date.now()+"_"+file.originalname);
    },
});

var upload = multer({
    storage:storage
})

const firebaseAuthController = require('../controllers/firebase-auth-controller');

router.post('/api/register', firebaseAuthController.registerUser);
router.post('/api/login', firebaseAuthController.loginUser);
router.post('/api/logout', firebaseAuthController.logoutUser);
// router.post('/api/reset-password', firebaseAuthController.resetPassword);

router.get('/', (req, res) => { 
   res.render('signin');   
}); 
router.post('/signup', async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            id:req.body.id,
            email: req.body.email,
            password: req.body.password,
        });
        await user.save(); // Use await with save()

        req.session.message = {
            type: 'success',
            message: 'User added Successfully!',
        };
        res.redirect('/home');
    } catch (err) {
        res.json({
            message: err.message,
            type: 'danger',
        });
    }
});




router.post('/signin', async (req, res) => {
     
    const { email, password } = req.body;

    try {
        // Check if the email exists
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            // Email not found, redirect to an error page
            // res.redirect('/signin-error'); // will do ths later
            res.send("Email not found")
            return; // Exit early
        }

        // Verify password
        const isPasswordValid = existingUser.comparePassword(password);

        if (!isPasswordValid) {
            // Incorrect password, redirect to an error page
            // res.redirect('/signin-error');
            res.send("Password does not match")
            return; // Exit early
        }

        // Credentials match, redirect to /home
        res.redirect('/home');
    } catch (err) {
        // Handle any errors (e.g., database connection issues)
        console.error('Error during sign-in:', err);
        res.status(500).send('Internal server error');
    }
});




router.get('/users',(req,res)=>{
    res.send("All Users")
});

router.get('/home', (req, res) => {
    res.render('homepage');
});

router.get('/batch', (req, res) => {
    res.render('batch');
});


router.get('/about', (req, res) => {
    res.render('about');
});
router.get('/society', (req, res) => {
    res.render('society');
});


// router.get('/api/posts', verifyToken, PostsController.getPosts);
module.exports = router;