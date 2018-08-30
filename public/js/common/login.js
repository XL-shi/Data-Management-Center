function loginModel(){
    this.addListener();
};
$.extend(loginModel.prototype,{
    addListener(){
        $(".login-btn").on("click",this.loginHander)
    },
    loginHander(){
        var data=$(".login-form").serialize();
        console.log(data);
        $.post("/users/login",data,(resData)=>{
            console.log(resData);
            if(resData.res_code===1){
                location="/";
            }else{
                alert("不对头")
            }
        })
    }
});
new loginModel();