const {Web} = require("./model");
const webDao = {
    save(webinfo) {
        return new Web(webinfo).save();
    },
    count(){
        return Web.find().count();
    },
    findByPage(page){
        const pageSize = 5;
        return Web.find().skip((page-1) * pageSize).limit(pageSize);
    },
    find(){

    },
    update(){

    },
    delete(webInfo){
        return Web.remove(webInfo);
    }
};
module.exports = webDao;