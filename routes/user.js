var express = require('express');
var router = express.Router();
var userServer=require("../services/user_services.js");

router.post('/login', userServer.login);
router.post("/register",userServer.register);
module.exports = router;
