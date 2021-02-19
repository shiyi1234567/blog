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
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    html,body
        width 100%
        height 100%
    #app
        height 100%
        width 100%
</style>
