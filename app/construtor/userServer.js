const Users = require('../schema/user')
let {_data}=require('./index');
/*删除用户*/
function delUserEvent(req,res){
    let {userList}=req.body;
    if(userList.length===1){
        deleteUserOne(userList[0]).then((user)=>{
           if(user){
               res.send(_data(0,"用户"+user.username+"已删除"))
           }else{
               res.send(_data(1,"用户删除失败"))
           }
        })
    }else if(userList.length>1){
        deleteUserMany(userList).then((user)=>{
           if(user.ok === 1){
               res.send(_data(0,"用户删除成功"))
           }
        })
    }
}
/*获取用列表*/
function getUserListEvent(req,res){
    let {username,sex,address,recordDate,isActive,level,pageNumber,limit}=req.body;
    let selectObj = getSelectObj("",username,recordDate,sex,level,isActive,address);
    getCount(selectObj).then((count)=>{
        if(count){
            findUser(selectObj,pageNumber,limit).then((lists)=>{
                if(lists.length>0){
                    res.send(_data(0,{total:count,userList:lists}));
                }else{
                    res.send(_data(1,"获取用户列表失败"))
                }
            })
        }else{
            res.send(_data(1,"没有数据"))
        }
    })

}
/*更新用户*/
function updateUserEvent(req,res){
    let {username,password,phone,sex,address,_id}=req.body;
    let updateObj={
        username:username|| "",  //用户名
        password:password || "",  // 密码
        sex:sex|| "", //性别
        phone:phone|| "", //联系电话
        address:address|| "",  //地址
        updateDate:new Date()  //最近
    };
    console.log(updateObj,_id);
    updateUser({_id:_id},updateObj).then((user)=> {
        if (user) {
          res.send(_data(0,"用户"+username+"更新成功"))
        } else {
           res.send(_data(1,"用户"+username+"更新失败"))
        }
    })
}

/*根据Id或username取用户信息*/
function loadUserEvent(req,res){
    let {userId} = req.body;
    if(userId){
        selectUser(userId).then((user)=>{
            if(user){
                res.send(_data(0,user))
            }else{
                res.send(_data(1,"没有该用户"))
            }
        })
    }else{
        res.send(_data(1,"Id为空"))
    }
}
/*公共方法:拼接用户检索条件*/
function getSelectObj(userId,userName,recordDate,sex,level,isActive,address){
    let selectObj={};
    let argArray = [...arguments];
    argArray.forEach((item,index)=>{
        if( item !==undefined&& item !==""){
            switchUser(item,index);
        }
    });
    function switchUser(item,index){
        switch (index) {
            case 0:
                selectObj["_id"]=item;
                break;
            case 1:
                selectObj["username"]=item;
                break;
            case 2:
                selectObj["recordDate"]=item;
                break;
            case 4:
                selectObj["sex"]=item;
                break;
            case 5:
                selectObj["level"]=item;
                break;
            case 6:
                selectObj["address"]=item;
                break;
            default:
                break;
        }
    }
    return selectObj
}

/*操作表 检索数据长度*/
async function getCount(selectObj){
    return await Users.find(selectObj).countDocuments()
}
/*操作表:更新用户*/
async  function updateUser(selectObj,updateObj){
    return await Users.updateOne(selectObj,{$set:updateObj})
}
/*操作表:添加用户*/
async function addUser(username,password,phone,sex,level,src,address){
    return await new Users({
        username,
        password,
        phone,
        sex,
        recordDate:new Date(),
        level,
        isActive:true,
        src,
        address,
        updateDate:""
    }).save()
}
/*操作表:删除单个用户*/
async function deleteUserOne(userId){
    return await Users.findOneAndDelete({_id:userId});
}
/*操作表:删除多个用户*/
async function deleteUserMany(userList){
    let userArray = userList.map((user)=>{
        return user._id
    });
    return await Users.deleteMany({ _id : { $in: userArray} } );
}
/*操作表:根据Id或username查找某一个患者,返回对象*/
async function selectUser(userId,userName){
    let selectObj = getSelectObj(userId,userName);
    return await Users.findOne(selectObj);
}
/*操作表:检索用户,返回数组*/
async function findUser(selectObj,page,limit){
    if(page===""||page===undefined){
        page =1;
    }
    if(limit===""||limit===undefined){
        limit =10;
    }
    return await Users.find(selectObj).skip((page-1)*limit).limit(limit);
}
module.exports = {
    updateUser,
    addUser,
    selectUser,
    findUser,
    loadUserEvent,
    updateUserEvent,
    getUserListEvent,
    delUserEvent
}

