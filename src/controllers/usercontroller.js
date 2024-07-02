// const nodemailer=require('nodemailer');
// const User=require('../models/user');
// const bcrypt=require('bcrypt');

// const securePassword=async(password)=>{
//     try{
//         const passwordHash=await bcrypt.hash(password,10);
//     }catch(error){
//         console.log(error.message);
//     }
// }
// // for mail sending 
// const sendVerifyMail=async(name,email,user_id)=>{
//     try{
//         let transporter=nodemailer.createTransport({
//             host:process.env.MAIL_HOST,
//             port:587,
//             secure:false,
//             requireTLS:true,
//             auth:{
//                 user:process.env.MAIL_USER,
//                 pass:process.env.MAIL_PASS,
//             }
//         });
//         const mailoption={
//             from:'Janmenjay',
//             to:email,
//             subject:"For verification mail",
//             html:'<p>Hi '+name+', please click here to <a href="https://127.0.0.1:3000/verify?id='+user_id+'> verify</a> your mail. </p>'
//         }
//         transporter.sendMail(mailoption,function(error,info){
//             if(error){
//                 console.log(error);
//             }
//             else{
//                 console.log("Email has been sent:-",info.response);
//             }
//         })
//     }catch(error){
//         console.log(error);
//     }
// }

// const verifyMail=async(req,res)=>{
//     try{
//         const updateInfo=await User.updateOne({_id:req.query.id},{$set:{ is_verified:1 }})


//         console.log(updateInfo);
//         res.render("email-verified");
//     }
//     catch(error){
//         console.log(error);
//     }    
// }



// const loadUser=async(req,res)=>{
//     try{
//         const data=req.user;
//         const userdata=await User.findOne({data});
//         res.status(200).render('form.ejs', { userdata });
//         console.log(userdata);
//     }
//     catch(error){
//         console.log(error);
//     }
// }

// const updateUser=async(req,res)=>{
//     try{
//         const spassword=await securePassword(re.body.password);
//         const user=new User({
//             name:req.body.name,
//             email:req.body.email,
//             id:req.body.id,
//             password:spassword,
//             // is_admin:0,
//         });
//         const userData=await user.save();

//         if(userData){
//             sendVerifyMail(req.body.name,req.body.email,userData._id);
//             // res.render('registration ',{message:'Your registration has been successfull,please verify your email'})
//             res.send('Your registration has been successfull,please verify your email')
//         }
//     }catch(error){
//         res.send('Your registration failed')
//     }
// }

// module.exports={
//     verifyMail,
//     updateUser,
//     sendVerifyMail,
//     securePassword,
//     loadUser
// }

const User = require('../models/user');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.email.replace('@', '-')}.${file.mimetype.split('/')[1]}`);
  }
});

const upload = multer({ storage });
exports.getForm = async (req, res) => {
  try {
    const user = req.user;
    const email = user.email;
    const details = await User.findOne({ email });
    res.render('form', {
      user: {
        name: details.name,
        place: details.place,
        about: details.about,
        instagram: details.instagram,
        linkedin: details.linkedin,
        github: details.github,
        profilePicture: user.profilePicture
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const email = req.user.email;
    const { name, place, description, instagram, linkedin, github } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = name;
    user.place = place;
    user.about = description;
    user.instagram = instagram;
    user.linkedin = linkedin;
    user.github = github;

    if (req.file) {
      user.profilePicture.data = req.file.buffer;
      user.profilePicture.contentType = req.file.mimetype;
    }

    await user.save();
    res.redirect(`/form?email=${email}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};