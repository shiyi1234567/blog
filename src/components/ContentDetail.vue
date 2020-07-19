<template>
    <div id="detail">
        <el-card class="box-card">
            <div>
                <div class="card_title">
                    <span>{{contentDetail.title}}</span>
                    <span class="right" style="color: #2e2e2e;">{{contentDetail.author}}</span>
                </div>
            </div>
            <div>
                <p class="card_content ">&nbsp;&nbsp;&nbsp;&nbsp;{{contentDetail.desc}}</p>
                <span class="card_date color_blue" style="float: left;">{{contentDetail.date}}</span>
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
        padding-bottom 5px
        overflow hidden
        font-size 12px
        .box-card
            .card_title
                line-height 24px
                font-size 14px
                font-weight bold
            .card_date
                padding-left 20px
</style>>
