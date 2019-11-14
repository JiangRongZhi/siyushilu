<template>
  <div class="course-manager-wrap">
    <MineTop active="course"></MineTop>
    <div class="container-1200">
      <ManagerLeft
        :active="leftActive"
        class="manager-left"
        type="course"
        @change="handleLeftChange"
      ></ManagerLeft>
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
          <el-button
            v-if="leftActive === 'unpublished'"
            class="tr-row-button el-icon-s-promotion"
            size="mini"
            @click="handlePublish"
          >发布课程</el-button>
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
                      :to="{ path: '/mine/course/detail', query: { id: item.id,from:'mine-lesson-manager',active:leftActive } }"
                    >
                      <Icon file="mine/play" :size="40" />
                    </nuxt-link>
                    <div class="course-one-buttons">
                      <div class="course-one-button" @click="handleQRCodeClick(item.id)">
                        <Icon class="c-off" file="mine/qrcode" :size="22"></Icon>
                        <Icon class="c-on" file="mine/qrcode-on" :size="22"></Icon>
                      </div>
                      <div class="course-one-button" @click="handleEditClick(item.id)">
                        <Icon class="c-off" file="mine/edit" :size="22"></Icon>
                        <Icon class="c-on" file="mine/edit-on" :size="22"></Icon>
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
          <div class="normal-pagination manager-pagination" v-if="courseData.totalCount>15">
            <Pagination
              :page="option.page"
              :size="option.limit"
              :total="courseData.totalCount"
              @change="handlePaginationChange"
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="手机扫码浏览" :visible.sync="dialogQRCodeVisible" width="300px">
      <qr-code text="asdf"></qr-code>
    </el-dialog>

    <el-dialog title="课程发布" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form
        ref="courseFromRef"
        label-position="left"
        label-width="100px"
        :rules="rules"
        :model="courseFormData"
      >
        <el-form-item label="发布到：" prop="shared">
          <el-checkbox-group v-model="courseFormData.shared"></el-checkbox-group>
          <div class="c-form-item">
            <el-checkbox label="教学班级" v-model="selectClass" @change="setPublish($event)"></el-checkbox>
            <el-checkbox label="课程资源库" v-model="lessonChecked" @change="setPublish2($event)"></el-checkbox>

            <div class="select-class" v-show="selectClass">
              <el-form-item prop="classList">
                <el-cascader
                  v-model="courseFormData.classList"
                  :options="classList"
                  :props="{value:'id', label:'name',children:'classList',multiple:true}"
                  :show-all-levels="false"
                ></el-cascader>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlePublishCourse">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import MineTop from '@/components/mine/Mine-Top.vue'
