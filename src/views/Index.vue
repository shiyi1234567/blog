<template>
  <div id="main">
      <el-container style="height: 100%;">
        <el-aside style="height:100%;width:200px;">
          <index-menu></index-menu>
        </el-aside>
        <el-main style="height:100%;padding: 20px;position:relative;">
          <router-view></router-view>
        </el-main>
        <el-aside style="height:100%;" :style="{width:(isShowBoard ? '200px' : '160px')}">
          <message-board
            :show="isShowBoard"
            v-show="isShowBoard"
            class="board"
            @closeBoard="troggleBoard"
            style="width:200px"
          ></message-board>
          <el-button
                icon="el-icon-notebook-1"
                v-show="!isShowBoard"
                @click="troggleBoard"
                style="position: fixed;background-color:transparent;"
                :style="{top:top,right:right}"
                v-drag="flag"
        >留言板</el-button>
        </el-aside>
      </el-container>
  </div>
</template>

<script>
import IndexMenu from "../components/IndexMenu";
import MessageBoard from "../components/MessageBoard";
export default {
  name: "Index",
  data() {
    return {
      form: {
        desc: "输入留言"
      },
      isShowBoard: true,
        top:"100px",
        right:"10px",
        flag:false
    };
  },
  methods: {
    troggleBoard() {
        if(this.flag){
            this.flag = !this.flag;
            return
        }
      this.isShowBoard = !this.isShowBoard;
    }
  },
    directives:{
        drag(el,modifiers,value){
            if(!window.event) return
            let _this = value.context;
            el.style.position = "fixed";
            let {x,y} = modifiers;
            el.addEventListener("mousedown",down);

            let disX,disY;
            function down(e){
                disX = e.offsetX;
                disY = e.offsetY;
                document.addEventListener("mousemove",move);
                document.addEventListener("mouseup",up)
            }
            function move(e){
                _this.flag = true;
                let l = e.clientX - disX;
                let t = e.clientY - disY;
                if(value){

                    if(x){
                        el.style.left = l + 'px';
                    }
                    if(y){
                        el.style.top = t + 'px';
                    }

                    if(x&&y || (!x&&!y)){
                        el.style.left = l + 'px';
                        el.style.top = t + 'px';
                    }
                }

            }

            function up(){
                document.removeEventListener("mousemove",move);
                document.removeEventListener("mouseup",up);
            }
        }
    },
  components: {
    IndexMenu,
    MessageBoard
  }
};
</script>

<style scoped lang="stylus">
#main
  height 100%
  min-height 100%
  width 100%
  .el-main
    padding 0
  .board
    position fixed
    top 0
    right 0
</style>
