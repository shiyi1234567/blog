const mongoose = require('mongoose');
const xlsx = require('xlsx');
const instanceSchema =require('./instanceSchema');
//连接数据库
const url= 'mongodb://localhost:27018/databases';
mongoose.connect(url,{useNewUrlParser:true},(err,db)=>{
    if(err){
        console.log("数据库连接失败："+err);
        return
    }
    //连接到指定数据库
    /*
   ///创建用户集合
    db.createCollection('user',(err,res)=>{
        if(err){
            console.log("创建集合失败："+err)
        }
        console.log("创建用户集合成功");
    })
    //创建数据源集合
    db.createCollection('instancedata',(err,res)=>{
        if(err){
            console.log("创建集合失败："+err)
        }
        console.log("创建数据集合成功");
    })
    */

    /*从excel中读取数据存到数据库中*/
    let sheetObj=xlsx.readFile("E:/financial/" + "个人支出明细.xlsx");
    let sheetNames=sheetObj.SheetNames;
    let SheetLen = sheetNames.length;
    for(let i=0;i<SheetLen;i++){
        let CollectTitle=sheetNames[i];
        //根据表名创建集合
        db.createCollection(CollectTitle,(err,res)=>{
            if(err){
                console.log("创建集合失败："+err);
                return
            }
            let mongo=mongoose.model(CollectTitle,instanceSchema);
            //往集合中插数据
            /*
            * 清除集合中原有数据
            * 插入新数据
            * */
           // res.drop();
            let sheet = sheetObj.Sheets[sheetNames[i]]; //通过表明得到表对象
            let data = xlsx.utils.sheet_to_json(sheet);//通过表对象得到表中数据
            let dataArray=mangyData(data,CollectTitle);
            mongo.insertMany(dataArray,(err,res)=>{
                if(err){
                    console.log("插入数据失败");
                    return
                }
                console.log("插入数据成功");
            })
        })
    }
});
function mangyData(data,sheetName){
    let dataLen=data.length;
    let resultArray=[];
    for(let i=0;i<dataLen;i++){
        let dataList = {
            recordDate:sheetName+"-"+data[i]["日期"],
            recordTime:data[i]["时间"],
            price:data[i]["金额"],
            payment:data[i]["支付地点"],
            goods:data[i]["物品"],
            goal:data[i]["支出目的"],
            desc:data[i]["备注"]
        };
        resultArray.push(dataList);
    }
    return resultArray
}
