<template>
	<div>
		<div class="echart" style="height: 220px;" id="dChart"></div>
	</div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'echartD',
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
      let dChart = this.$echarts.init(document.getElementById('dChart'))
      // 绘制图表
      var option = {
        tooltip: {},
        xAxis: {
          data: ['2/01', '2/01', '2/01', '2/01', '2/01', '2/01', '2/01'],
          axisLabel: {
				            interval: 0,
				            textStyle: {
				                color: '#fff',
				                 fontSize: 12
				            }
				        }
        },
        grid: {
          top: '5%',
          left: '8%',
          right: '5%',
          bottom: '10%'
        },
        yAxis: {
          axisLabel: {
				            formatter: '{value}',
				            color: '#e2e9ff'
				        },
				        axisLine: {
				            show: false
				        },
				        splitLine: {
				            lineStyle: {
				                color: '#989898'
				            }
				        }
        },
        series: [{
          barWidth: '10px',
          name: '个',
          type: 'bar',
          itemStyle: {
				            normal: {
				                color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
				                    [
				                        { offset: 0, color: '#07a4ed' }, // 柱图渐变色                //柱图渐变色
				                        { offset: 1, color: '#1f87be' } // 柱图渐变色
				                    ]
				                )
				            }
				        },
          data: [25, 25, 30, 36, 20, 13, 23]
        }, {
          barWidth: '10px',
          name: '个',
          type: 'bar',
          itemStyle: {
				            normal: {
				                color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
				                    [
				                        { offset: 0, color: '#b48fc2' }, // 柱图渐变色                //柱图渐变色
				                        { offset: 1, color: '#614693' } // 柱图渐变色
				                    ]
				                )
				            }
				        },
          data: [45, 15, 20, 36, 10, 10, 20]
        }]
      }
      dChart.setOption(option)
    }
  }
}
</script>
