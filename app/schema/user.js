const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:String,  //用户名
    password:String,  // 密码
    recordDate:Date,  //创建日期
    sex:String, //性别
    phone:String, //联系电话
    level:String,  //权限级别
    isActive:Boolean,  //用户有效性
    src:String,  //头像
    address:String  //地址
});

module.exports = mongoose.model("users",userSchema);
