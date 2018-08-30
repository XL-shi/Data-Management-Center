function Index() {
    this.addListener();
}
$.extend(Index.prototype, {
    // 注册事件  监听
    addListener(){
        $(".menu-list li").on("click", this.loadRightBox);
    },
    loadRightBox(){
        $(".rightbox").eq($(this).index()).show().siblings().hide();
    }
});
new Index();