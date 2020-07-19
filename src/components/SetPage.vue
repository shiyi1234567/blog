<template>
    <div id="setting">
        <el-form ref="form" :model="user" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="user.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="user.password" type="password" disabled="editPass===0"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="user.phone"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-input v-model="user.sex"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="user.address"></el-input>
            </el-form-item>
            <!--<el-form-item label="头像上传">-->
                <!--<el-input v-model="user.address"></el-input>-->
            <!--</el-form-item>-->

        </el-form>
        <el-button @click="handlePass" disabled="">修改密码</el-button>
        <el-button @click="handleEdit">确定</el-button>
    </div>
</template>

<script>
    export default {
        name: "SetPage",
        props:['userInfo'],
        async created(){
            let {userId}=this.$store.state;
            console.log("111");
            let result = await this.$axios.post('http://localhost:3000/user/loadUser',{userId:userId});
            if(result.data.err===0){
                this.user = result.data.data;
            }
        },
        data(){
            return{
                user:{},
                editPass:0,
            }
        },
        methods:{
           async handlePass(){
                this.$prompt('请输入密码', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then((value) => {
                    //提交框输入了数据
                    //后台密码校验
                    if(value.trim()===this.user.pass){
                        this.editPass =1;
                        this.$message({
                            type: 'success',
                            message: '密码正确 '
                        });
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: "提交失败或密码错误"
                    });
                });
            },
            handleEdit(){
                /*修改患者信息*/
                this.$axios.post("http://localhost:3000/user/updateUser",{username:this.user.username,password:this.user.password,phone:this.user.phone,sex:this.user.sex,address:this.user.address,_id:this.user._id}).then((res)=>{
                    let result = res.data;
                    if(result.err === undefined || result.err=="1"){
                        /*注册失败*/
                        this.$message(result.data);
                    }else{
                        /*注册成功*/
                        this.$message({message:result.data,onClose:function () {
                                location.reload();
                            }});
                    }
                })
            }
        }

    }
</script>

<style scoped lang="stylus">

</style>
