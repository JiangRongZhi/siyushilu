<template>
	<div class="wrap">
			<MineTop active="stat"></MineTop>
			<div class="uc-container">
				<div class="main">
					<ul class="sbk-tab">
						<li class="active"><router-link to="/stat/teacher/teacherStatistics">统计报告</router-link></li>
						<li><router-link to="/stat/teacher/classStatistics">数据分析</router-link></li>
					</ul>
					<div class="data-cells">
						<div class="data-li">
							<div class="data-cell">
								<img src="/image/time.png" class="icon" alt="" />
								<div class="data-number">1234</div>
								<div class="data-txt">学习总时长(分钟)</div>
							</div>
						</div>
						<div class="data-li">
							<div class="data-cell">
								<img src="/image/xian.png" class="icon" alt="" />
								<div class="data-number">12</div>
								<div class="data-txt">学习活跃度(点)</div>
							</div>
						</div>
					</div>
					<div class="pie-main">
						<el-row :gutter="20">
							<el-col :span="8">
								<div id="pieChart" class="pieMain"></div>
							</el-col>
							<el-col :span="8">
								<div id="pieChart2" class="pieMain"></div>
							</el-col>
							<el-col :span="8">
								<div id="pieChart3" class="pieMain"></div>
							</el-col>
						</el-row>
					</div>
					<div class="uc-line"></div>
					<div class="echart" style="height: 370px;" id="myChart"></div>
				</div>
			</div>
	</div>
</template>
<script>
import { mapActions } from 'vuex'
import utils from '@/scripts/utils.js'
import MineTop from '@/components/mine/Mine-Top.vue'
import { hasToken } from '@/scripts/mixin'
export default {
  layout: 'aijinke',
  name: 'StatTeacherStatistics',
   components: {
    MineTop
  },
  mixins: [hasToken],
  data () {
    return {
      activeIndex: '4',
      activeIndex2: '4',
      input4: ''
    }
  },
  mounted () {
    this.drawLine()
    this.drawPie()
    this.drawPie2()
    this.drawPie3()
  },
  methods: {
    formatter (row, column) {
      return row.address
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        color: ['#3398DB'],
        title: {
          text: '近一周金课发布情况（个）',
          x: 'center'
        },
        tooltip: {},
        xAxis: {
          data: ['03/04', '03/04', '03/04', '03/04', '03/04', '03/04']
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '8%'
        },
        yAxis: {},
        series: [{
          barWidth: '20%',
          name: '个',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    },
    drawPie () {
      // 基于准备好的dom，初始化echarts实例
      let pieChart = this.$echarts.init(document.getElementById('pieChart'))
      // 绘制图表
      pieChart.setOption({
        color: ['#44bd9a', '#5ac8fb', '#ff8563', '#ffc600'],
        title: {
          text: '金课统计'
				    },
				    tooltip: {
				        trigger: 'item',
				        formatter: '{a} <br/>{b}: {c} ({d}%)'
				    },
				    legend: {
				        orient: 'vertical',
				        x: 'center',
				        y: 'bottom',
				        data: ['金课总数', '已发布金课数', '未发布金课数', '上传金课数']
				    },
				    series: [
				        {
				            name: '金课统计',
				            type: 'pie',
				            radius: ['40%', '60%'],
				            center: ['50%', '40%'],
				            avoidLabelOverlap: false,
				            label: {
				                normal: {
				                    show: false,
				                    position: 'center'
				                },
				                emphasis: {
				                    show: true,
				                    textStyle: {
				                        fontSize: '20',
				                        fontWeight: 'bold'
				                    }
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            data: [
				                { value: 335, name: '金课总数' },
				                { value: 310, name: '已发布金课数' },
				                { value: 234, name: '未发布金课数' },
				                { value: 135, name: '上传金课数' }
				            ]
				        }
				    ]
      })
    },
    drawPie2 () {
      // 基于准备好的dom，初始化echarts实例
      let pieChart2 = this.$echarts.init(document.getElementById('pieChart2'))
      // 绘制图表
      pieChart2.setOption({
        color: ['#44bd9a', '#5ac8fb', '#ff8563', '#ffc600'],
        title: {
          text: '金课程统计'
				    },
				    tooltip: {
				        trigger: 'item',
				        formatter: '{a} <br/>{b}: {c} ({d}%)'
				    },
				    legend: {
				        orient: 'vertical',
				        x: 'center',
				        y: 'bottom',
				        data: ['金课总数', '已发布金课数', '未发布金课数', '上传金课数']
				    },
				    series: [
				        {
				            name: '金课程统计',
				            type: 'pie',
				            radius: ['40%', '60%'],
				            center: ['50%', '40%'],
				            avoidLabelOverlap: false,
				            label: {
				                normal: {
				                    show: false,
				                    position: 'center'
				                },
				                emphasis: {
				                    show: true,
				                    textStyle: {
				                        fontSize: '20',
				                        fontWeight: 'bold'
				                    }
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            data: [
				                { value: 335, name: '金课总数' },
				                { value: 310, name: '已发布金课数' },
				                { value: 234, name: '未发布金课数' },
				                { value: 135, name: '上传金课数' }
				            ]
				        }
				    ]
      })
    },
    drawPie3 () {
      // 基于准备好的dom，初始化echarts实例
      let pieChart3 = this.$echarts.init(document.getElementById('pieChart3'))
      // 绘制图表
      pieChart3.setOption({
        color: ['#44bd9a', '#5ac8fb', '#ff8563', '#ffc600'],
        title: {
          text: '互动统计'
				    },
				    tooltip: {
				        trigger: 'item',
				        formatter: '{a} <br/>{b}: {c} ({d}%)'
				    },
				    legend: {
				        orient: 'vertical',
				        x: 'center',
				        y: 'bottom',
				        data: ['金课总数', '已发布金课数', '未发布金课数', '上传金课数']
				    },
				    series: [
				        {
				            name: '金课统计',
				            type: 'pie',
				            radius: ['40%', '60%'],
				            center: ['50%', '40%'],
				            avoidLabelOverlap: false,
				            label: {
				                normal: {
				                    show: false,
				                    position: 'center'
				                },
				                emphasis: {
				                    show: true,
				                    textStyle: {
				                        fontSize: '20',
				                        fontWeight: 'bold'
				                    }
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            data: [
				                { value: 335, name: '金课总数' },
				                { value: 310, name: '已发布金课数' },
				                { value: 234, name: '未发布金课数' },
				                { value: 135, name: '上传金课数' }
				            ]
				        }
				    ]
      })
    }
  }
}
</script>
