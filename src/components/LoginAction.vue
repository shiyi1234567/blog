<template>
    <div id="login">
        <div v-show="action=='Login.vue'" class="login-main">
            <el-form :model="loginForm" :rules="rulesForm" status-icon ref="loginForm" label-width="80px" class="demo-ruleForm" label-position="right" size="mini">
                <el-form-item label="用户名" prop="name">
                    <el-input type="text" v-model="loginForm.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="loginForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div v-show="action=='register'" class="login-main">
            <el-form :model="registerForm" :rules="rulesForm" ref="registerForm" status-icon  label-width="80px" class="demo-ruleForm" label-position="right" size="mini">
                <el-form-item label="用户名" prop="nameRegister">
                    <el-input type="text" v-model="registerForm.nameRegister" placeholder="不超过12个字符"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="registerForm.pass" autocomplete="off" placeholder="4到8位，仅限英文，数字和_"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="pass2">
                    <el-input type="password" v-model="registerForm.pass2" autocomplete="off"  placeholder="请确认密码"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input type="text" v-model="registerForm.phone"  placeholder="请输入移动电话号码"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="login-footer">
            <div style="display: table-cell">
                <el-button plain @click="login('loginForm')">登录</el-button>
                <el-button plain @click="register('registerForm')">注册</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LoginAction",
        data(){
            var validateName = (rule, value, callback)=>{
                if(value===""){
                    callback(new Error("用户名不能为空"));
                }else if(value.length>12){
                    callback(new Error("用户名不能超过12个字符"));
                }
                else{
                    callback();
                }

            };
            var validatePass =(rule,value,callback)=>{
                let re = new RegExp(/^\w{4,8}$/);
                if(value===""){
                    callback(new Error("密码不能为空"));
                }else if(!re.test(value)){
                    callback(new Error("密码必须是数字或英文和_,长度在4~8位"));
                }else{
                    callback()
                }

            };
            var validatePass2 = (rule,value,callback)=>{
                /*
                * 注册密码校验
                * 密码必须是数字或英文  长度在4~8位
                * 两次密码是否一致
                * 密码会自动转大写
                * */
                let re = new RegExp(/^\w{4,8}$/);
                if(value===""){
                    callback(new Error("请确认密码!"));
                }else if(!re.test(value)){
                    callback(new Error("密码必须是数字或英文或_,长度在4~8位!"));
                }else if(value.toUpperCase()!==this.registerForm.pass.toUpperCase()){
                    callback(new Error("两次输入的密码不一致!"));
                }else{
                    callback();
                }

            };
            var validatePhone = (rule,value,callback)=>{
                let reg = new RegExp(/^[1]+[3,8]+\d{9}$/);
                if(value===""){
                    callback(new Error("请输入电话号码"));
                }else if(!reg.test(value)){
                    callback(new Error("请输入正确的电话号码"));
                }else{
                    callback();
                }
            };
            var validateNameRegister =(rule,value,callback)=>{
                if(value===""){
                    callback(new Error("用户名不能为空"));
                    return
                }else if(value.length>12){
                    callback(new Error("用户名不能超过12个字符"));
                    return
                }
                /*服务器校验*/
                this.$axios.post("http://localhost:3000/register?action=form",{username:this.registerForm.nameRegister,password:this.loginForm.pass}).then((res)=>{
                    let result = res.data;
                    if(result.err === undefined || result.err=="1"){
                        /*校验失败*/
                        callback(new Error(result.data));
                    }else{
                        /*校验成功*/
                        callback();
                    }
                }).catch(error=>{
                    console.log(error);
                });


            };
            return{
                action:"Login.vue",
                loginForm:{
                    name:"",
                    pass:""
                },
                registerForm:{
                    nameRegister:"",
                    pass:"",
                    pass2:"",
                    phone:""
                },
                rulesForm:{
                    name: [
                        { required: true,validator: validateName, trigger: 'blur' }
                    ],
                    pass:[
                        { required: true,validator: validatePass, trigger: 'blur' }
                    ],
                    pass2:[
                        { required: true,validator:validatePass2,trigger:'blur'}
                    ],
                    phone:[
                        { required: true,validator:validatePhone,trigger:'blur'}
                    ],
                    nameRegister:[
                        {required: true,validator:validateNameRegister,trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            login(formName){
                if(this.action !=="Login.vue"){
                    this.action = "Login.vue";
                    this.$refs["registerForm"].resetFields();
                    return
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        /*表单校验通过之后  到后台服务器验证用户名和密码*/
                        this.$axios.post("http://localhost:3000/login",{username:this.loginForm.name,password:this.loginForm.pass}).then((res)=>{
                            let result = res.data;
                            if(result.err === undefined || result.err=="1"){
                                /*请求失败*/
                                this.$message(result.data);
                            }else{
                                /*登陆成功 注册Vuex 保存当前用户名称和id*/
                                this.$store.commit('updateUser',{
                                    userName:result.data.name,
                                    userId:result.data.id
                                });
                                /*保存sessionStorage*/
                                sessionStorage.setItem("userName",result.data.name);
                                sessionStorage.setItem("userId",result.data.id);
                                /*登陆成功 跳转首页*/
                                //location.href="/index"
                                this.$router.push('/index');
                            }
                        }).then((err)=>{
                            console.log(err);
                        });
                    } else {
                        return false;
                    }
                });
            },
            register(formName){
                if(this.action !== "register"){
                    this.action = "register";
                    this.$refs["loginForm"].resetFields();
                    return
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        /*表单校验通过之后  到后台服务器注册用户*/
                        this.$axios.post("http://localhost:3000/register?action=register",{username:this.registerForm.nameRegister,password:this.registerForm.pass,phone:this.registerForm.phone}).then((res)=>{
                            let result = res.data;
                            if(result.err === undefined || result.err=="1"){
                                /*注册失败*/
                                this.$message(result.data);
                            }else{
                                /*注册成功*/
                                this.$message(result.data);
                            }
                        });
                    } else {
                        return false;
                    }
                });

            }
        }
    }
</script>

<style scoped lang="stylus">
    #login
        position: relative
        box-sizing border-box
        padding 30px 50px
        width: 100%
        height 100%
        background-color #f7f7f7
        border-radius 0 5px 5px 0
        .login-footer
            display table
            position: absolute
            bottom 0
            left 0
            width 100%
            height 80px
            div
                text-align center
</style>

