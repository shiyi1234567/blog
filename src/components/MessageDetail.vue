<template>
    <div id="messageDetail">
            <span class="detail_user">{{messageDetail.user.userName}}:</span>
            <span class="detail_content">{{messageDetail.content}}</span>
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
    position relative
    padding 5px 0
    font-size 12px
    font-weight 400
    color #C0C0C0
    .detail_user
        color #99CCFF
</style>
