const {Web} = require("./model");
const webDao = {
    save(webinfo) {
        return new Web(webinfo).save();
    },
    findById(modinfo){
        return Web.findById(modinfo.id);
    },
    count(){
        return Web.find().count();
    },
    findByPage(page){
        const pageSize = 5;
        return Web.find().skip((page-1) * pageSize).limit(pageSize);
    },
    update(updateData){
        return Web.findByIdAndUpdate(updateData.id,{$set:updateData});
    },
    delete(webInfo){
        return Web.remove(webInfo);
    }
};
module.exports = webDao;