const { default: mongoose } = require("mongoose");
const { type } = require("os");
const bcrypt=require('bcrypt');


const userSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true
  },
  collegeId:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  image:{
    type:String,
  },
  craeted:{
    type:Date,
    required:true,
    default:Date.now,
  },
  is_admin:{
    type:Number,
    
    default:0,
  },
  is_verified:{
    type:Number,
    default:0,
  },
  place:{
    type:String,
  },
  about:{
    type:String
  },
  instagram:{
    type:String
  },
  linkedin:{
    type:String
  },
  github:{
    type:String
  },
  profilePicture: {
    data: Buffer,
    contentType: String
  },
});

userSchema.pre('save', async function(next){
  const user = this;

  // Hash the password only if it has been modified (or is new)
  if(!user.isModified('password')) return next();

  try{
      // hash password generation
      const salt = await bcrypt.genSalt(10);

      // hash password
      const hashedPassword = await bcrypt.hash(user.password, salt);
      
      // Override the plain password with the hashed one
      user.password = hashedPassword;
      next();
  }catch(err){
      return next(err);
  }
})

userSchema.methods.comparePassword = async function(candidatePassword){
  try{
      // Use bcrypt to compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch;
  }catch(err){
      throw err;
  }
}


module.exports=mongoose.model('User',userSchema);