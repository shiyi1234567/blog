let {_data}=require('./index');
const Messages = require('../schema/message');


/*发布 留言*/
async function addMessage(req,res){
    let {userId,userName,content,limit}=req.body;
    let message = await new Messages({
        user:{
            userId,
            userName
        },
        recordDate:new Date(),
        content,
        limit
    }).save();
    if(message){
        res.send(_data(0,{messageId:message._id}));
    }else{
        res.send(_data(1,"发布留言失败"));
    }
}
/*删除 留言*/
async function deleteMessage(req,res) {
    let {messageId}=req.body;
    let result =  await Messages.findOneAndDelete({_id:messageId});
    if(result){
        res.send(_data(0,"删除成功"));
    }else{
        res.send(_data(1,"删除失败"));
    }
}
/*查找 留言*/
async function findMessage(req,res) {
    let{page,limit}=req.body;
    if(page===""||page===undefined){
        page =1;
    }
    if(limit===""||limit===undefined){
        limit =10;
    }
    let result = await Messages.find().skip((page-1)*10).limit(limit);
    if(result.length>0){
        res.send(_data(0,result));
    }else{
        res.send(_data(1,"获取留言数据失败"));
    }
}

module.exports = {
    addMessage,
    deleteMessage,
    findMessage
}
