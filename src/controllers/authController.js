const User = require('../models/user');
const jwt = require('jsonwebtoken');
const home =require('../routes/user')
const OTP=require('../models/OTP');
const bcrypt=require('bcrypt');
// const generateToken = require('../middleware/jwt');
const { sendVerificationEmail } = require('../models/OTP'); 

exports.signup = async (req, res) => {
  try {
    const data = req.body;
    const email= req.body.email;
    const password=req.body.password;
    // console.log(req.body, ' req.body');
    const otp=req.body.otp;
    


    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const recentOTP = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .exec();
      if(!recentOTP){
        return res.status(400).json({message:'otp expired send new otp'});
      }
      // console.log('otp is '.otp,' and recentotp is ',recentOTP.otp);
    if(otp!=recentOTP.otp){
      return res.status(400).json({ error: 'OTP does not match' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update the data object with the hashed password
    data.password = hashedPassword;
    

    // Create a new User document using the Mongoose model
    const newUser = new User(data);

    // Save the new user to the database
    const response = await newUser.save();

    const payload = {
      _id: response._id,
      collegeId: response.collegeId,
      email: response.email
    };

    const token = generateToken(payload);

    // res.status(200).json({ message: "Successfully created account, please login again" });
    res.render('/');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.send("Email not found");
      return;
    }

    // Verify password
    const isPasswordValid = await existingUser.comparePassword(password);

    if (!isPasswordValid) {
      res.send("Password does not match");
      return;
    }

    const token = jwt.sign(
      { name: existingUser.name, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    // Set the token in a cookie
    res.cookie('jwt', token, { httpOnly: true });

    res.redirect('/home');
  } catch (err) {
    console.error('Error during sign-in:', err);
    res.status(500).send('Internal server error');
  }
};

exports.logout = (req, res) => {
  try {
    // Check if the user is logged in via Google
    console.log('req.user is ',req.user);
    if (req.isAuthenticated()) {
      // Logout the user from Google
      req.logout((err) => {
        if (err) {
          console.error('Error during Google logout:', err);
          return res.status(500).send('Internal server error');
        }
        // Clear the Google OAuth2.0 access token from the session
        req.session.destroy();
        // Clear the JWT token from the cookie
        res.clearCookie('jwt');
        // Redirect the user to the login page or any other desired page
        res.redirect('/');
      });
    } else {
      // Clear the JWT token from the cookie
      res.clearCookie('jwt');
      // Redirect the user to the login page or any other desired page
      res.redirect('/');
    }
  } catch (err) {
    console.error('Error during logout:', err);
    res.status(500).send('Internal server error');
  }
};
function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
}