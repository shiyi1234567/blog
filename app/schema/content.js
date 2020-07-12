const mongoose = require('mongoose')

const contentSchema = new mongoose.Schema({
    title:String,  //标题
    desc:String,   //备注  描述
    content:String,  //文章内容
    recordDate:Date,  //发布日期
    author:String,  //作者
    keyWords:Array,  //关键字
    group:String,   //分类
    effectiveDate:Date, //有效日期
    isActive:String  //有效性
});

module.exports = mongoose.model("contents",contentSchema);
