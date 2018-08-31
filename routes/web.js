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
        const ext = file.originalname.slice(file.originalname.lastIndexOf("."));
        cb(null, file.fieldname + "-" + Date.now() + ext);
    }
});
const upload = multer({storage: storage});

router.post('/add', upload.single("logo"), webService.add);
router.get("/list", webService.listByPage);
router.post("/delete",webService.delById);
module.exports = router;
