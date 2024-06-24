const { default: mongoose } = require("mongoose");


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
  }
});

module.exports=mongoose.model('User',userSchema);