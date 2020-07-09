<template>
    <div id="main">
        <el-container>
            <el-aside width="200px">
                <index-menu></index-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import IndexMenu from '../components/IndexMenu'
    export default {
        name: "Index",
        components:{
            IndexMenu
        }
    }
</script>

<style scoped lang="stylus">
#main
    height 100%
    width 100%
    .el-main
        padding 0
</style>
