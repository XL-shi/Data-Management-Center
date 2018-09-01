# Data-Management-Center
网站后台管理中心

>基于 nodeJS + Bootstrap + Express + MongoDB 实现的后台管理系统

前端的静态资源均放置在 public 目录下

服务器端开发采用三层分层式： 表示层-业务逻辑层-数据访问层

    public 目录下为 表示层 v
    services 目录下为 业务逻辑层 c
    dao 目录下为 数据访问层 m


服务器刷新： 
    nodemon

验证码：svg-captcha

session: express-session

数据库连接：mongoose 连接 mongodb数据库

整个后台管理中心实现的功能板块：
                            1、网站信息的添加
                            2、列表内容的删除和修改
                            3、管理员的登录
                            4、登录权限的设置
                            5、添加管理员

可登录的用户名：admin  密码：123
默认打开端口为：localhost:3003

