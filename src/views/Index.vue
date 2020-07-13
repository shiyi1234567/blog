<template>
    <div id="main">
        <el-container style="min-height:100%;">
            <el-aside style="min-height:100%;width:200px;">
                <index-menu></index-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-aside style="min-height:100%;width:200px;" v-show="isShowBoard">
                <message-board :show="isShowBoard" class="board" @closeBoard="troggleBoard" style="width:200px"></message-board>
            </el-aside>
            <el-button icon="el-icon-notebook-1" v-show="!isShowBoard" @click="troggleBoard" style="position: fixed;top:300px;right: 10px;">留言板</el-button>
        </el-container>
    </div>
</template>

<script>
    import IndexMenu from '../components/IndexMenu'
    import MessageBoard from '../components/MessageBoard'
    export default {
        name: "Index",
        data(){
            return {
                form:{
                    desc:"输入留言"
                },
                isShowBoard:true
            }
        },
        methods:{
        troggleBoard(){
            this.isShowBoard = !this.isShowBoard
        }
        },
        components:{
            IndexMenu,
            MessageBoard
        }
    }
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
