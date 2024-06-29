const User = require('../models/user');
const jwt = require('jsonwebtoken');
const home =require('../routes/user')
// const generateToken = require('../middleware/jwt')
exports.signup = async (req, res) => {
  try {
    const data = req.body;
    const { email, otp } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

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

    res.status(200).json({ message: "Successfully created account, please login again" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email exists
    const existingUser = await User.findOne({ email: req.body.email });

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
    // Clear the JWT token from the cookie
    res.clearCookie('jwt');

    // Redirect the user to the login page or any other desired page
    res.redirect('/');
  } catch (err) {
    console.error('Error during logout:', err);
    res.status(500).send('Internal server error');
  }
};

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
}