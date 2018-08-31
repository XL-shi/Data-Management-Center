function Index() {
    this.addListener();
    this.load();
    this.loadPageHandler(1);
}
Index.listTemplate = `<% for(var i = 0; i < webinfo.length; i ++) { %>
                        <tr class="weblist" data-id="<%= webinfo[i]._id %>">
                            <td><%= i+1 %></td>
                            <td><%= webinfo[i].title %></td>
                            <td><img src= "/images/upload/<%= webinfo[i].logo %>" style="width:80px; height:60px;"></td>
                            <td><%= webinfo[i].domain %></td>
                            <td><%= webinfo[i].keyword %></td>
                            <td><%= webinfo[i].desc %></td>
                            <td><%= webinfo[i].linkman %></td>
                            <td><%= webinfo[i].email %></td>
                            <td><button class="btn btn-mod btn-info">修改</button></td>
                            <td><button class="btn btn-del btn-danger">删除</button></td>
                        </tr>
                    <% } %>`;
Index.paginationTemplate = `<% for(var i = 1; i <= totalPages; i ++ ) { %> 
                                <li class=" <%= currentPage == i ? "active" : "" %>"><a href="#"><%= i %></a></li>
                            <% } %>`;
$.extend(Index.prototype, {
    //加载页面登录
    load(){
        let user=sessionStorage.loginUser;
        if(user){
            user=JSON.parse(user);
            $(".login-success").text(`欢迎：${user.username}`);
            $(".loginOut").text("退出登录")
        }
    },


    // 注册事件  监听
    addListener(){
        $(".menu-list li").on("click", this.loadRightBox);
        $(".btn-add").on("click", this.addWebInfoHandler);
        $(".side-nav2").on("click",this.loadPageHandler);
        $(".pagination").on("click", "li", this.loadPageHandler);
    },
    loadRightBox(){
        // $(".rightbox").eq($(this).index()).show().siblings().hide();
    },
    addWebInfoHandler(){
        if($(".web-info-form input").val() === "") {
            $(".failed-popout").removeClass("hide");
            return false;
        }else {
            // 文件信息上传
            const formData = new FormData($(".web-info-form")[0]);
            $.ajax({
                type:"post",
                url:"/web/add",
                data:formData,
                processData: false,
                contentType: false,
                success: function(data) {
                    // console.log(data);
                    if(data.res_code === 1) {
                        $(".success-popout").removeClass("hide");
                        $(".web-info-form input").val("");
                        $(".web-info-form textarea").val("");
                    }
                },
                dataType: "json"
            });
        }
    },
    // 加载每页列表数据
    loadPageHandler(event) {
        let page;
        if (typeof event === "number") {
            page = event;
        } else {
            page = $(event.target).text();
        };
        $.getJSON("web/list?page=" + page, (data) => {
            // console.log(data);
            const webinfo = data.res_body.data;
            const html = ejs.render(Index.listTemplate, {webinfo});
            $("tbody").html(html);
            // 显示页码数据
            const pagination = ejs.render(Index.paginationTemplate, {totalPages: data.res_body.totalPages, currentPage: page});
            $(".pagination").html(pagination); 
        }).done(function () {
            $(".weblist").on("click", ".btn-del", function() {
                const _tr = $(this).parents("tr"),
                    _id = _tr.data("id");
                    // console.log(_id );
                $.post("/web/delete",{_id},(resData)=>{
                    console.log(resData);
                    console.log(_id);
                })


            });
        });
    }
   
});
new Index();