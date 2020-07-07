<template>
    <div id="main">
        <div id="main-header">
            <index-header></index-header>
        </div>
        <div id="main-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import IndexHeader from '../components/IndexHeader'
    export default {
        name: "Index",
        components:{
            IndexHeader
        }
    }
</script>

<style scoped>

</style>
