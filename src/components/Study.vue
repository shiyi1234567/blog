<template>
    <div id="study">
        <el-menu
                :default-active="'/index/study/vue'"
                class="el-menu-demo"
                mode="horizontal"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                router
        >
            <el-menu-item index="/index/study/vue">vue</el-menu-item>
            <el-menu-item index="/index/study/react">react</el-menu-item>
            <el-menu-item index="/index/study/javascript">javascript</el-menu-item>
            <el-menu-item index="/index/study/webpack">webpack</el-menu-item>
            <el-menu-item index="/index/study/github">github</el-menu-item>
        </el-menu>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>

    </div>
</template>

<script>
    export default {
        name: "Study",
        data() {
            return {
                activeType: ''
            };
        },
        created(){
            this.activeType = this.$route.params.id;
        },
        methods: {

        },
        watch:{
            $route(){
                this.activeType=this.$route.params.id;
            }
        },
        computed:{}

    }
</script>

<style scoped lang="stylus">
#study
    padding 10px 20px 0
</style>
