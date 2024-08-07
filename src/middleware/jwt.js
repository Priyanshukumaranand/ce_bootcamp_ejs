const jwt = require('jsonwebtoken');
// const jwtAuthMiddleware = (req, res, next) => {



//     // Check if the JWT token is present in the cookie
//     const token = req.cookies.jwt;
//     if (!token) {

//       return res.status(401).json({ error: 'Token Not Found' });
//     }
  
//     try {
//       // Verify the JWT token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
//       // Attach user information to the request object
//       req.user = decoded;
//       next();
//     } catch (err) {
//       console.error(err);
//       res.status(401).json({ error: 'Invalid token' });
//     }
//   };


// Function to generate JWT token

const jwtAuthMiddleware = (req, res, next) => {
  // Check if the JWT token is present in the cookie
  const token = req.cookies.jwt;
  if (token) {
    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Attach user information to the request object
      req.user = decoded;
      return next();
    } catch (err) {
      console.error(err);
      // Replace the error message with a custom message
      return res.status(401).render('error', { message: 'Invalid token. Please log in again.' });
    }
  }

  // Check if the user is authenticated via Google sign-in
  if (req.session.passport && req.session.passport.user) {
    req.user = { email: req.session.passport.user.email };
    return next();
  }

  // Replace the error message with a custom message and redirect to the "/" route
  return res.status(401).render('error', { message: 'You are not logged in. Please log in to access this page.' }, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('error');
  });
};

const generateToken = (userData) => {
    // Generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 30000});
}

module.exports = {jwtAuthMiddleware, generateToken};