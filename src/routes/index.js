const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware');
const PostsController = require('../controllers/post-controller');
const User=require('../models/user');
const multer=require('multer');
const userController=require('../controllers/usercontroller');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const firebaseAuthController = require('../controllers/firebase-auth-controller');
const user = require('../models/user');
const {jwtAuthMiddleware, generateToken}=require('../middleware/jwt');


router.get('/', (req, res) => { 
   res.render('signin');   
}); 
// router.post('/signup', async (req, res) => {
//     try {
//         const user = new User({
//             name: req.body.name,
//             id:req.body.id,
//             email: req.body.email,
//             password: req.body.password,
//         });
//         const userData=await user.save(); // Use await with save()


//         req.session.message = {
//             type: 'success',
//             message: 'User added Successfully!',
//         };
//         res.redirect('/home');
//     } catch (err) {
//         res.json({
//             message: err.message,
//             type: 'danger',
//         });
//     }
// });

router.post('/signup', async (req, res) =>{
    try{
        const data = req.body // Assuming the request body contains the person data

        // Create a new Person document using the Mongoose model
        const newUser = new User(data);

        // Save the new person to the database
        const response = await newUser.save();
        console.log('data saved');

        const payload = {
            collegeId: response.collegeId,
            email: response.email
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is : ", token);

        res.status(200).json({message:"Successfully created account please login again"});
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})




// router.post('/login', async (req, res) => {
     
//     const { email, password } = req.body;
    

//     try {
//         // Check if the email exists
//         const existingUser = await User.findOne({ email:req.body.email });

//         if (!existingUser) {
//             // Email not found, redirect to an error page
//             // res.redirect('/signin-error'); // will do ths later
//             res.send("Email not found")
//             return; // Exit early
//         }


//         // Verify password
//         // const isPasswordValid = existingUser.comparePassword(password);

//         if (existingUser.password!=password) {
//             // Incorrect password, redirect to an error page
//             // res.redirect('/signin-error');
//             res.send("Password does not match")
//             return; // Exit early
//         }

//         const token = jwt.sign(
//             { name: existingUser.name, email: existingUser.email },
//             process.env.JWT_SECRET, // Replace with your actual secret key
//             { expiresIn: '1h' } // Token expiration time
//         );
//         user.token=token;
//         user.password=undefined;
//         res.cookie('jwt', token, { httpOnly: true });

//         // Credentials match, redirect to /home
//         res.redirect('/home');
//     } catch (err) {
//         // Handle any errors (e.g., database connection issues)
//         console.error('Error during sign-in:', err);
//         res.status(500).send('Internal server error');
//     }
// });

// router.get('/verify',userController.verifyMail);


// router.get('/users',(req,res)=>{
//     res.send("All Users")
// });

router.post('/login', async(req, res) => {
    try{
        // Extract username and password from request body
        const {email, password} = req.body;

        // Find the user by username
        const user = await User.findOne({email: email});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
            email: user.email
        }
        const token = generateToken(payload);

        // resturn token as response
        // res.json({token});
        res.status(200).json({ token });


        // res.redirect('/home');
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.get('/home', (req, res) => {
    res.render('homepage');
});

// router.get('/batch', (req, res) => {
//     res.render('batch');
// });


router.get('/about', (req, res) => {
    res.render('about');
});
router.get('/society', (req, res) => {
    res.render('society');
});

router.route("/testing").get(userController.loadUser);

router.get('/form', jwtAuthMiddleware, async (req, res) => {
    try{
        // const userData = req.user;
        // console.log("User Data: ", userData);

        // const userId = userData.id;
        // const user = await Person.findById(userId);

        // res.status(200).json({user});
        const user=req.user;
        const email=user.email;
        const details=await User.findOne({email});
        console.log(details);
        
        res.render('form', {
            user: {
              name: user.name,
              place: user.place,
              description: user.description,
              instagram: user.instagram,
              linkedin: user.linkedin,
              github: user.github,
            //   profilePicture: user.profilePicture // Assuming you have a profilePicture field in the user data
            }
          });



    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/batch', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from MongoDB
        console.log(users);
        res.render('batch.ejs', { users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// router.get('/api/posts', verifyToken, PostsController.getPosts);
module.exports = router;