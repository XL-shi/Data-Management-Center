function registerModel(){
    this.addListener();
}
$.extend(registerModel.prototype,{
    addListener(){
        $(".register-btn").on("click",this.registerHander);
    },
    //注册
    registerHander(){
        let data=$(".register-form").serialize();
        const ensure=$(".old-password").val();
        const old=$(".ensure-password").val();
        if(ensure===old){
            $(".ensureinfo").text("");
            $.post("/users/register",data,resData=>{
                console.log(resData);
                if(resData.res_code===1){
                    alert("成功");
                    location.reload();
                }else{
                    alert("用户名已存在");
                }
            },"json")
        }else{
          $(".ensureinfo").text("两次输入不一致，重输入");
        }  
    },

})
new registerModel();