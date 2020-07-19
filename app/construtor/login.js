const {updateUser,addUser,selectUser} =require('./userServer');
let {_data}=require('./index');
/*登录*/
function login(req,res) {
    let{username,password}=req.body;
    selectUser("",username).then((user)=>{
        if(user){
            if(!user.isActive){
                console.log(user.isActive)
                res.send(_data(1,"用户已失效，请联系管理员!"));
            }else if(user.password !== password.toUpperCase()){
                res.send(_data(1,"密码错误，请重新输入!"));
            }else{
                // _data={err:0,data:{
                //         id:user.id,
                //         name:user.username
                //     }};
                res.send(_data(0,{id:user.id,
                    name:user.username}));
            }
        }else{
            res.send(_data(1,"用户不存在"));
        }
    });
}
/*注册*/
function register(req,res){
    let {username,password,phone}=req.body;
    let {action}=req.query;
    selectUser("",username).then((user)=>{
        if(user){
            /*用户已存在*/
            res.send(_data(1,"用户名已存在"));
        }else{
            if(action==="register"){
                /*往数据表添加用户*/
                addUser(username,password,phone,"未知",2,"","").then((user)=>{
                    if(user){
                         res.send(_data(0,"注册成功，请重新登录"));
                    }else{
                        res.send(_data(1,"注册失败"));
                    }
                })
            }else{
                res.send(_data(0,"用户名不存在,校验通过"));
            }
        }
    })
}
module.exports = {login,register};
