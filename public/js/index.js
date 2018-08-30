function Index() {
    this.addListener();
}
$.extend(Index.prototype, {
    // 注册事件  监听
    addListener(){
        $(".menu-list li").on("click", this.loadRightBox);
        $(".btn-add").on("click", this.addWebInfoHandler);
    },
    loadRightBox(){
        // $(".rightbox").eq($(this).index()).show().siblings().hide();
    },
    addWebInfoHandler(){
        const formData = new FormData($(".web-info-form")[0]);
        $.ajax({
            type:"post",
            url:"/web/add",
            data:formData,
            processData: false,
            contentType: false,
            success: function(data) {
                console.log(data);
                if(data.res_code === 1) {
                    $(".success-popout").removeClass("hide");
                    $(".web-info-form input").val("");
                    $(".web-info-form textarea").val("");
                }
            },
            dataType: "json"
        });
    }
});
new Index();