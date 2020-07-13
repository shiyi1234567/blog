<template>
    <div id="messageBoard">
        <el-card>
            <div class="board_title color_line_bottom">
                <span>留言板</span>
                <el-button round size="mini" style="float:right;" @click="closeBoard">收起</el-button>
            </div>
            <div class="board_content">
                <el-form ref="form" :model="form" label-width="180px">
                    <el-input type="textarea" v-model="form.desc" placeholder="输入留言"></el-input>

                </el-form>
                <el-checkbox v-model="form.limit">隐私模式</el-checkbox>
                <el-button style="float: right; padding: 3px 2px;margin:2px;" plain>清除</el-button>
                <el-button style="float: right; padding: 3px 2px;margin:2px;" plain>发布</el-button>
                <div id="messageList">
                    <message-detail v-for="(messageDetail,index) in messageList" :key="index" :messageDetail="messageDetail"></message-detail>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import MessageDetail from './MessageDetail'
    export default {
        name: "MessageBoard",
        data(){
            return {
                form:{
                    desc:"",
                    limit:false
                },
                messageList:[
                    {user:"测试用户",date:"2020/07/12 08:00:12",content:"测试内容"},
                    {user:"测试用户",date:"2020/07/12 12:12:11",content:"测试内容"},
                    {user:"测试用户1",date:"2020/07/12 19:09:55",content:"测试内容"}

                ]
            }
        },
        methods:{
            closeBoard(){
                this.$emit('closeBoard')
            }
        },
        components:{
            MessageDetail
        }
    }
</script>

<style scoped lang="stylus">
    #messageBoard
        .board_title
            padding 0 0 10px 0
        .board_content
            padding 10px 0 0 0
</style>
