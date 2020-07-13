<template>
    <div id="messageDetail">
        <div class="detail_head">
            <span class="detail_title">{{messageDetail.user}}</span>
        </div>
        <div>

            <p class="detail_content">{{messageDetail.content}}</p>
        </div>
        <div class="detail_footer"><span class="detail_date">{{messageDetail.date}}</span>
            <span>回复</span></div>
    </div>
</template>

<script>
    export default {
        name: "MessageDetail",
        props:['messageDetail']
    }
</script>

<style scoped lang="stylus">
#messageDetail
    padding-top 5px
    .detail_head
        overflow hidden
        .detail_title
            float left
            font-size 14px
    p
        margin 2px 0
        font-size 12px
    .detail_footer
            font-size 10px
    .detail_content
        display block
        width 100%
</style>
