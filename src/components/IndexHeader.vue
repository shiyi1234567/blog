<template>
    <div id="wrap">
        <div class="header">
            <el-menu
                    class="el-menu-demo"
                    mode="horizontal"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    router
                    default-active="home">
                <el-menu-item class="patientInfo">
                    <img src="../assets/bg2.jpg" alt="头像">
                </el-menu-item>
                <el-menu-item index="" disabled="">{{username}}</el-menu-item>
                <el-submenu index="" :style="{float:'right'}">
                    <template slot="title">个人中心</template>
                    <el-menu-item index="2-1">用户管理</el-menu-item>
                    <el-menu-item index="2-2">数据管理</el-menu-item>
                    <el-menu-item index="2-3">设置</el-menu-item>
                    <el-menu-item index="2-3">退出登录</el-menu-item>
                </el-submenu>
                <el-menu-item index="photo" :style="{float:'right'}">摄影</el-menu-item>
                <el-menu-item index="videoroom" :style="{float:'right'}">影音</el-menu-item>
                <el-menu-item index="study" :style="{float:'right'}">工程</el-menu-item>
                <el-menu-item index="home" :style="{float:'right'}">首页</el-menu-item>





            </el-menu>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IndexHeader",
        computed:{
            username(){
                return this.$store.state.userName
            }
        }
    }
</script>
<style scoped lang="stylus">
#wrap
    font-size 0
    .patientInfo
        display inline-block
        padding 0
        margin 10px
        width 40px
        height 40px
        border-radius 50%
        overflow hidden
        img
            width: 100%
            height 100%
            vertical-align top
</style>
