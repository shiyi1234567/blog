<template>
    <div id="detail">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{contentDetail.title}}</span>
            </div>
            <div class="text item">
                <div>{{contentDetail.desc}}</div>
                <el-button style="float: right; padding: 3px 0" type="text">
                    <router-link :to="{name:'articleLink',params:{id:contentDetail.contentId},query:{a:1}}" tag="span">
                        查看详情
                    </router-link></el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name:"ContentDetail",
        props:['contentDetail']

    }
</script>

<style scoped lang="stylus">
    #detail
        padding-bottom 10px
        overflow hidden
        .text
            font-size: 14px;
        .item
            margin-bottom: 18px;
        .clearfix:before,
        .clearfix:after
            display: table;
            content: "";
        .clearfix:after
            clear: both
        .box-card
            width: 580px;
</style>>
