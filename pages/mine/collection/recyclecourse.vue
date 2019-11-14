<template>
  <div class="course-manager-wrap">
    <CollTop active="course"></CollTop>
    <div class="lesson-edit-title">
      <el-breadcrumb separator="|">
        <el-breadcrumb-item>
          <a href="javascript:;" @click="handleBack" class="goback">返回上一级</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>回收站</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="manager-content">
      <div class="manager-right">
        <div class="manager-head">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            class="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <el-button class="tr-row-button el-icon-refresh-right" size="mini" @click="handleReset">恢复</el-button>
          <el-button type="text" class="pull-right" @click="handleOrder">
            创建时间
            <i class="el-icon--right" :class="orderTop?'el-icon-bottom':'el-icon-top'"></i>
          </el-button>
        </div>
        <div class="manager-body">
          <el-checkbox-group v-model="checkedCourse" @change="handleGroupChange">
            <a-row :split="5" :gutter="10">
              <a-col v-for="item in courseData.list" :key="item.id">
                <div class="course-one">
                  <el-checkbox :label="item.id" class="course-mask">
                    <nuxt-link
                      class="course-one-link"
                      target="_blank"
                      :checked="checkedObject[item.id] > 0"
                      @change="(b) => { handleLessonChange(item.id, b) }"
                      :to="{ path: '/mine/collection/cdetail', query: { id: item.id,from:'mine-collection-lesson'} }"
                    >
                      <Icon file="mine/play" :size="40" />
                    </nuxt-link>
                    <div class="course-one-buttons">
                      <div class="course-one-button" @click="handleQRCodeClick(item.id)">
                        <Icon class="c-off" file="mine/qrcode" :size="22"></Icon>
                        <Icon class="c-on" file="mine/qrcode-on" :size="22"></Icon>
                      </div>
                      <div class="course-one-button" @click="handleRecover(item.id)">
                        <Icon class="c-off" file="mine/h" :size="22"></Icon>
                        <Icon class="c-on" file="mine/h-on" :size="22"></Icon>
                      </div>
                    </div>
                  </el-checkbox>
                  <CourseItem class="course-item" :data="item"></CourseItem>
                </div>
              </a-col>
            </a-row>
          </el-checkbox-group>
          <!-- <div class="normal-pagination manager-pagination">
            <Pagination
              :page="option.page"
              :size="option.limit"
              :total="courseData.totalCount"
              @change="handlePaginationChange"
            ></Pagination>
          </div>-->
        </div>
      </div>
    </div>
    <el-dialog title="手机扫码浏览" :visible.sync="dialogQRCodeVisible" width="300px">
      <qr-code text="asdf"></qr-code>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CollTop from '@/components/mine/Coll-Top.vue'
