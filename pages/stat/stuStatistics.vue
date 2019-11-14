<template>
	<div class="wrap">
		<el-container>
			<div class="sub-navbar">
				<div class="main">
					<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" background-color="#44bd9a" text-color="#fff" active-text-color="#000">
						<el-menu-item index="1">班级金课</el-menu-item>
						<el-menu-item index="2">我的收藏</el-menu-item>
						<el-menu-item index="3">学习统计</el-menu-item>
					</el-menu>
				</div>
			</div>
			<div class="uc-container">
				<div class="main">
					<div class="data-cells">
						<div class="data-li">
							<div class="data-cell">
								<img src="/image//time.png" class="icon" alt="" />
								<div class="data-number">1234</div>
								<div class="data-txt">学习总时长(分钟)</div>
							</div>
						</div>
						<div class="data-li">
							<div class="data-cell">
								<img src="/image//xian.png" class="icon" alt="" />
								<div class="data-number">12</div>
								<div class="data-txt">学习活跃度(点)</div>
							</div>
						</div>
					</div>
					<div class="echart" style="height: 370px;" id="myChart"></div>
					<div class="uc-line"></div>
					<div class="sts-main">
						<el-row :gutter="15">
							<el-col :span="8">
								<div class="sts-card">
									<div class="txt">学习金课数量</div>
									<div class="number">12357</div>
									<div class="sts-icon">
										<img src="/image//icon/11.png" alt="" />
									</div>
								</div>
							</el-col>
							<el-col :span="8">
								<div class="sts-card">
									<div class="txt">学习金课数量</div>
									<div class="number">12357</div>
									<div class="sts-icon">
										<img src="/image//icon/22.png" alt="" />
									</div>
								</div>
							</el-col>
							<el-col :span="8">
								<div class="sts-card">
									<div class="txt">收藏数量</div>
									<div class="number">12357</div>
									<div class="sts-icon">
										<img src="/image//icon/33.png" alt="" />
									</div>
								</div>
							</el-col>
							<el-col :span="8">
								<div class="sts-card">
									<div class="txt">播放次数</div>
									<div class="number">12357</div>
									<div class="sts-icon">
										<img src="/image//icon/44.png" alt="" />
									</div>
								</div>
							</el-col>
							<el-col :span="8">
								<div class="sts-card">
									<div class="txt">评论次数</div>
									<div class="number">12357</div>
									<div class="sts-icon">
										<img src="/image//icon/55.png" alt="" />
									</div>
								</div>
							</el-col>
							<el-col :span="8">
								<div class="sts-card">
									<div class="txt">点赞次数</div>
									<div class="number">12357</div>
									<div class="sts-icon">
										<img src="/image//icon/66.png" alt="" />
									</div>
								</div>
							</el-col>
						</el-row>
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
export default {
  layout: 'aijinke',
  data () {
    return {
      activeIndex: '4',
      activeIndex2: '3',
      input4: ''
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    formatter (row, column) {
      return row.address
    },
    drawLine () {
		        // 基于准备好的dom，初始化echarts实例
		        let myChart = 				this.$echarts.init(document.getElementById('myChart'))
		        // 绘制图表
		        myChart.setOption({
		        	color: ['#3398DB'],
		            title: { text: '近一周金课发布情况（个）', x: 'center' },
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
		    }
  }
}
</script>
