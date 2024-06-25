const nodemailer=require('nodemailer');
const User=require('../models/user');
const bcrypt=require('bcrypt');

const securePassword=async(password)=>{
    try{
        const passwordHash=await bcrypt.hash(password,10);
    }catch(error){
        console.log(error.message);
    }
}
// for mail sending 
const sendVerifyMail=async(name,email,user_id)=>{
    try{
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        });
        const mailoption={
            from:'Janmenjay',
            to:email,
            subject:"For verification mail",
            html:'<p>Hi '+name+', please click here to <a href="https://127.0.0.1:3000/verify?id='+user_id+'> verify</a> your mail. </p>'
        }
        transporter.sendMail(mailoption,function(error,info){
            if(error){
                console.log(error);
            }
            else{
                console.log("Email has been sent:-",info.response);
            }
        })
    }catch(error){
        console.log(error);
    }
}

const verifyMail=async(req,res)=>{
    try{
        const updateInfo=await User.updateOne({_id:req.query.id},{$set:{ is_verified:1 }})


        console.log(updateInfo);
        res.render("email-verified");
    }
    catch(error){
        console.log(error);
    }    
}



const loadUser=async(req,res)=>{
    try{
        const email=req.user.email;
        const data=await User.findOne({email});

        console.log(data);
    }
    catch(error){
        console.log(error);
    }
}

const updateUser=async(req,res)=>{
    try{
        const spassword=await securePassword(re.body.password);
        const user=new User({
            name:req.body.name,
            email:req.body.email,
            id:req.body.id,
            password:spassword,
            // is_admin:0,
        });
        const userData=await user.save();

        if(userData){
            sendVerifyMail(req.body.name,req.body.email,userData._id);
            // res.render('registration ',{message:'Your registration has been successfull,please verify your email'})
            res.send('Your registration has been successfull,please verify your email')
        }
    }catch(error){
        res.send('Your registration failed')
    }
}

module.exports={
    verifyMail,
    updateUser,
    sendVerifyMail,
    securePassword,
    loadUser
}