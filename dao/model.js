const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost/webinfo');
//usermodel
const User=mongoose.model("user",{
    username:String,
    password:String
});
//positionmodel
  module.exports={User};