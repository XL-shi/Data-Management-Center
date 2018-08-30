const express=require("express");
var router=express.Router();
const Captch=require("../services/captcha.js");
//生成验证码
router.get("/gencode",Captch.genCode);
//验证验证码
router.get("/verify",Captch.verifycode)
module.exports=router;