<template>
	<div class="wrap">
		<el-container>
			<div class="uc-container">
				<div class="main">
					<el-container>
						<div class="uc-breadcrumb">
							<el-breadcrumb separator-class="el-icon-arrow-right">
								<el-breadcrumb-item><router-link to="/stat/teacher/classStatistics">返回上一级</router-link></el-breadcrumb-item>
								<el-breadcrumb-item>数据分享</el-breadcrumb-item>
								<el-breadcrumb-item>市场营销1901班</el-breadcrumb-item>
							</el-breadcrumb>
						</div>
					</el-container>
					<div class="search-bar">
						<el-form :inline="true">

							<el-form-item>
								<el-input
							    placeholder="请输入姓名或学号"
							    v-model="input4">
								    <i slot="prefix" class="el-input__icon el-icon-search"></i>
								</el-input>
							</el-form-item>
							<el-button type="success">查 询</el-button>
							<el-button type="success">查 询详情</el-button>
						</el-form>
						<el-link type="primary">导出结果</el-link>
					</div>
					<div class="uc-table">
						<el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
							<el-table-column prop="nn" width="100" label="序号">
							</el-table-column>
							<el-table-column prop="xnn" width="100" label="学号">
							</el-table-column>
							<el-table-column prop="name" width="100" label="姓名">
							</el-table-column>
							<el-table-column prop="kc" label="学习本人金课程" sortable>
							</el-table-column>
							<el-table-column prop="kcnn" label="学习本人金课程时长" sortable>
							</el-table-column>
							<el-table-column prop="kcallnn" width="150" label="学习总时长" sortable>
							</el-table-column>
							<el-table-column prop="playnn" width="110" label="播放次数" sortable>
							</el-table-column>
							<el-table-column prop="comment" width="110" label="评论数" sortable>
							</el-table-column>
							<el-table-column prop="zup" width="110" label="点赞数" sortable>
							</el-table-column>
						</el-table>
					</div>
					<div class="page-footer">
						<el-pagination
						  background
						  layout="prev, pager, next"
						  :total="1000">
						</el-pagination>
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
      activeIndex2: '4',
      input4: '',
      tableData: [{
        nn: '1',
        xnn: '031',
        name: '张鑫向',
        kc: '233',
        kcnn: '98',
        kcallnn: '32',
        playnn: '231',
        comment: '13',
        zup: '55'
      }, {
        nn: '2',
        xnn: '031',
        name: '张鑫向',
        kc: '233',
        kcnn: '98',
        kcallnn: '32',
        playnn: '231',
        comment: '13',
        zup: '55'
      }, {
        nn: '3',
        xnn: '031',
        name: '张鑫向',
        kc: '133',
        kcnn: '58',
        kcallnn: '52',
        playnn: '731',
        comment: '23',
        zup: '35'
      }, {
        nn: '4',
        xnn: '031',
        name: '张鑫向',
        kc: '233',
        kcnn: '68',
        kcallnn: '78',
        playnn: '22',
        comment: '11',
        zup: '45'
      },, {
          nn: '5',
          xnn: '031',
          name: '张鑫向',
          kc: '133',
          kcnn: '58',
          kcallnn: '13',
          playnn: '32',
          comment: '43',
          zup: '35'
        }, {
          nn: '6',
          xnn: '031',
          name: '张鑫向',
          kc: '233',
          kcnn: '68',
          kcallnn: '12',
          playnn: '41',
          comment: '33',
          zup: '45'
        },, {
          nn: '7',
          xnn: '031',
          name: '张鑫向',
          kc: '133',
          kcnn: '58',
          kcallnn: '52',
          playnn: '731',
          comment: '23',
          zup: '35'
        }, {
          nn: '8',
          xnn: '031',
          name: '张鑫向',
          kc: '233',
          kcnn: '14',
          kcallnn: '12',
          playnn: '12',
          comment: '11',
          zup: '34'
        },, {
          nn: '9',
          xnn: '031',
          name: '张鑫向',
          kc: '133',
          kcnn: '58',
          kcallnn: '65',
          playnn: '55',
          comment: '45',
          zup: '33'
        }, {
          nn: '10',
          xnn: '031',
          name: '张鑫向',
          kc: '233',
          kcnn: '68',
          kcallnn: '66',
          playnn: '55',
          comment: '44',
          zup: '45'
        }
      ]
    }
  },
  methods: {
    formatter (row, column) {
      return row.address
    }
  }
}
</script>
