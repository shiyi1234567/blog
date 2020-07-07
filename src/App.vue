<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  import "@/assets/base.styl"
    export default {
        name: 'App',
        components: {
        }
    }

</script>
<style lang="stylus">
    body
        margin 0
        padding 0
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    #app
        position absolute
        height 100%
        width 100%
</style>
