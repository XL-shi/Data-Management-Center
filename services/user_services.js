const userDao=require("../dao/user_dao.js");
const userServer={
    login(req,res,next){
        const {username,password}=req.body;
        userDao.find({username})
        .then(data=>{
            if(data.length===1){
                res.json({res_code:1,res_err:"",res_body:data[0]})
            }else{
                res.json({res_code:-1,res_err:"no",res_body:{}})
            }
        })
        .catch(err=>{
            res.json({res_code:-1,res_err:err,res_body:{}})
        }
        )
    }
}

module.exports = userServer;