<template>
	<div>
		<div class="echart" style="height: 250px;" id="eChart"></div>
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
  name: 'eChart',
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
      let eChart = this.$echarts.init(document.getElementById('eChart'))
      // 绘制图表
      var option = {
        title: {
				        text: '金课数量教学单位排行榜(个)',
				        x: 'center',
				        y: 'top',
				        textStyle: {
				            color: '#fff',
				            fontsize: '20px'
				        }
				    },
				    legend: {
				        right: '0',
    					bottom: '50',
				        itemWidth: 10,
				        itemHeight: 10,
				        orient: 'vertical',
				        textStyle: {
				            color: '#d9efff'
				        },
				        data: ['商学院', '市场营销', '计算机学院', '外语学院', '文学院', '其他']
				    },
				     graphic: {
				         elements: [{
				             type: 'image',
				             style: {
				                 // image: giftImageUrl,
				                 width: 30,
				                 height: 30
				             },
				             left: 'center',
				             top: 'center'
				         }]
				     },
				     series: [{
				         type: 'pie',
				         radius: ['40%', '75%'],
				         center: ['40%', '55%'],
				         roseType: 'radius',
				         color: ['#edec82', '#25b38b', '#0078c1', '#f9c055', '#9658a1', '#0297db' ],
				         data: [{
				             value: 36,
				             name: '商学院'
				         }, {
				             value: 30,
				             name: '市场营销'
				         }, {
				             value: 35,
				             name: '计算机学院'
				         }, {
				             value: 33,
				             name: '外语学院'
				         }, {
				             value: 43,
				             name: '文学院'
				         }, {
				             value: 65,
				             name: '其他'
				         }],
				         label: {
				             normal: {
				                 position: 'inside', // 标签的位置
				                 textStyle: {
				                     fontSize: 14
				                 },
				                 formatter: function (param) {
				                     return param.value
				                 }
				             }
				         },
				         labelLine: {
				             normal: {
				                 smooth: true,
				                 lineStyle: {
				                     width: 2
				                 }
				             }
				         },
				         itemStyle: {
				             normal: {
				                 shadowBlur: 30,
				                 shadowColor: 'rgba(0, 0, 0, 0.4)'
				             }
				         },

				         animationType: 'scale',
				         animationEasing: 'elasticOut',
				         animationDelay: function (idx) {
				             return Math.random() * 100
				         }
				     }]
      }
      eChart.setOption(option)
    }
  }
}
</script>
