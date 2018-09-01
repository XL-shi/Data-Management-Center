const userDao=require("../dao/user_dao.js");
const bcrypt=require("bcrypt");
const userServer={
    // 登录
    login(req,res,next){
        const {username,password}=req.body;
        userDao
        .find({username})
        .then(data=>{
           if(data.length===1){
               const _pass=data[0].password;
               if(bcrypt.compareSync(password, _pass)){
                    // 保存登录的用户名
                    req.session.loginUser = username;
                    res.json({res_code:1,res_err:"",res_body:data[0]});
               }else{
                    res.json({res_code:-1,res_err:"no exist",res_body:{}});
               }
           }else{
                res.json({res_code:-1,res_err:"no exist",res_body:{}});
           }
        })
        .catch(err=>{
            res.json({res_code:-1,res_err:err,res_body:{}});
        });
    },
    // 添加会员
    register(req,res,next){
        const {username,password}=req.body;
        var hash = bcrypt.hashSync(password, 10);
        userDao
        .save({username,password:hash})
        .then(data=>{
            res.json({res_code:1,res_err:"",res_body:data});
        })
        .catch(err=>{
            res.json({res_code:-1,res_err:err,res_body:{}});
        })
    },
    // 退出登录
    loginout(req, res, next) {
        req.session.loginUser = null;
        res.json({res_code:1, res_err:"", res_body: {}});
    },
};
module.exports = userServer;