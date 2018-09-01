function Index() {
    this.load();
    this.addListener();
    this.createDom();
}

// 列表内容的 ejs模板
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
                            <td><button class="btn btn-mod btn-info" >修改</button></td>
                            <td><button class="btn btn-del btn-danger" data-toggle="modal" data-target=".bs-example-modal-sm">删除</button></td>
                        </tr>
                    <% } %>`;
                    
// 列表内容中的页码的 ejs模板
Index.paginationTemplate = `<% for(var i = 1; i <= totalPages; i ++ ) { %> 
                                <li class=" <%= currentPage == i ? "active" : "" %>"><a href="#"><%= i %></a></li>
                            <% } %>`;

// 点击删除按钮弹出的删除提示模态框的模板字符串
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

// 原型扩展 
$.extend(Index.prototype, {
    // 创建删除模态框
    createDom(){
        $(Index.delModalTemplate).appendTo("body");
    },
    //判断用户是否登录，来加载不同的页面
    load(){
        let user=sessionStorage.loginUser;
        if(user){
            user=JSON.parse(user);
            $(".login-success").text(`欢迎：${user.username}`);
            $(".loginOut").text("退出登录");
            $(".menu-list li").on("click", function() {
                $(".rightbox").eq($(this).index()).show().siblings().hide();
            });
        }else {
            $(".right-box").hide();
            $(".jumbotron").removeClass("hide");
        }
        // this.loadPageHandler(1);

    },
    // 注册事件监听
    addListener(){
        $(".btn-add").on("click", this.addWebInfoHandler);
        $(".side-nav2").on("click",this.loadPageHandler(1));
        $(".pagination").on("click", "li", this.loadPageHandler);
        $(".btn-addcontent").on("click", this.addContentHandler);
        $(".loginOut").on("click",this.loginOutHandler);
    },
    // 添加网站信息，文件信息的上传
    addWebInfoHandler(){
        if($("#web-title, #web-logo, #web-domain, #web-keyword, #web-desc, #linkman, #email").val() === "") {
            $(".failed-popout").removeClass("hide");
            const timer = setTimeout( function () {
                $(".failed-popout").hide();
            },1500);
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
                        const timer = setTimeout( function () {
                            $(".success-popout").hide();
                        },1500);
                        $(".web-info-form input").val("");
                        $(".web-info-form textarea").val("");
                    }
                },
                dataType: "json"
            });
        }
    },
    // 加载列表内容每页的数据 五条数据为一页
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
            const pagination = ejs.render(Index.paginationTemplate, {totalPages: data.res_body.totalPages, currentPage:page});
  
            $(".pagination").html(pagination); 
        }).done(function () {
            // 删除行数据
            $(".weblist").on("click", ".btn-del", function() {
                const _tr = $(this).parents("tr"),
                    _id = _tr.data("id");
                    // console.log(_id );
                $('.confdel').on("click", () => {
                    $.post("/web/delete",{_id},(resData)=>{
                        // console.log(resData);
                        if(resData.res_code === 1) {
                            $("#delModal").modal("hide");
                            _tr.remove();
                        }
                    });
                });
            });
        }).done(function(){
            // 点击修改按钮跳转到修改板面进行修改数据
            $(".weblist").on("click",".btn-mod",function(){
                $(".logo-hide").show();

                $(".web-info-box").show().siblings($(".content-list-box")).hide();
                $(".btn-modify").removeClass("hide").siblings().hide();
                const _tr=$(this).parents("tr"),
                id = _tr.data("id"),
                title=_tr.children().eq(1).text(),
                logo=_tr.children().eq(2).text(),
                domain=_tr.children().eq(3).text(),
                keyword=_tr.children().eq(4).text(),
                desc=_tr.children().eq(5).text(),
                linkman=_tr.children().eq(6).text(),
                email=_tr.children().eq(7).text();
                // console.log(id);
                $.post("/web/find", {id}, (data) => {
                    // console.log(data);
                    // console.log(data.res_body.logo);
                    const logo =  data.res_body.logo;
                    $(".id").val(id);
                    $("#web-title").val(title);
                    $(".logo-hide").text(logo);
                    $("#web-domain").val(domain);
                    $("#web-keyword").val(keyword);
                    $("#web-desc").val(desc);
                    $("#linkman").val(title);
                    $("#email").val(email);
                   
                });  
            })
        }).then(function(){
            $("#web-logo").on("change", function(){
                if($("#web-logo").val() !== "") {
                    $(".logo-hide").hide();
                    console.log("jjj");
                }
            });
        }).then(function(){
                $(".btn-modify").on("click",function(){
                     const updateData = new FormData($(".web-info-form")[0]);
                    $.ajax({
                        type:"post",
                        url:"/web/update",
                        data:updateData,
                        processData: false,
                        contentType: false,
                        success: function(data) {
                            // console.log(data);
                            if(data.res_code === 1) {
                                $(".success-popout").removeClass("hide").text("修改成功，请在栏目管理中查看哦~");
                                const timer = setTimeout( function () {
                                    $(".success-popout").hide();
                                },1500);
                                $(".web-info-form input").val("");
                                $(".web-info-form textarea").val("");
                            }
                        },
                        dataType: "json"
                    });
                })
        });
    },
    // 点击添加内容按钮切换不同面板
    addContentHandler() {
        $(".web-info-box").show();
        $(".content-list-box").hide();
    },
    // 退出登录清除登录的用户信息，跳转到登录页面
    loginOutHandler(){
        $.getJSON("/users/loginout",(data)=>{
            console.log(data);
        if(data.res_code === 1){
            sessionStorage.removeItem("loginUser");
            window.location = "/html/login.html";
        }
        })
    }
});
new Index();