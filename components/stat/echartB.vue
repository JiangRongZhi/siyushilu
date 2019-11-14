<template>
	<div>
		<div class="echart" style="height: 230px;" id="bChart"></div>
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
  name: 'echartB',
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
      let bChart = this.$echarts.init(document.getElementById('bChart'))
      // 绘制图表
      var option = {
        grid: {
          left: '5%',
          right: '4%',
          bottom: '5%',
          top: '5%',
          containLabel: true
        },

        tooltip: {
          show: 'true',
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 12
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: ['市场营销概论第五章第一节 公共关系策略', '市场营销概论第五章第一节 公共关系策略', '市场营销概论第五章第一节 公共关系策略', '市场营销概论第五章第一节 公共关系策略', '市场营销概论第五章第一节 公共关系策略', '市场营销概论第五章第一节 公共关系策略'],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 12
            }
          },
          axisTick: {
            show: false // 隐藏Y轴刻度
          },
          axisLine: {
            show: false // 隐藏Y轴线段
          },
          offset: 20
        },
        series: [{
          name: '时间(月)',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            normal: {
              show: true,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 1,
					                    [
					                        { offset: 0, color: '#eb8811' }, // 柱图渐变色                //柱图渐变色
					                        { offset: 1, color: '#84569f' } // 柱图渐变色
					                    ]
					               ),
              borderWidth: 0,
              borderColor: '#333'
            }
          },
          barGap: '0%',
          barCategoryGap: '50%',
          data: [649, 575, 414, 312, 116, 600]
        }

        ]
      }
      bChart.setOption(option)
    }
  }
}
</script>
