<template>
    <div id="wrap">
        <el-row class="tac">
            <el-col>
                <el-menu
                        default-active="home"
                        class="el-menu-vertical-demo"
                        router
                        style="border-right:none;"
                        >
                    <index-patient :patientInfo="patientInfo"></index-patient>
                    <el-menu-item index="home">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-menu-item index="study">
                        <i class="el-icon-menu"></i>
                        <span slot="title">工程</span>
                    </el-menu-item>
                    <el-menu-item index="videoroom">
                        <i class="el-icon-video-camera"></i>
                        <span slot="title">影音</span>
                    </el-menu-item>
                    <el-menu-item index="photo">
                        <i class="el-icon-camera-solid"></i>
                        <span slot="title">摄影</span>
                    </el-menu-item>
                    <el-submenu index="userMange">
                        <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span>用户中心</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="userSystem" >用户管理</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group >
                            <el-menu-item index="dataSystem">数据管理</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="setting">设置</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item @click="loginOut" :style="{height:'45px'}">
                        <i class="el-icon-delete-solid"></i>
                        <span>退出登录</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import IndexPatient from './IndexPatient'
    import {getCookie,clearCookie} from '../utils/utils.js'
    export default {
        name: "IndexMenu",
        data(){
          return{
              patientInfo:{}
          }
        },
        async created(){
            /*根据用户ID取用户基本信息回填*/
            let patient = await this.$axios.post('http://localhost:3000/loadPatient',{userId:this.$store.state.userId});
            if(patient.data.err===0){
                this.patientInfo = patient.data.data;
            }
        },
        computed:{
            username(){
                return this.$store.state.userName
            }
        },
        methods:{
            loginOut(){
                let loginForm = getCookie();
                clearCookie(loginForm.userName,loginForm.password);
                this.$router.push("/login")
            }
        }
        ,
        components:{
            IndexPatient
        }
    }
</script>
<style scoped lang="stylus">
#wrap
    font-size 0
    height 100%
    min-height 100%
    border-right 1px solid #e6e6e6
    overflow hidden
</style>
