const { default: mongoose } = require("mongoose");
const { type } = require("os");


const userSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true
  },
  id:{
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
//   image:{
//     type:String,
//     required:true,
//   },
  craeted:{
    type:Date,
    required:true,
    default:Date.now,
  },
  // is_admin:{
  //   type:Number,
  //   required:true,
  //   default:0,
  // }
  is_verified:{
    type:Number,
    default:0,
  }
});

module.exports=mongoose.model('User',userSchema);