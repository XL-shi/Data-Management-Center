const webDao = require("../dao/web_dao");
const webService =  {
    // 添加网站信息
    add(req, res, next){
        const {title, domain, keyword, desc, linkman, email} = req.body;
        let logo = "";
        if(req.file) {
            logo = req.file.filename;
        }
        webDao.save({title, logo, domain, keyword, desc, linkman, email})
                .then((data) => {
                    
                    res.json({res_code: 1, res_err: "", res_body: data});
                })
                .catch((err) => {
                    res.json({res_code: -1, res_err: err, res_body: {}});
                });
    },
    findById(req, res, next) {
        const {id} = req.body;
        webDao.findById({id})
                .then((data) => {
                    res.json({res_code: 1, res_err: "", res_body: data});
                })
                .catch((err) => {
                    res.json({res_code: -1, res_err: err, res_body: {}});
                });
    },
    // 按页查询数据
    listByPage(req, res, next) {
        let {page} = req.query;
        page = page || 1;
        webDao.count()
                .then((dataCounts) => { // dataCounts 数据总条数
                    webDao.findByPage(page) 
                            .then((pageData) => { //pageData 每页的数据
                                const totalPages = Math.ceil(dataCounts /5);
                                res.json({res_code: 1, res_err: "", res_body: {data: pageData, count: dataCounts, totalPages}});
                            })
                            .catch((err) => {
                                res.json({res_code: -1, res_err: err, res_body: {}});
                            });
                })
                .catch((err) => {
                    res.json({res_code: -1, res_err: err, res_body: {}});
                });
    },
    // 通过id来删除当前行数据
    delById(req, res, next){
        const {_id} = req.body;
        webDao.delete({_id})
                .then((data) => {
                    res.json({res_code:1,res_err:"",res_body:data});
                })
                .catch((err) => {
                    res.json({res_code: -1, res_err: "no exist", res_body: {}});
                });
    },
    // 修改更新信息
    update(req,res,next){
        const {id, title, domain, keyword, desc, linkman, email}=req.body;
        let logo = "";
        if(req.file) {
            logo = req.file.filename;
        }
        webDao.update({id, title, logo, domain, keyword, desc, linkman, email})
            .then((data) => {
                res.json({res_code:1,res_err:"",res_body:data});
            })
            .catch((err) => {
                res.json({res_code:-1,res_err:"no exist",res_body:{}});
            })
    }
};
module.exports = webService;