const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
   user:Object,  /*用户信息*/
   recordDate:Date, /*记录日期*/
   content:String, /*留言内容*/
    limit:Boolean /*隐私域*/
});

module.exports = mongoose.model("messages",messageSchema);
