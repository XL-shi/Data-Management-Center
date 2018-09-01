const svgCaptcha=require("svg-captcha");
const Captcha={
    //生成验证码
    genCode(req,res,next){
        const captcha = svgCaptcha.createMathExpr({color:true,background:'#ccc',noise:5});
	    req.session.captcha = captcha.text;
	    res.type('html'); // 使用ejs等模板时如果报错 res.type('html')
	    res.status(200).send(captcha.data);
    },
    // 验证验证码
    verifycode(req,res,next){
        const {code}=req.query;
        if(code.toUpperCase()===req.session.captcha.toUpperCase()){
            res.json({res_code:1,res_err:'',res_body:{valid:true}});
        }else{
            res.json({res_code:-1,res_err:'',res_body:{valid:false}});
        }
    }
};
module.exports=Captcha;