<template>
  <div class="course-manager-wrap">
    <CollTop active="course"></CollTop>
    <div class="manager-top">
      <div class="search-word" v-if="search">
        搜索
        <span>“{{name}}”</span>,共
        <span>{{count}}</span>条结果
      </div>
      <div class="manager-search">
        <el-button class="tr-row-button el-icon-delete-solid" @click="handleRecycle">回收站</el-button>
        <el-input v-model="name" placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
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
          <el-button class="tr-row-button el-icon-delete" size="mini" @click="handleDelete">删除</el-button>
          <el-button type="text" class="pull-right" @click="handleOrder">
            发布时间
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
                      :to="{ path: '/mine/collection/cdetail', query: { id: item.id,from:'mine-collection-lesson'} }"
                    >
                      <Icon file="mine/play" :size="40" />
                    </nuxt-link>
                    <div class="course-one-buttons">
                      <div class="course-one-button" @click="handleQRCodeClick(item.id)">
                        <Icon class="c-off" file="mine/qrcode" :size="22"></Icon>
                        <Icon class="c-on" file="mine/qrcode-on" :size="22"></Icon>
                      </div>
                      <div class="course-one-button" @click="handleDeleteClick(item.id)">
                        <Icon class="c-off" file="mine/delete" :size="22"></Icon>
                        <Icon class="c-on" file="mine/delete-on" :size="22"></Icon>
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
// import Pagination from '@/components/public/Pagination.vue'
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
            search: false,
            name: '',
            count: 0,
            orderTop: false,
            dialogQRCodeVisible: false,
            centerDialogVisible: false,
            dialogQRCodeText: '',
            checkAll: false,
            selectClass: false,
            lessonChecked: false,
            checkedObject: {},
            checkedCourse: [],
            courseIds: [],
            classList: [],
            courseFormData: {
                id: '',
                shared: [],
                schoolOpened: 0,
                classList: [],
                isPublish: 0
            },
            rules: {
                shared: [
                    {
                        required: true,
                        message: '请至少选择一个你要发布到的地方',
                        trigger: 'change'
                    }
                ],
                classList: []
            },
            isIndeterminate: true,
            option: {
                page: 1, // 页码
                limit: 20 // 条数
            },
            courseData: {
                totalCount: 0,
                pageSize: 0,
                totalPage: 0,
                list: []
            },
            leftActive: 'published'
        }
    },
    mounted() {
        this.showList()
    },
    methods: {
        ...mapActions('mine', ['getCourseCollectionList', 'deleteCourse']),
        // 显示金课列表
        showList() {
            this.getCourseCollectionList().then(res => {
                this.courseData.list = res
                this.setCourseIds(res)
            })
        },
        handleChecked(val) {
            this.courseFormData.id = val
        },
        //回收站
        handleRecycle() {
            this.$router.push({
                path: '/mine/collection/recyclecourse'
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
            //console.log(this.checkedCourse)
            // console.log('d1:', value, id, this.checkedObject)
        },
        // 二维码
        handleQRCodeClick(id) {
            this.dialogQRCodeVisible = true
            this.dialogQRCodeText = id
            //console.log(id)
        },

        // 删除
        handleDeleteClick(id) {
            const ids = [id]
            this.deleteCourses(ids)
        },
        handleDelete() {
            if (this.checkedCourse.length > 0) {
                this.deleteCourses(this.checkedCourse)
            } else {
                utils.errMessage('请选择你要删除的课程资源！')
            }
        },
        //确认删除
        deleteCourses(ids) {
            //console.log(ids)
            this.$confirm(
                '此操作会将你选择的课程移至回收站，是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }
            ).then(() => {
                this.deleteCourse(ids).then(res => {
                    if (res === 'delete success') {
                        utils.successMessage('成功将课程移至回收站！')
                        this.showList()
                    }
                })
            })
        },

        // 分页按钮
        handlePaginationChange(e) {
            this.option.page = e
            this.showList()
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
            //this.setCourses()
        },
        //搜索
        handleSearch() {
            this.name ? (this.search = true) : (this.search = false)
            this.getCourseCollectionList(this.name).then(res => {
                this.courseData.list = res
                this.count = res.length
                this.setCourseIds(res)
            })
        }
    }
}
</script>

<style lang="less">
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
