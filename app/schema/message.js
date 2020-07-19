const mongoose = require("monoose");

const messageSchema = new mongoose.Schema({
   user:Object,
   recordDate:Date,
   content:String
});

module.exports = mongoose.model("messages",messageSchema);
