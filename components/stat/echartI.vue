<template>
	<div>
		<div class="echart" style="height: 220px;" id="iChart"></div>
	</div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'echartH',
  data () {
    return {

    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let iChart = this.$echarts.init(document.getElementById('iChart'))
      // 绘制图表
				 var dataIPSxAxis = ['05/20  ', '05/24', '05/27', '05/29 ', '05/02 ', '05/08']
				 var dataIPS = [50, 80, 110, 150, 120, 100]
      var option = {
				     tooltip: {
				         trigger: 'axis',
				         axisPointer: {
				             type: 'cross',
				             label: {
				                 backgroundColor: '#6a7985'
				             }
				         }
				     },
				     color: ['#0080ff', '#4cd5ce'],
				     toolbox: {
				         // feature: {
				         //     saveAsImage: {}
				         // }
				     },
				     grid: {
				         left: '5%',
				        right: '5%',
				        top: '10%',
				        bottom: '5%',
				         containLabel: true
				     },
				     xAxis: [{
				         type: 'category',
				         boundaryGap: false,
				         data: dataIPSxAxis,
				         axisLabel: {
				             show: true,
				             textStyle: {
				                 color: '#fff',
				                 fontSize: 12
				             }
				         },
				         axisLine: {
				             lineStyle: {
				                 color: '#0a2b52',
				                 width: 0.5 // 这里是为了突出显示加上的
				             }
				         }
				     }],
				     yAxis: [{
				         type: 'value',
				         axisLine: {
				             onZero: false,
				             lineStyle: {
				                 color: '#0a2b52',
				                 width: 1 // 这里是为了突出显示加上的
				             }
				         },

				         axisLabel: {
				             formatter: function (val) {
				                 return val + ''
				             },
				             show: true,
				             textStyle: {
				                 color: '#fff' // 字体颜色
				             }
				         },
				          splitLine: {
				                show: false,
				                lineStyle: {
				                    type: 'dashed'

				                }

				            }
				     }],
				     series: [
				         {
				             name: '金课程近一周发布情况(个)',
				             type: 'line',
				             smooth: true,
				             //  symbol: "none", //去掉折线点
				             stack: 100,
				             itemStyle: {
				                 normal: { // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
				                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				                         offset: 0,
				                         color: '#069577' // 0% 处的颜色
				                     }, {
				                         offset: 0.5,
				                         color: '#336ba8' // 100% 处的颜色
				                     }, {
				                         offset: 1,
				                         color: '#584d77' // 100% 处的颜色
				                     }])
				                 }
				             }, // 线条样式
				             symbolSize: 5, // 折线点的大小
				             areaStyle: {
				                 normal: {}
				             },
				             data: dataIPS
				         }
				     ]
				 }
      iChart.setOption(option)
    }
  }
}
</script>
