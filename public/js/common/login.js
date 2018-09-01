function loginModel(){
    this.addListener();
};
// 登录页面的原型扩展
$.extend(loginModel.prototype,{
    // 添加事件监听
    addListener(){
        $(window).on("load",this.genCaptchaHandler);
        $(".login-btn").on("click",this.loginHander);
    },
    // 登录并验证
    loginHander(){
        const code=$(".verify").val();
        $.getJSON("/captcha/verify",{code},(data)=>{
            if(data.res_code===1){
                $(".writeverify").text("");
                var data=$(".login-form").serialize();
                $.post("/users/login",data,(resData)=>{
                    if(resData.res_code===1){
                        sessionStorage.loginUser = JSON.stringify(resData.res_body);
                        location="/";
                    }else{
                        alert("用户名或密码错误");
                        location.reload();
                    }
            })
                }else{
                    $(".writeverify").text("输入有误，重新输入")  
                }
            });
    },
    //生成验证码
    genCaptchaHandler(){
        $.get("/captcha/gencode",(data)=>{
            $(".verifylog").html(data);
        },"text");
    }
});
new loginModel();