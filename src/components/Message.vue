<template>
    <div id="message">
        <h2>Welcome ！</h2>
        <p class="desc-chin">
            {{descChinese}}
        </p>
        <p class="desc-eng">
            {{descEnglish}}
        </p>
    </div>
</template>

<script>
    export default {
        name: "message",
        data(){
            return{
                descChinese:"这里是十一的个人网站，里面有我的一些学习资料和一些个人情况，欢迎来到这里的每一位朋友。",
                descEnglish:"Here is the personal website of Eleven, there are some of my study materials and some personal information, welcome to every friend here."
            }

        }
    }
</script>

<style scoped lang="stylus">
#message
    box-sizing border-box
    padding 2rem 4rem
    width 100%
    height 100%
    background-color rgb(0,0,0)
    color #fefefe
    border-radius 0.5rem 0 0 0.5rem
    p
        margin-top 20px
    .desc-chin
        line-height 24px
        font-size 14px
    .desc-eng
        line-height 16px
        font-size 12px
</style>
