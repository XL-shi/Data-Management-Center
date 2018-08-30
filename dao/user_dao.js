const {User}=require("./model")
const userDao={
    save(userinfo){
        const user=new User(userinfo);
      return user.save();
    },
    find(userinfo){
      return User.find(userinfo)        
    },
    updata(){},
    del(){}
};
module.exports=userDao;