import CourseItem from '@/components/course/Course-Item.vue'
import Icon from '@/components/public/Icon.vue'
import utils from '@/scripts/utils.js'
export default {
    layout: 'aijinke',
    name: 'CourseManager',
    components: {
        CollTop,
        CourseItem,
        Icon
    },
    data() {
        return {
            orderTop: false,
            dialogQRCodeVisible: false,
            dialogQRCodeText: '',
            checkAll: false,
            isIndeterminate: true,
            checkedCourse: [],
            checkedObject: {},
            courseIds: [],
            courseData: {
                totalCount: 0,
                pageSize: 0,
                totalPage: 0,
                list: []
            }
        }
    },
    mounted() {
        this.showList()
    },
    methods: {
        ...mapActions('mine', [
            'getRecycleCourseLsit',
            'deleteCourse',
            'recoverCourse'
        ]),
        // 显示金课列表
        showList() {
            this.getRecycleCourseLsit().then(res => {
                //console.log(res)
                this.courseData.list = res
                this.setCourseIds(res)
            })
        },
        //恢复课程资源
        handleRecover(e) {
            const ids = [e]
            this.recover(ids)
        },
        handleReset() {
            if (this.checkedCourse.length > 0) {
                this.recover(this.checkedCourse)
            } else {
                utils.errMessage('请选择你要恢复的课程资源！')
            }
        },

        recover(e) {
            this.$confirm(
                '此操作将你选中的资源恢复至我的课程, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            )
                .then(() => {
                    this.recoverCourse(e).then(res => {
                        if (res === 'success') {
                            this.showList()
                            this.$message({
                                type: 'success',
                                message: '资源已被恢复至我的课程！'
                            })
                        }
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        },
        // 设置多选框数组
        setCourseIds(data) {
            const ids = data.map(v => {
                return v.id
            })
            this.courseIds = ids
            this.checkedLesson = []
        },
        // 全选按钮
        handleCheckAllChange(val) {
            this.checkedCourse = val ? this.courseIds : []
            //console.log(this.checkedCourse)
            this.courseIds.map(c => {
                this.handleLessonChange(c, val)
            })
            this.isIndeterminate = false
        },
        // 多选框组
        handleGroupChange(value) {
            const checkedCount = value.length
            this.checkAll = checkedCount === this.courseIds.length
            this.isIndeterminate =
                checkedCount > 0 && checkedCount < this.courseIds.length
        },
        // 点击一个项
        handleLessonChange(id, value) {
            const item = this.checkedObject[id]
            if (item > 1 || item < 0) {
                // 原始值改动
                this.checkedObject[id] = value ? 2 : -1
            } else {
                // 新值改动
                this.checkedObject[id] = value ? 1 : 0
            }
        },

        // 二维码
        handleQRCodeClick(id) {
            this.dialogQRCodeVisible = true
            this.dialogQRCodeText = id
            //console.log(id)
        },

        //排序
        handleOrder() {
            this.orderTop = !this.orderTop
            this.courseData.list.sort((a, b) => {
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
        // 返回上一级
        handleBack() {
            this.$router.push({
                path: '/mine/collection/course'
            })
        }
    }
}
</script>

<style lang="less">
.lesson-edit-title {
    .container-1200;
    padding: 12px 0;
    a.goback {
        font-weight: bold;
        color: #000;
    }
    a:hover {
        color: #309d7c;
    }
}
.manager-top {
    height: 60px;
    .container-1200;
    .search-word {
        float: left;
        padding: 10px 0;
        height: 40px;
        line-height: 40px;
        span {
            color: #3dbb96;
        }
    }
    .manager-function {
        float: left;
        padding: 10px 0;
    }
    .manager-search {
        float: right;
        padding: 10px 0;
        display: flex;
        justify-content: space-around;
        .el-icon-delete-solid {
            margin-right: 10px;
        }
    }
}
.manager-content {
    .container-1200;
    margin-bottom: 30px;
    border: 1px solid @color-border-gray1;
    position: relative;
    .manager-left {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
    }
    .manager-right {
        border-left: 1px solid @color-border-gray1;
    }
    .manager-head {
        padding: 8px 15px;
        background-color: @color-bgc-gray0;
        border-bottom: 1px solid @color-border-gray1;
        .el-button--text {
            padding: 0;
            color: @color-text;
        }
    }
    .manager-body {
        padding: 10px;
        .course-one {
            position: relative;
            border-radius: 5px;
            overflow: hidden;
            &:hover .course-mask {
                display: block;
            }
            .is-checked {
                display: inline-block;
            }
            .el-checkbox__label {
                display: block;
                padding: 0;
                text-align: center;
            }
            .course-one-link {
                display: block;
                margin: 25px 0 0 0;
                color: @color-text;
                text-decoration: none;
            }
            .course-one-buttons {
                margin-top: 70px;
                display: flex;
                justify-content: space-around;
            }
            .course-one-button {
                display: inline-block;
                margin: 0 10px;
                cursor: pointer;
                .c-on {
                    display: none;
                }
                .c-off {
                    display: inline-block;
                }
                &:hover {
                    .c-on {
                        display: inline-block;
                    }
                    .c-off {
                        display: none;
                    }
                }
            }
        }
        .course-mask {
            position: absolute;
            z-index: 10;
            display: none;
            margin: 0;
            padding: 5px;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(5, 5, 5, 0.5);
            cursor: default;
        }
        .course-item {
            font-size: 16px;
        }
    }
    .manager-pagination {
        text-align: right;
    }
}
</style>
