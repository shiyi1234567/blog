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
        <el-button style="float: right; padding: 3px 2px;margin:2px;" plain @click="cleanContent">清除</el-button>
        <el-button style="float: right; padding: 3px 2px;margin:2px;" plain @click="sendContent">发布</el-button>
      </div>
      <div id="messageList" class="color_line_top">
        <message-detail
          v-for="(messageDetail,index) in messageList"
          :key="index"
          :messageDetail="messageDetail"
        ></message-detail>
      </div>
    </el-card>
  </div>
</template>
<script>
import MessageDetail from "./MessageDetail";
export default {
  name: "MessageBoard",
  data() {
    return {
      form: {
        desc: "",
        limit: false
      },
      messageList: []
    };
  },
  async created() {
    //获取最新的十条留言内容

      let result = await this.$axios.post('http://localhost:3000/findMessage',{page:1,limit:10});
      if(result.data.err === 0){
          console.log(result);
          this.messageList = result.data.data;
      }
  },
  methods: {
    closeBoard() {
      this.$emit("closeBoard");
    },
    cleanContent() {
      this.form.desc = "";
    },
    async sendContent() {
      //取Vuex中保存的用户信息
      if (this.form.desc === "") return;
      let { userId, userName } = this.$store.state;
      let result = await this.$axios.post('http://localhost:3000/addMessage',{userId,userName,content:this.form.desc,privacy:this.form.limit});
     if(result.data.err===0){
         this.messageList = result.data.data;
     }
        this.form.desc = "";
    }
  },
  components: {
    MessageDetail
  }
};
</script>

<style scoped lang="stylus">
#messageBoard
  .board_title
    padding 0 0 10px 0
  .board_content
    padding 10px 0 0 0
  #messageList
    margin-top 8px
</style>
