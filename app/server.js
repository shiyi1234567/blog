const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: true })

const mongoose = require('mongoose')
const Articles = require('./schema/articles')
const {login,register} = require('./construtor/login')
const {updateUserEvent,loadUserEvent,getUserListEvent,delUserEvent}=require('./construtor/userServer')
const {addMessage,deleteMessage,findMessage}=require('./construtor/messageServes')
app.use(urlencodedParser);
app.use(jsonParser);
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","http://localhost:8080");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() === 'options')
        res.sendStatus(200);  //让options尝试请求快速结束
    else
        next();
});
/*登录验证*/
app.use("/login",(req,res)=>{
    login(req,res);
});
/*注册验证*/
app.use('/register',(req,res)=>{
    register(req,res);
});

/*根据用户ID取用户信息*/
app.use('/user/loadUser',(req,res)=>{
    loadUserEvent(req,res);
});
/*更新用户信息*/
app.use('/user/updateUser',(req,res)=>{
    updateUserEvent(req,res);
});
/*用户管理功能 获取用户列表*/
app.use('/user/getUserList',(req,res)=>{
   getUserListEvent(req,res);
});
/*用户管理功能 删除用户*/
app.use('/user/deleteUser',(req,res)=>{
  delUserEvent(req,res);
});
/*检索文档*/
app.use('/loadContent',(req,res)=>{
    let _data = {};
    let {search,searchKey}=req.body;
    Articles.find().then((content)=>{
        if(content){
            _data={err:0,data:content};
            res.send(_data);
        }else{
            _data={err:1,data:"检索文档出错"};
            res.send(_data);
        }
    })
});

/*添加 留言*/
app.use('/addMessage',(req,res)=>{
    addMessage(req,res);
});
/*删除 留言*/
app.use('/deleteMessage',(req,res)=>{
    deleteMessage(req,res);
});
/*检索 留言*/
app.use('/findMessage',(req,res)=>{
    findMessage(req,res);
})
/*启动服务器*/
app.listen(3000,(...a)=>{
    console.log("3000端口成功监听");
});
//连接数据库
const url= 'mongodb://localhost:27018/databases';
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true },(err,db)=>{
    if(err){
        console.log("数据库连接失败："+err);
        return
    }
    console.log("数据库连接成功");
});

