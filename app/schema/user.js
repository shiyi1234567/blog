const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    recordDate:Date,
    sex:String,
    phone:String,
    level:String,
    isActive:Boolean
});

module.exports = mongoose.model("users",userSchema);
