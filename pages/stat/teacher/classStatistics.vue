<template>
	<div class="wrap">
		<el-container>
      <MineTop active="stat"></MineTop>
			<div class="uc-container">
				<div class="main">
					<ul class="sbk-tab">
						<li>
							<router-link to="/stat/teacher/teacherStatistics">统计报告</router-link>
						</li>
						<li class="active">
							<router-link to="/stat/teacher/classStatistics">数据分析</router-link>
						</li>
					</ul>
					<div class="search-filter">
						<el-form ref="form" :model="form" label-width="80px">
							<el-row :gutter="20">
								<el-col :span="8">
									<el-form-item label="选择时间">
										<el-select v-model="form.times" placeholder="选择时间">
											<el-option label="2018-2019学年" value="tt1"></el-option>
											<el-option label="2018-2019学年" value="tt2"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="选择班级">
										<el-select v-model="form.ccs" placeholder="选择班级">
											<el-option label="市场营销0901班" value="cc1"></el-option>
											<el-option label="市场营销0901班" value="cc2"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-button type="success" @click="goStat">查询</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<div class="pie-main">
						<div class="pie-header">班级统计</div>
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
					<div class="pie-cell">
						<div class="pie-header">本人金课在该半班受欢迎排行</div>
						<el-tabs v-model="activeName" type="card" lazy="true">
							<el-tab-pane label="学习时长" name="first" lazy>
								<div id="drawline1" style="height: 250px;"></div>
							</el-tab-pane>
							<el-tab-pane label="播放次数" name="second" lazy>

								<div id="drawline2" style="height: 250px;"></div>
							</el-tab-pane>
							<el-tab-pane label="评论次数" name="third" lazy>
								<div id="drawline3" style="height: 250px;"></div>
							</el-tab-pane>
							<el-tab-pane label="点赞次数" name="fourth" lazy>

								<div id="drawline4" style="height: 250px;"></div>
							</el-tab-pane>
							<el-tab-pane label="收藏次数" name="five" lazy>
								<div id="drawline5" style="height: 250px;"></div>
							</el-tab-pane>
						</el-tabs>
					</div>
				</div>
			</div>
			<el-footer height="90px">
				<div class="copyight">
					Copyright @2013沪公网备案3101163466277号
				</div>
			</el-footer>
		</el-container>
	</div>
