<template>
  <div class="lesson-manager-wrap">
    <CollTop active="course"></CollTop>
    <div class="container-1200">
      <div class="manager-top">
        <div class="search-word" v-if="search">
          搜索
          <span>“{{option.word}}”</span>,共
          <span>{{count}}</span>条结果
        </div>
        <div class="manager-search">
          <el-input v-model="option.word" placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </div>
      </div>
      <div class="manager-content">
        <div class="manager-head">
          <span>名称</span>
          <el-button type="text" class="pull-right" @click="handleOrder">
            创建时间
            <i class="el-icon--right" :class="orderTop?'el-icon-bottom':'el-icon-top'"></i>
          </el-button>
        </div>
        <div class="manager-body">
          <a-row :split="5" :gutter="10">
            <a-col v-for="item in courseList" :key="item.id">
              <CourseItem class="course-item" :data="item"></CourseItem>
            </a-col>
          </a-row>
          <!-- <div class="normal-pagination manager-pagination">
            <Pagination
              :page="option.page"
              :size="option.limit"
              :total="courseList.totalCount"
              @change="handlePaginationChange"
            ></Pagination>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CollTop from '@/components/mine/Coll-Top.vue'
import Pagination from '@/components/public/Pagination.vue'
import CourseItem from '@/components/course/Course-Item2.vue'
export default {
    layout: 'aijinke',
    components: {
        CollTop,
        CourseItem,
        Pagination
    },
    data() {
        return {
            search: false,
            orderTop: true,
            count: 0,
            courseList: [],
            option: {
                word: '',
                page: 1, // 页码
                limit: 20 // 条数
            }
        }
    },
    mounted() {
        this.getCourseCollectionList(this.option).then(res => {
            this.courseList = res
        })
    },
    methods: {
        ...mapActions('mine', ['getCourseCollectionList']),
        // 分页按钮
        handlePaginationChange(e) {
            this.option.page = e
            this.getCourseCollectionList(this.option).then(res => {
                this.courseList = res.list
            })
        },
        //排序
        handleOrder() {
            this.orderTop = !this.orderTop
            this.courseList.sort((a, b) => {
                let aTime = a.publishTime
                let bTime = b.publishTime
                let aTimes = new Date(aTime).getTime()
                let bTimes = new Date(bTime).getTime()
                if (!this.orderTop) {
                    return aTimes - bTimes
                } else {
                    return bTimes - aTimes
                }
            })
        },
        //搜索
        handleSearch() {
            this.option.word ? (this.search = true) : (this.search = false)
            this.getCourseCollectionList(this.option).then(res => {
                this.courseList = res.list
                //console.log(res.list)
                this.count = this.courseList.length
            })
        }
    }
}
</script>

<style lang="less">
.lesson-manager-wrap {
    .manager-top {
        height: 60px;
        .manager-function {
            float: left;
            padding: 10px 0;
        }
        .manager-search {
            float: right;
            padding: 10px 0;
        }
    }

    .manager-content {
        border: 1px solid @color-border-gray1;
        margin-top: 10px;
        margin-bottom: 30px;
        overflow: hidden;
        .manager-body {
            padding: 10px;
            .normal-pagination {
                padding-bottom: 0;
            }
        }
        .manager-head {
            padding: 8px 15px;
            background-color: @color-bgc-gray0;
            border-bottom: 1px solid @color-border-gray1;
            height: 30px;
            margin-bottom: 10px;
            .el-button--text {
                padding: 0;
                color: @color-text;
            }
        }
    }
}
.mright-10 {
    margin-right: 10px;
}
.tr-row {
    min-height: 30px;
    line-height: 30px;
    .tr-row-button {
        display: none;
        float: right;
    }

    &:hover {
        color: red;
        .tr-row-button {
            display: inline-block;
            margin-left: 5px;
        }
    }
}
</style>
