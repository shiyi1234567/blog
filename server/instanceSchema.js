const mongoose = require('mongoose');
let instanceSchema = new mongoose.Schema({
    recordDate:{
        type:Date,
        default:null
    },
    recordTime:{
        type:String,
        default:null
    },
    price:{
        type:String,
        default:null
    },
    payment:{
        type:String,
        default:null
    },
    goods:{
        type:String,
        default:null
    },
    goal:{
        type:String,
        default:null
    },
    desc:{
        type:String,
        default:null
    }
});

module.exports = instanceSchema;
