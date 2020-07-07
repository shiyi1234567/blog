<template>
    <div id="homePage">
        <div id="wrap">
            <div id="main">
                <el-row>
                    <el-col :span="24"><h1 class="font title">Eleven's Personal Blog</h1></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <message></message>
                    </el-col>
                    <el-col :span="12">
                        <login-action></login-action>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div id="footer">
            <el-row>
                <el-col :span="24"><div class="font connect">@2020-07-02/email:523440464@qq.com</div></el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import LoginAction from "@/components/LoginAction"
    import message from "@/components/Message"
    export default {
        name: "HomePage",
        components:{
            message,
            LoginAction
        }
    }
</script>

<style scoped lang="stylus">
    #homePage
        min-height 100%
        min-width 800px
        height auto
        background-image url("~@/assets/bg.jpg")
        #wrap
            min-height 100%
            height auto
            background-color transparent
            #main
                padding 0 160px 45px 160px
                .title
                    font-size 24px
                    text-align center
                    color white
                    height 60px
                    line-height 60px
        #footer
            height 45px
            margin-top -45px
            .font
                height 45px
                line-height 45px
                text-align center
            .connect
                color: #252525
                font-size small
</style>
