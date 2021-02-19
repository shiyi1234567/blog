<template>
    <div id="dataSystem">
        <div id="echarts_box">

        </div>
    </div>
</template>

<script>
    const echarts  = require('echarts');
    export default {
        name:"DataSystem",
        mounted(){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('echarts_box'));
// 绘制图表
            myChart.setOption({
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });

        }
    }
</script>

<style scoped lang="stylus">
#dataSystem
    #echarts_box
        width 50%
        height 400px
</style>
