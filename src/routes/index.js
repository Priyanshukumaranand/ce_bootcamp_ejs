const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/post-controller');
const User=require('../models/user');
const multer=require('multer');
const userController=require('../controllers/usercontroller');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const {jwtAuthMiddleware, generateToken}=require('../middleware/jwt');
const path = require('path');
const OTP=require('../models/OTP');
const sendOTP=require('../controllers/usercontroller');
router.get('/', (req, res) => { 
   res.render('signin');   
}); 
// router.post("/sendotp",userController.sendOTP);

router.post('/signup', async (req, res) => {
  try {
      const data = req.body; // Assuming the request body contains the person data
      // console.log(req.user," req.user");
      const { email, otp } = req.body;

      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ error: 'Email already exists' });
      }

      // find the most recent otp stored for the user
      // const recentOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

      // // validate otp
      // if (recentOTP.length === 0) {
      //     // OTP not found
      //     return res.status(400).json({
      //         success: false,
      //         message: "OTP not found",
      //     });
      // } else if (otp !== recentOTP[0].otp) {
      //     // Invalid OTP
      //     return res.status(400).json({
      //         success: false,
      //         message: "OTP not valid",
      //     });
      // }

      // Create a new Person document using the Mongoose model
      const newUser = new User(data);

      // Save the new person to the database
      const response = await newUser.save(); // here the password is hashed inside model
      console.log('data saved');

      const payload = {
          _id: response._id,
          collegeId: response.collegeId,
          email: response.email
      };
      console.log(JSON.stringify(payload), " JSON.stringify(payload)");
      const token = generateToken(payload);
      console.log("Token is : ", token);

      res.status(200).json({ message: "Successfully created account, please login again" });
      // res.redirect('/home',{email});
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email exists
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      // Email not found, redirect to an error page
      // res.redirect('/signin-error'); // will do this later
      res.send("Email not found");
      return; // Exit early
    }

    // Verify password
    const isPasswordValid = await existingUser.comparePassword(password);

    if (!isPasswordValid) {
      // Incorrect password, redirect to an error page
      // res.redirect('/signin-error');
      res.send("Password does not match");
      return; // Exit early
    }

    const token = jwt.sign(
      { name: existingUser.name, email: existingUser.email },
      process.env.JWT_SECRET, // Replace with your actual secret key
      { expiresIn: '24h' } // Token expiration time
    );

    // Set the token in a cookie
    res.cookie('jwt', token, { httpOnly: true });

    // Credentials match, redirect to /home
    res.redirect('/home');
  } catch (err) {
    // Handle any errors (e.g., database connection issues)
    console.error('Error during sign-in:', err);
    res.status(500).send('Internal server error');
  }
});



router.post('/logout', (req, res) => {
  try {
    // Clear the JWT token from the cookie
    res.clearCookie('jwt');

    // Redirect the user to the login page or any other desired page
    res.redirect('/');
  } catch (err) {
    console.error('Error during logout:', err);
    res.status(500).send('Internal server error');
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

// router.route("/testing").get(userController.loadUser);

router.get('/form', jwtAuthMiddleware, async (req, res) => {
    try{
        
        const user=req.user;
        const email=user.email;
        const details=await User.findOne({email});
        // console.log(details);
        // console.log(user);
        
        res.render('form', {
            user: {
              name: details.name,
              place: details.place,
              about: details.about,
              instagram: details.instagram,
              linkedin: details.linkedin,
              github: details.github,
              profilePicture: user.profilePicture // Assuming you have a profilePicture field in the user data
            }
          });



    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')},
  filename: (req, file, cb) => {
    cb(null, `${req.user.email.replace('@', '-')}.${file.mimetype.split('/')[1]}`);
  }
});

const upload = multer({ storage });
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));



router.post('/update-profile', jwtAuthMiddleware, upload.single('profilePicture'), async (req, res) => {
    try {
      const email = req.user.email; // Convert ObjectId to string
      const { name, place, description, instagram, linkedin, github} = req.body;
    //   console.log(userId);
    //   console.log(req.user);
      // Find the user by ID and update the profile information
      const user = await User.findOne({email});
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.name = name;
      user.place = place;
      user.about = description;
      user.instagram = instagram;
      user.linkedin = linkedin;
      user.github = github;
      
      // console.log(req.body);
      
      console.log(req.file, ' req.file');
      if (req.file) {
        user.profilePicture.data = req.file.buffer;
        user.profilePicture.contentType = req.file.mimetype;
      }

      await user.save();
  
    //   res.status(200).json({ message: 'Profile updated successfully', user });
    res.redirect(`/form?email=${email}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


router.get('/batch',jwtAuthMiddleware,async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from MongoDB
        // console.log(users);
        res.render('batch.ejs', { users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// router.get('/api/posts', verifyToken, PostsController.getPosts);
module.exports = router;