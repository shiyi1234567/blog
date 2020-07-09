<template>
    <div id="wrap">
        <el-row class="tac">
            <el-col :span="24">
                <el-menu
                        default-active="home"
                        class="el-menu-vertical-demo"
                        router
                        >
                    <index-patient></index-patient>
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
                    <el-submenu index="patientInfo">
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
                    <el-menu-item index="outLogin">
                        <i class="el-icon-setting"></i>
                        <span slot="title">退出登录</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import IndexPatient from './IndexPatient'
    export default {
        name: "IndexHeader",
        computed:{
            username(){
                return this.$store.state.userName
            }
        },
        components:{
            IndexPatient
        }
    }
</script>
<style scoped lang="stylus">
#wrap
    font-size 0
</style>
