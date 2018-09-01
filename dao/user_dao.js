const {User}=require("./model")
const userDao={
    save(userinfo){
        const user=new User(userinfo);
      return user.save();
    },
    find(userinfo){
      return User.find(userinfo);        
    }
};
module.exports=userDao;