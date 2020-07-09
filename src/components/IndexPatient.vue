<template>
    <div id="patientInfo">
        <div class="demo-basic--circle">
            <div class="block"  :key="size" >
                <el-avatar :size="size">
                    <img src="../assets/bg2.jpg" alt="">
                </el-avatar>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "IndexPatient",
        data(){
          return {
              size:"large",
              patientInfoUrl:"/assets/bg2.jpg"
            }
        },
        computed:{
            username(){
                return this.$store.state.userName
            }
        }
    }
</script>

<style scoped lang="stylus">
    #patientInfo
        padding 20px
        .patientInfo
            display inline-block
            padding 0
            margin 10px
            width 40px
            height 40px
            border-radius 50%
            overflow hidden
            img
                width: 100%
                height 100%
                vertical-align top
</style>
