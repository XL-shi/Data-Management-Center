const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost/webinfo');

//usermodel
const User=mongoose.model("user",{
    username:String,
    password:String
});

//webinfolistmodel
const Web = mongoose.model("web", {
    title: String,
    logo: String,
    domain: String,
    keyword: String,
    desc: String,
    linkman: String,
    email: String
});
  module.exports={User, Web};