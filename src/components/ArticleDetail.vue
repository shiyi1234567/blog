<template>
    <div style="padding: 20px;">
        <el-page-header @back="goBack" content="文章详情页面">
        </el-page-header>
        <div style="padding: 5px 10px;">
            文章内容
        </div>
    </div>
</template>

<script>
    export default {
        name: "ArticleDetail",
        created(){
            console.log("created");
        },
        watch:{
            $route(){

            }
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>

</style>
