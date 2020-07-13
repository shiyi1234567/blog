<template>
    <div>
        <el-button @click="backLast">返回上一页</el-button>
        文章详情
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
            backLast(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>

</style>
