var express = require('express');
var router = express.Router();
const path = require("path");
const webService = require("../services/web_services");

// 文件上传的配置
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {  
        cb(null, path.join(__dirname, "../public/images/upload"));
    },
    filename: function (req, file, cb) {
        // const ext = file.originalname.slice(file.originalname.lastIndexOf("."));
        // cb(null, file.fieldname + "-" + Date.now() + ext);
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});
// 添加网站信息
router.post('/add', upload.single("logo"), webService.add);
// 列表数据查询显示
router.get("/list", webService.listByPage);
// 通过id来删除数据
router.post("/delete",webService.delById);
// 修改数据
router.post("/update", upload.single("logo"), webService.update);
// 通过id 查询数据
router.post("/find", webService.findById);
module.exports = router;
