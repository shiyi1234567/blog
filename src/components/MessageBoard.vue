<template>
    <div id="messageBoard">
                <el-card class="box-card">
                    <div slot="header" :style="{height:'20px'}" class="clearfix">
                        <span>留言板</span>
                          <el-button round size="mini" style="float:right;">收起</el-button>
                    </div>
                    <div class="text item">
                        <el-form ref="form" :model="form" label-width="180px">
                            <el-input type="textarea" v-model="form.desc" placeholder="输入留言"></el-input>
                        </el-form>
                        <el-button style="float: right; padding: 3px 2px;margin:2px;" plain>清除</el-button>
                        <el-button style="float: right; padding: 3px 2px;margin:2px;" plain>发布</el-button>
                        <div id="message">

                        </div>
                    </div>
                </el-card>
    </div>
</template>

<script>
    export default {
        name: "MessageBoard",
        data(){
            return {
                form:{
                    desc:""
                }
            }
        },
        components:{
    
        } 
    }
</script>

<style scoped lang="stylus">
</style>
