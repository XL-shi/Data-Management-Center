function Index() {
    this.addListener();
    this.load();
    this.createDom();
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
<<<<<<< HEAD
                            <td><button class="btn btn-mod btn-info">修改</button></td>
                            <td><button class="btn btn-del btn-danger" data-toggle="modal" data-target=".bs-example-modal-sm">删除</button></td>
=======
                            <td><button class="btn btn-mod btn-info" data-toggle="modal" data-target="#myModal">修改</button></td>
                            <td><button class="btn btn-del btn-danger">删除</button></td>
>>>>>>> 55fc0436a4d41d61ca76db532e0ae3f5283e3fd5
                        </tr>
                    <% } %>`;
Index.paginationTemplate = `<% for(var i = 1; i <= totalPages; i ++ ) { %> 
                                <li class=" <%= currentPage == i ? "active" : "" %>"><a href="#"><%= i %></a></li>
                            <% } %>`;
Index.delModalTemplate = `<div class="modal bs-example-modal-sm fade" id="delModal" tabindex="-1" role="dialog" >
                            <div class="modal-dialog modal-sm" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" ><span >&times;</span></button>
                                <h4 class="modal-title" id="myModalLabel">删除提示</h4>
                                </div>
                                <div class="modal-body">
                                真的要删掉吗？
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">不删啦</button>
                                <button type="button" class="btn confdel btn-primary">是的哦</button>
                                </div>
                            </div>
                            </div>
                        </div>`;
$.extend(Index.prototype, {
    createDom(){
        $(Index.delModalTemplate).appendTo("body");
    },
    //加载页面登录
    load(){
        let user=sessionStorage.loginUser;
        if(user){
            user=JSON.parse(user);
            $(".login-success").text(`欢迎：${user.username}`);
            $(".loginOut").text("退出登录")
        }
    },

    // 注册事件监听
    addListener(){
        $(".menu-list li").on("click", this.loadRightBox);
        $(".btn-add").on("click", this.addWebInfoHandler);
        $(".side-nav2").on("click",this.loadPageHandler);
        $(".pagination").on("click", "li", this.loadPageHandler);
        $(".btn-addcontent").on("click", this.addContentHandler);
    },
    loadRightBox(){
        $(".rightbox").eq($(this).index()).show().siblings().hide();
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
            // 删除行数据
            $(".weblist").on("click", ".btn-del", function() {
                const _tr = $(this).parents("tr"),
                    _id = _tr.data("id");
                    // console.log(_id );
                $.post("/web/delete",{_id},(resData)=>{
                    // console.log(resData);
                    $("")
                    if(resData.res_code === 1) {
                        $(".confdel").on("click", () => {
                            $("#delModal").modal("hide");
                            _tr.remove();
                        });
                    }
                })
            });
        }).done(function(){
            $(".weblist").on("click",".btn-mod",function(){
                $(".web-info-box").show();
                $(".content-list-box").hide();
                $(".btn-delete").removeClass("hide").siblings().hide();
                const _tr=$(this).parents("tr"),
                id = _tr.data("id"),
                title=_tr.children().eq(1).text(),
                logo=_tr.children().eq(2).text(),
                damain=_tr.children().eq(3).text(),
                keyword=_tr.children().eq(4).text(),
                desc=_tr.children().eq(5).text(),
                linkman=_tr.children().eq(6).text(),
                email=_tr.children().eq(7).text();
                $("#web-title").val(title);
                $("#web-logo").val(logo);
                $("#web-damain").val(damain);
                $("#web-keyword").val(keyword);
                $("#web-desc").val(desc);
                $("#linkman").val(title);
                $("#email").val(email);
                $(".btn-delete").on("click",function(){
                    const data= $(".web-info-form").serialize();
                    console.log(data);
                    $.post("/web/update",data,resData=>{
                        console.log(resData);
                        location.reload();
                    },"json")
                })
            })
        });
    },
    addContentHandler() {
        $(".web-info-box").show();
        $(".content-list-box").hide();
    }
   
});
new Index();