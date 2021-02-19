<template>
    <div id="home" ref="wrapper">
        <el-container class="content">
            <el-header style="height:45px;line-height: 45px">
                <main-search @search="search" class="search_box"></main-search>
                <h3 style="margin: 0;height: 45px;line-height: 45px">新消息发布</h3>
            </el-header>
            <el-main style="padding:30px 20px">
                <main-content :contents="contents" :search="searchKey"></main-content>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import MainSearch from './MainSearch'
    import MainContent from './MainContent'
    import BScroll from 'better-scroll'
    export default {
        name: "Home",
        data(){
            return{
                contents:[],
                searchKey:""
            }
        },
        mounted(){
            this.$nextTick(()=>{
                new BScroll(this.$refs.wrapper,{
                    scrollY: true,
                    click: true
                })
            })
        },
        methods:{
          search(value){
              this.searchKey=value;
              // if(value===""){
              //       return
              // }else{
              //     this.loadContent(value);
              // }
              this.loadContent(value);
          },
          async loadContent(value){
              let contentArray =await this.$axios.post('http://localhost:3000/loadContent',{search:value});
              if(contentArray.data.err===0){
                  this.contents = contentArray.data.data;
              }
          }
        },
        components:{
            MainSearch,
            MainContent
        }
    }
</script>

<style scoped lang="stylus">
    #home
        width 100%
        height 100%
        .search_box
            display inline-block
            width 250px
            float right
</style>
