<template>
    <div id="content">
       <content-detail v-for="detail in contentList" :contentDetail="detail" :key="detail.contentId"></content-detail>
    </div>
</template>

<script>
    import ContentDetail from "./ContentDetail"
    export default {
        name: "MainContent",
        props:['contents'],
        data(){
            return{
                contentList:[{
                    title:"Vue详情",
                    author:"十一",
                    contentId:"12345678",
                    desc:"这是一篇关于Vue介绍的文章",
                    group:"Vue"
                },{
                    title:"JavaScript详情",
                    author:"十一",
                    contentId:"12345677",
                    desc:"这是一篇关于Vue介绍的文章",
                    group:"JavaScript"
                },]
            }
        },
        components:{
            ContentDetail
        }
    }
</script>

<style scoped lang="stylus">
</style>