import ManagerLeft from '@/components/mine/Manager-Left.vue'
import CourseItem from '@/components/course/Course-Item.vue'
import Pagination from '@/components/public/Pagination.vue'
import Icon from '@/components/public/Icon.vue'
import utils from '@/scripts/utils.js'
export default {
    layout: 'aijinke',
    name: 'CourseManager',
    components: {
        MineTop,
        ManagerLeft,
        CourseItem,
        Icon,
        Pagination
    },
    data() {
        return {
            orderTop: false,
            dialogQRCodeVisible: false,
            centerDialogVisible: false,
            dialogQRCodeText: '',
            checkAll: false,
            selectClass: false,
            lessonChecked: false,
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
                limit: 15 // 条数
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
    watch: {
        selectClass(val) {
            val
                ? (this.rules.classList = [
                      {
                          required: true,
                          message: '请至少选择一个班级',
                          trigger: 'change'
                      }
                  ])
                : (this.rules.classList = [])
        },
        centerDialogVisible(val) {
            if (!val) {
                this.courseFormData.classList = []
                this.courseFormData.schoolOpened = 0
                this.selectClass = false
                this.lessonChecked = false
            }
        }
    },
    mounted() {
        const query = this.$route.query
        if (query.active) this.leftActive = query.active
        this.showList()
        this.getClasslist().then(res => {
            let k = 0
            for (let i in res) {
                let tmp = res[i]

                let cl = {
                    id: k++ + '',
                    name: tmp.yearName,
                    classList: tmp.classList
                }
                this.classList.push(cl)
            }
        })
    },
    methods: {
        ...mapActions('course', [
            'courseUnpublishList',
            'coursePublishList',
            'publishCourse',
            'unpublishCourse',
            'deleteCourse',
            'getClasslist',
            'editCourse'
        ]),
        // 显示金课列表
        showList() {
            if (this.leftActive === 'unpublished') {
                this.showUnpublishList()
            }
            if (this.leftActive === 'published') {
                this.showPublishList()
            }
            this.isIndeterminate = true
            this.courseIds = []
        },
        //发布到
        setPublish2(e) {
            if (e) {
                this.courseFormData.schoolOpened = 1
                this.courseFormData.shared.push('a')
            } else {
                this.courseFormData.schoolOpened = 0
                this.courseFormData.shared.splice('a' || '')
            }
            //console.log(this.courseFormData.shared)
        },
        setPublish(e) {
            if (e) {
                this.selectClass = true
                this.courseFormData.shared.push('b')

                this.rules.classList = [
                    {
                        required: true,
                        message: '请至少选择一个班级',
                        trigger: 'change'
                    }
                ]
            } else {
                this.courseFormData.shared.splice('b' || '')
                this.selectClass = false
                this.rules.classList = []
            }
            //console.log(this.courseFormData.shared)
        },
        // 设置多选框数组
        setCourseIds() {
            const ids = this.courseData.list.map(v => {
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
        // 获取未发布列表
        showUnpublishList() {
            this.courseUnpublishList(this.option).then(res => {
                if (res && res.page) {
                    this.courseData = res.page
                    this.setCourseIds()
                }
            })
        },
        // 获取已发布列表
        showPublishList() {
            // console.table(this.option)
            this.coursePublishList(this.option).then(res => {
                if (res && res.page) {
                    this.courseData = res.page
                    this.setCourseIds()
                }
            })
        },
        handleLeftChange(e) {
            switch (e) {
                case 'upload':
                    let newpage = this.$router.resolve({
                        path: '/mine/course/edit',
                        query: {
                            from: 'mine-lesson-manager',
                            active: this.leftActive
                        }
                    })
                    window.open(newpage.href, '_blank')
                    break
                default:
                    this.leftActive = e
                    this.showList()
            }
        },
        // 全选按钮
        handleCheckAllChange(val) {
            this.checkedCourse = val ? this.courseIds : []
            this.isIndeterminate = false
        },
        // 多选框
        handleCheckedCourseChange(value) {
            const checkedCount = value.length
            this.checkAll = checkedCount === this.courseIds.length
            this.isIndeterminate =
                checkedCount > 0 && checkedCount < this.courseIds.length
        },
        // 二维码
        handleQRCodeClick(id) {
            this.dialogQRCodeVisible = true
            this.dialogQRCodeText = id
            console.log(id)
        },
        // 编辑
        handleEditClick(id) {
            // console.log(id)
            let newpage = this.$router.resolve({
                path: '/mine/course/edit',
                query: {
                    id: id,
                    active: this.leftActive,
                    from: 'mine-lesson-manager'
                }
            })
            window.open(newpage.href, '_blank')
        },
        // 删除
        handleDelete() {
            if (this.checkedCourse.length > 0) {
                this.deleteCourses(this.checkedCourse)
            } else {
                utils.errMessage('请选择你要删除的课程！')
                return false
            }
        },
        handleDeleteClick(id) {
            const ids = [id]
            //console.log(id)
            this.deleteCourses(ids)
        },
        deleteCourses(ids) {
            this.$confirm('你将删除该课程，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.deleteCourse(ids).then(res => {
                    if (res === 'delete success') {
                        utils.successMessage('成功删除！')
                        this.showList()
                    }
                })
            })
        },
        //确定发布
        handlePublishCourse() {
            const ids = []
            this.courseFormData.classList.forEach((val, index) => {
                ids.push(val[1])
            })
            this.courseFormData.classList = ids
            this.courseFormData.isPublish = 1
            this.$refs.courseFromRef.validate(valid => {
                if (valid) {
                    const data = this.courseFormData
                    //console.log('data:' + data)
                    this.editCourse(data).then(res => {
                        if (res === 'edit success') {
                            this.centerDialogVisible = false
                            utils.successMessage('发布成功！')
                            this.showList()

                            this.courseFormData.id = ''
                        }
                    })
                } else {
                    return false
                }
            })
        },
        // 发布课程
        handlePublish() {
            this.courseFormData.id = this.checkedCourse[0]
            //console.log(this.checkedCourse)
            if (this.checkedCourse.length == 1) {
                this.centerDialogVisible = true
            } else if (this.checkedCourse.length > 1) {
                utils.errMessage('每次只能选择一个发布的课程！')
                return false
            } else {
                utils.errMessage('请选择你要发布的课程！')
                return false
            }
        },
        // 下架课程
        handleUnpublish() {
            this.unpublishCourse(this.checkedCourse).then(res => {
                if (res === 'unpublish success') {
                    utils.successMessage('下架成功！')
                    this.showList()
                }
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
        }
    }
}
</script>

<style lang="less">
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
