<template>
	<div>
		<div class="echart" style="height: 230px;" id="myChart"></div>
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
  name: 'echartA',
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
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      var option = {
        tooltip: {},
        xAxis: {
          data: ['小明', '小红', '王毅', '张三', '李四', '扬天', '六六'],
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
          barWidth: '16px',
          name: '个',
          type: 'bar',
          itemStyle: {
				            normal: {
				                color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
				                    [
				                        { offset: 0, color: '#8557a0' }, // 柱图渐变色                //柱图渐变色
				                        { offset: 1, color: '#0168b3' } // 柱图渐变色
				                    ]
				                )
				            }
				        },
          data: [5, 15, 20, 36, 10, 10, 20]
        }]
      }
      myChart.setOption(option)
    }
  }
}
</script>
