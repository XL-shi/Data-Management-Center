const webDao = require("../dao/web_dao");
const webService =  {
    add(req, res, next){
        const {title, damain, keyword, desc, linkman, email} = req.body;
        let logo = "";
        if(req.file) {
            logo = req.file.filename;
        }
        webDao.save({title, logo, damain, keyword, desc, linkman, email})
                .then((data) => {
                    res.json({res_code:1, res_err: "", res_body:data});
                })
                .catch((err) => {
                    res.json({res_code:-1, res_err: err, res_body:{}});
                });
    }
};

module.exports = webService;