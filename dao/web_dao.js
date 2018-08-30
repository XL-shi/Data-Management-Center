const {Web} = require("./model");
const webDao = {
    save(webinfo) {
        return new Web(webinfo).save();
    },
    count(){

    },
    findByPage(){

    },
    find(){

    },
    update(){

    },
    delete(){

    }
};
module.exports = webDao;