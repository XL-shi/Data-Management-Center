function loginModel(){
    this.addListener();
};
$.extend(loginModel.prototype,{
    addListener(){
        $(window).on("load",this.genCaptchaHandler);
        $(".login-btn").on("click",this.loginHander);
    },
    loginHander(){
        const code=$(".verify").val();
        $.getJSON("/captcha/verify",{code},(data)=>{
            console.log(data);
                if(data.res_code===1){
                      
                    $(".writeverify").text("");
        var data=$(".login-form").serialize();

                       $.post("/users/login",data,(resData)=>{
                console.log(resData);
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
    },
  

});
new loginModel();