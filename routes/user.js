var express = require('express');
var router = express.Router();
var userServer=require("../services/user_services.js");

/* GET users listing. */
router.post('/login', userServer.login);

module.exports = router;
