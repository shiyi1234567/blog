<template>
    <div id="homePage">
        <div id="homeWrap">
            <div class="content">
                <el-row>
                    <el-col :span="24"><h1 class="font title">Eleven's Personal Blog</h1></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12" class="hei_400">
                        <message></message>
                    </el-col>
                    <el-col :span="12" class="hei_400">
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
        height 100%
        overflow  auto
        background-image url("~@/assets/bg.jpg")
        #homeWrap
            min-height 100%
            background-color transparent
            .content
                padding 0 160px 65px 160px
                .title
                    font-size 24px
                    text-align center
                    color white
                    height 60px
                    line-height 60px
                .hei_400
                    height 330px
        #footer
            height 65px
            margin-top -65px
            .font
                height 65px
                line-height 65px
                text-align center
            .connect
                color: #252525
                font-size small
</style>