</template>
<script>
import { mapActions } from 'vuex'
import utils from '@/scripts/utils.js'
import MineTop from '@/components/mine/Mine-Top.vue'
import { hasToken } from '@/scripts/mixin'
export default {
  layout: 'aijinke',
   components: {
    MineTop
  },
  mixins: [hasToken],
  data () {
    return {
      activeIndex: '4',
      activeIndex2: '3',
      input4: '',
      activeName: 'first',
      form: {
        times: '',
        ccs: ''
      }
    }
  },
  mounted () {
    this.drawPie()
    this.drawPie2()
    this.drawPie3()
    this.drawline1()
  },
  methods: {

    goStat(){
      console.log(this.form.times);
      console.log(this.form.ccs)
      this.$router.push('/stat/teacher/statistics')

    },
    drawPie () {
      // 基于准备好的dom，初始化echarts实例
      let pieChart = this.$echarts.init(document.getElementById('pieChart'))
      // 绘制图表
      pieChart.setOption({
        color: ['#2396ef', '#ffc600', '#d3d4d8'],
        title: {
          text: '学习情况'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'center',
          y: 'bottom',
          data: ['班级人数', '人均学习金课时长', '人均学习金课数量']
        },
        series: [{
          name: '学习情况',
          type: 'pie',
          radius: ['40%', '50%'],
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
          data: [{
            value: 40,
            name: '班级人数'
          },
          {
            value: 168,
            name: '人均学习金课时长'
          },
          {
            value: 25,
            name: '人均学习金课数量'
          }
          ]
        }]
      })
    },
    drawPie2 () {
      // 基于准备好的dom，初始化echarts实例
      let pieChart2 = this.$echarts.init(document.getElementById('pieChart2'))
      // 绘制图表
      pieChart2.setOption({
        color: ['#2396ef', '#ffc600', '#d3d4d8'],
        title: {
          text: '互动情况'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'center',
          y: 'bottom',
          data: ['人均播放本人金课次数', '人均评论本人金课次数', '人均学习本人金课次数']
        },
        series: [{
          name: '学习情况',
          type: 'pie',
          radius: ['40%', '50%'],
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
          data: [{
            value: 80,
            name: '人均播放本人金课次数'
          },
          {
            value: 33,
            name: '人均评论本人金课次数'
          },
          {
            value: 90,
            name: '人均学习本人金课次数'
          }
          ]
        }]
      })
    },
    drawPie3 () {
      // 基于准备好的dom，初始化echarts实例
      let pieChart3 = this.$echarts.init(document.getElementById('pieChart3'))
      // 绘制图表
      pieChart3.setOption({
        color: ['#2396ef', '#ffc600', '#d3d4d8'],
        title: {
          text: '收藏情况'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'center',
          y: 'bottom',
          data: ['收藏总户数', '人均收藏本人金课数', '人均收藏本人金课程数']
        },
        series: [{
          name: '收藏情况',
          type: 'pie',
          radius: ['40%', '50%'],
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
          data: [{
            value: 90,
            name: '收藏总户数'
          },
          {
            value: 15,
            name: '人均收藏本人金课数'
          },
          {
            value: 25,
            name: '人均收藏本人金课程数'
          }
          ]
        }]
      })
    },
    // 播放时长
    drawline1 () {
      // 基于准备好的dom，初始化echarts实例
      let drawline1 = this.$echarts.init(document.getElementById('drawline1'))
      // 绘制图表
      drawline1.setOption({
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

        label: {
          show: true,
          position: 'right',
          color: '#000',
          fontSize: 14
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
            show: false
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
              color: '#58595b',
              fontSize: 16
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
          barWidth: 16,
          itemStyle: {
            normal: {
              show: true,
              color: '#2396ef',
              barBorderRadius: 8,
              borderWidth: 0,
              borderColor: '#333'
            }
          },
          barGap: '0%',
          barCategoryGap: '50%',
          data: [649, 575, 414, 312, 116, 600]
        }

        ]
      })
    },
    // 播放时长
    drawline2 () {
      // 基于准备好的dom，初始化echarts实例
      let drawline2 = this.$echarts.init(document.getElementById('drawline2'))
      // 绘制图表
      drawline2.setOption({
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

        label: {
          show: true,
          position: 'right',
          color: '#000',
          fontSize: 14
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
            show: false
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
              color: '#58595b',
              fontSize: 16
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
          barWidth: 16,
          itemStyle: {
            normal: {
              show: true,
              color: '#2396ef',
              barBorderRadius: 8,
              borderWidth: 0,
              borderColor: '#333'
            }
          },
          barGap: '0%',
          barCategoryGap: '50%',
          data: [649, 575, 414, 312, 116, 600]
        }

        ]
      })
    },
    // 播放时长
    drawline3 () {
      // 基于准备好的dom，初始化echarts实例
      let drawline3 = this.$echarts.init(document.getElementById('drawline3'))
      // 绘制图表
      drawline3.setOption({
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

        label: {
          show: true,
          position: 'right',
          color: '#000',
          fontSize: 14
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
            show: false
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
              color: '#58595b',
              fontSize: 16
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
          barWidth: 16,
          itemStyle: {
            normal: {
              show: true,
              color: '#2396ef',
              barBorderRadius: 8,
              borderWidth: 0,
              borderColor: '#333'
            }
          },
          barGap: '0%',
          barCategoryGap: '50%',
          data: [649, 575, 414, 312, 116, 600]
        }

        ]
      })
    },
    // 播放时长
    drawline4 () {
      // 基于准备好的dom，初始化echarts实例
      let drawline4 = this.$echarts.init(document.getElementById('drawline4'))
      // 绘制图表
      drawline4.setOption({
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

        label: {
          show: true,
          position: 'right',
          color: '#000',
          fontSize: 14
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
            show: false
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
              color: '#58595b',
              fontSize: 16
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
          barWidth: 16,
          itemStyle: {
            normal: {
              show: true,
              color: '#2396ef',
              barBorderRadius: 8,
              borderWidth: 0,
              borderColor: '#333'
            }
          },
          barGap: '0%',
          barCategoryGap: '50%',
          data: [649, 575, 414, 312, 116, 600]
        }

        ]
      })
    },
    // 播放时长
    drawline5 () {
      // 基于准备好的dom，初始化echarts实例
      let drawline5 = this.$echarts.init(document.getElementById('drawline5'))
      // 绘制图表
      drawline5.setOption({
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

        label: {
          show: true,
          position: 'right',
          color: '#000',
          fontSize: 14
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
            show: false
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
              color: '#58595b',
              fontSize: 16
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
          barWidth: 16,
          itemStyle: {
            normal: {
              show: true,
              color: '#2396ef',
              barBorderRadius: 8,
              borderWidth: 0,
              borderColor: '#333'
            }
          },
          barGap: '0%',
          barCategoryGap: '50%',
          data: [649, 575, 414, 312, 116, 600]
        }

        ]
      })
    }
  }
}
</script>
