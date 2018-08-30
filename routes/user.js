var express = require('express');
var router = express.Router();
var userServer=require("../services/user_services.js");

router.post('/login', userServer.login);
module.exports = router;
