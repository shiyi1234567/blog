<template>
    <div id="content">
       <content-detail v-for="detail in contentsLists" :contentDetail="detail" :key="detail.contentId"></content-detail>
    </div>
</template>

<script>
    import ContentDetail from "./ContentDetail"
    export default {
        name: "MainContent",
        props:['contents',"search"],
        data(){
            return{
                contentList:[
                    {
                    title:"Vue详情",
                    author:"十一",
                    contentId:"12345678",
                    desc:"这是一篇关于Vue介绍的文章",
                    group:["Vue"],
                    type:"text",
                    date:"2020-07-15 19:10"
                },{
                        title:"个人用户可在个人中心，设置修改密码",
                        author:"十一",
                        contentId:"12345670",
                        desc:"放开密码修改功能",
                        group:[],
                        type:"message",
                        date:"2020-07-15 18:15"
                    },{
                    title:"JavaScript详情",
                    author:"十一",
                    contentId:"12345677",
                    desc:"这是一篇关于JavaScript介绍的文章",
                    group:["JavaScript"],
                    type:"article",
                        date:"2020-07-15 15:00"
                },{
                    title:"React详情",
                    author:"十一",
                    contentId:"12345679",
                    desc:"这是一篇关于React介绍的文章",
                    group:["React"],
                    type:"article",
                        date:"2020-07-15 15:00"
                },{
                    title:"服务器详情",
                    author:"十一",
                    contentId:"12345676",
                    desc:"这是一篇关于服务器的文章",
                    group:["server"],
                    type:"article",
                        date:"2020-07-15 15:00"
                },{
                    title:"Vue详情",
                    author:"十一",
                    contentId:"12345675",
                    desc:"这是另一篇关于Vue介绍的文章",
                    group:["Vue"],
                    type:"article",
                        date:"2020-07-15 15:00"
                },{
                    title:"JavaScript详情",
                    author:"十一",
                    contentId:"12345674",
                    desc:"这又是一篇关于Javascript介绍的文章",
                    group:["JavaScript"],
                    type:"article",
                    date:"2020-07-15 15:00"
                }],
                searchKey:""
            }
        },
        created(){
            this.searchKey = this.search;
            if(this.searchKey==="" || this.searchKey === undefined){
               this.searchKey = this.$route.params.id || "";
            }
        },
        computed:{
            contentsLists() {
                if (this.searchKey === "") {
                    return this.contentList
                }
                if (typeof this.searchKey === "undefined") return []
                let array=this.contentList.filter((list) => {
                   return (list.group.some((item)=>item.toUpperCase().includes(this.searchKey.toUpperCase())));
                });
                return array
            }
        },
        watch:{
            search(){
                this.searchKey = this.search;
            },
            $route(){
                this.searchKey = this.$route.params.id;
            }
        },
        components:{
            ContentDetail
        }
    }
</script>

<style scoped lang="stylus">
</style>
