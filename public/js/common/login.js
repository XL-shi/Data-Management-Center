function loginModel(){
    this.addListener();
};
$.extend(loginModel.prototype,{
    addListener(){
        $(window).on("load",this.genCaptchaHandler);
        $(".login-btn").on("click",this.loginHander);
        $(".verify").on("blur",this.verifyHander);
    },
    loginHander(){
        var data=$(".login-form").serialize();
        console.log(data);
        $.post("/users/login",data,(resData)=>{
            console.log(resData);
            if(resData.res_code===1){
                location="/";
            }else{
                alert("用户名或密码错误");
                location.reload();
            }
        });
    },
    //生成验证码
    genCaptchaHandler(){
        $.get("/captcha/gencode",(data)=>{
            $(".verifylog").html(data);
        },"text");
    },
    //验证验证码
    verifyHander(){
        const code=$(".verify").val();
        $.getJSON("/captcha/verify",{code},(data)=>{
        console.log(data);
            if(data.res_code===1){
                $(".writeverify").text("")
            }else{
                $(".writeverify").text("输入有误，重新输入")
  
            }
        });
    }

});
new loginModel();