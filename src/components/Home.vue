<template>
    <div id="home">
        <el-container>
            <el-main>
                <main-search @search="search"></main-search>
                <main-content></main-content>
            </el-main>
            <el-aside width="200px" style="background-color: #C0C4CC;height: 100%;">留言板</el-aside>
        </el-container>
    </div>
</template>

<script>
    import MainSearch from './MainSearch'
    import MainContent from './MainContent'
    export default {
        name: "Home",
        methods:{
          search(value){
              if(value===""){
                    return
              }else{
                  this.loadContent(value);
              }
          },
          async loadContent(value){
              let contentArray =await this.$axios.post('http://localhost:3000/loadContent',{search:value})
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

</style>
