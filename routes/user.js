var express = require('express');
var router = express.Router();
var userServer=require("../services/user_services.js");
// 用户登录
router.post('/login', userServer.login);
// 退出登录
router.get("/loginout", userServer.loginout);
// 添加会员
router.post("/register",userServer.register);
module.exports = router;
