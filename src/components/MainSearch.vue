<template>
    <div id="search">
        <div class="search_box">
            <el-input
                    placeholder="请输入检索条件"
                    suffix-icon="el-icon-search"
                    v-model="searchValue"
                    clearable="clearable"
                    @change="search"
            >
            </el-input>
        </div>

    </div>
</template>

<script>
    export default {
        name: "MainSearch",
        data(){
            return{
                searchValue:"",
                clearable:true
            }
        },
        methods:{
            search(){
                this.$emit("search",this.searchValue)
            }
        }
    }
</script>

<style scoped lang="stylus">
#search
    .search_box
        width 180px
        height 48px
</style>
