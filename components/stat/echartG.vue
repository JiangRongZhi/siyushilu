<template>
	<div>
		<div class="echart" style="height: 220px;" id="gChart"></div>
	</div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts-wordcloud')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'echartG',
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
      let gChart = this.$echarts.init(document.getElementById('gChart'))
      // 绘制图表
      var option = {
        tooltip: {},
        grid: {
          top: '5%',
          left: '8%',
          right: '5%',
          bottom: '10%'
        },
        series: [
					    {
					   		type: 'wordCloud',
					        gridSize: 2,
					        sizeRange: [12, 50],
					        rotationRange: [-90, 90],
					        shape: 'pentagon',
					        textStyle: {
					            normal: {
					                color: function () {
					                    return 'rgb(' + [
					                            Math.round(Math.random() * 255),
					                            Math.round(Math.random() * 255),
					                            Math.round(Math.random() * 255)
					                        ].join(',') + ')'
					                }
					            },
					            emphasis: {
					                shadowBlur: 10,
					                shadowColor: '#333'
					            }
					        },
					        data: [
					            {
					                name: '爱学习',
					                value: 10000
					            }, {
					                name: '双语',
					                value: 6181
					            }, {
					                name: '热门课程',
					                value: 4386
					            }, {
					                name: '互联网',
					                value: 4055
					            }, {
					                name: '大数据',
					                value: 2467
					            }, {
					                name: '金课',
					                value: 2244
					            }, {
					                name: '金锐教育',
					                value: 1898
					            }, {
					                name: '爱学习',
					                value: 10000
					            }, {
					                name: '双语',
					                value: 6181
					            }, {
					                name: '热门课程',
					                value: 4386
					            }, {
					                name: '互联网',
					                value: 4055
					            }, {
					                name: '大数据',
					                value: 2467
					            }, {
					                name: '金课',
					                value: 2244
					            }, {
					                name: '金锐教育',
					                value: 1898
					            }, {
					                name: 'Pitch Perfect',
					                value: 1484
					            }, {
					                name: 'Express',
					                value: 1112
					            }, {
					                name: 'Home',
					                value: 965
					            }, {
					                name: 'Johnny Depp',
					                value: 847
					            }, {
					                name: 'Lena Dunham',
					                value: 582
					            }, {
					                name: 'Lewis Hamilton',
					                value: 555
					            }, {
					                name: 'KXAN',
					                value: 550
					            }, {
					                name: 'Mary Ellen Mark',
					                value: 462
					            }, {
					                name: 'Farrah Abraham',
					                value: 366
					            }, {
					                name: 'Rita Ora',
					                value: 360
					            }, {
					                name: 'Serena Williams',
					                value: 282
					            }, {
					                name: 'NCAA baseball tournament',
					                value: 273
					            }]
					    }
					    ]
      }
      gChart.setOption(option)
    }
  }
}
</script>
