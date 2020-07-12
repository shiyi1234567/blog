<template>
    <div id="patientInfo">
        <div class="patient_img demo-basic--circle">
            <div class="block">
                <el-avatar :size="size">
                    <img :src="patientInfo.src" alt="">
                </el-avatar>
            </div>
        </div>
        <div class="patient_detail">
            <div>{{patientInfo.username}}</div>
            <div>{{patientInfo.sex}}</div>
            <div>{{patientInfo.recordDate | getDate}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IndexPatient",
        props:['patientInfo'],
        data(){
          return {
              size:50,
              patientInfoUrl:"/assets/bg2.jpg"

            }
        },
        filters:{
          getDate(date){
              let newDate = new Date(date);
              let days = newDate.getDate();
              let month = newDate.getMonth()+1;
              let year = newDate.getFullYear();
              return year+"-"+month+"-"+days
          }
        },
        async mounted(){
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
        height 100%
        overflow hidden
        .patient_img
            width 40px
            height 40px
            float: left
        .patient_detail
            float left
            padding-left 20px
            width 60px
            height 60px
            line-height 18px
            font-size:12px
            color rgba(0, 176, 0, 0.33)
</style>
