// exports.auth=async (req,res,next)=>{
//     try{
//         // extract token
//         const token= req.cookies.token ||
//         req.body.token || req.header("Authorisation").replace("Bearer ","");

//         // if token is missing 
//         if(!token){
//             return res.status(401).json({
//                 success:false,
//                 message:"Token is missing",
//             })
//         }
//         // verify the token 
//         try{
//             const decode= jwt.verify(token,process.env.JWT_SECRET);
//             console.log(decode);
//             req.user=decode;
//         }catch(err){
//             return res.status(401).json({
//                 success:false,
//                 message:'token is invalid'
//             });
//         }
//         next();
//     }catch(error){
//          return res.status(401).json({
//             success:false,
//             message:"something went wrong while validating the token"
//          })
//     }
// }



// sets up Passport with a local authentication strategy, using a Person model for user data. - Auth.js file

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); // Adjust the path as needed

passport.use(new LocalStrategy(async (email, password, done) => {
    try {
        console.log('Received credentials for email:', email);
        const user = await User.findOne({ email });
        if (!user)
            return done(null, false, { message: 'Incorrect email.' });
        
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch)
            return done(null, user);
        else
            return done(null, false, { message: 'Incorrect password.' })
    } catch (error) {
        return done(error);
    }
}));

module.exports = passport; // Export configured passport