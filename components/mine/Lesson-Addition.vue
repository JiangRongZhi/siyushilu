<template>
  <div class="lesson-addition-wrap">
    <div class="wrapper">
      <div class="leftNav">
        <div
          v-for="(item, index) in lessonData"
          :key="index"
          :class="yearActive==item.year?'is-active':''"
        >
          <h4 @click="handleYear(item.year)">{{item.year}}年</h4>
          <ul>
            <li
              v-for="c in item.list"
              :key="c.month"
              :class="monthActive == c.month ? 'is-active' : ''"
              @click="setList(item.year,c.month)"
            >{{c.month}}月</li>
          </ul>
        </div>
      </div>
      <div class="content">
        <div class="lesson-list">
          <el-checkbox-group v-model="checkedLesson" @change="handleGroupChange">
            <div v-for="item in listData" :key="item.id" class="lesson-one">
              <el-checkbox
                :label="item.id"
                :checked="checkedObject[item.id] > 0"
                @change="(b) => { handleLessonChange(item.id, b) }"
                class="course-mask"
              >点击选择该项</el-checkbox>
              <div class="item">
                <dl>
                  <dt>
                    <!-- <img :src="item.coverImage" alt /> -->
                    <el-image style="width: 200px; height: 150px" :src="item.coverImage">
                      <el-image slot="error" src="http://iph.href.lu/200x180?text=金课封面" fit="cover"></el-image>
                    </el-image>
                  </dt>
                  <dd>
                    <h4>{{ item.name }}</h4>
                    <h5>
                      上传者：{{ item.teacherName }}
                      <span>浏览量:{{ item.broadcast || 0 }}次</span>
                    </h5>
                    <p>
                      <span>知识点简介：</span>
                      {{ item.keyPointDetail }}
                    </p>
                  </dd>
                </dl>
              </div>
            </div>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="lesson-buttons">
      <span>已选择{{checkedLesson.length}}个</span>
      <el-checkbox v-model="checkAll" class="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <el-button class="lesson-ok" @click="handleFinish">完成</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import LessonItem from '@/components/course/Lesson-Item.vue'
import Pagination from '@/components/public/Pagination.vue'
export default {
    components: {
        LessonItem,
        Pagination
    },
    props: {
        courseId: {
            type: String,
            default: ''
        },
        currentIds: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    data() {
        return {
            option: {
                page: 1, // 页码
                limit: 3 // 条数
            },
            countLensson: 0,
            listData: {},
            monthActive: 0,
            yearActive: 0,
            checkedLesson: [],
            lessonIDs: [],
            checkedObject: {},
            checkAll: false,
            isIndeterminate: true,
            lessonData: {
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
        ...mapActions('course', ['getPublisLessonList']),
        handleClick(tab, event) {
            console.log(tab, event)
        },
        // 获取列表
        showList() {
            //console.table(this.courseId)
            this.getPublisLessonList({
                id: this.courseId ? this.courseId : '-1',
                option: this.option
            }).then(res => {
                if (res) {
                    this.lessonData = res
                    this.yearActive = this.lessonData[0].year
                    this.monthActive = this.lessonData[0].list[0].month
                    this.listData = this.lessonData[0].list[0].list
                    this.setLessonIDs()
                }
            })
        },
        setList(year, month) {
            this.monthActive = month
            this.lessonData.forEach((item, index) => {
                if (item.year == year) {
                    item.list.forEach((val, i) => {
                        if (val.month == month) {
                            this.listData = val.list
                            this.setLessonIDs()
                            this.checkAll = false
                        }
                    })
                }
            })
        },
        handleYear(year) {
            this.yearActive = year
            this.lessonData.forEach((item, index) => {
                if (item.year == year) {
                    this.monthActive = item.list[0].month
                    this.listData = item.list[0].list
                    this.setLessonIDs()
                    this.checkAll = false
                }
            })
        },
        // 设置多选框数组
        setLessonIDs() {
            const ids = this.listData.map(v => {
                return v.id
            })
            this.lessonIDs = ids
            this.checkedLesson = []
        },
        // 全选按钮
        handleCheckAllChange(val) {
            this.checkedLesson = val ? this.lessonIDs : []
            //console.log(this.checkedLesson)
            this.lessonIDs.map(c => {
                this.handleLessonChange(c, val)
            })
            this.isIndeterminate = false
        },
        // 多选框组
        handleGroupChange(value) {
            const checkedCount = value.length
            this.checkAll = checkedCount === this.lessonIDs.length
            this.isIndeterminate =
                checkedCount > 0 && checkedCount < this.lessonIDs.length
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
            //console.log(this.checkedLesson)
            // console.log('d1:', value, id, this.checkedObject)
        },
        // 完成按钮
        handleFinish() {
            const ids = [] // 增量
            const delids = [] // 减量
            for (let id in this.checkedObject) {
                // console.log(id, this.checkedObject[id])
                if (this.checkedObject[id] === 1) {
                    ids.push(id)
                }
                if (this.checkedObject[id] === -1) {
                    delids.push(id)
                }

                //console.log(ids,delids)
            }
            // console.log(this.checkedObject, ids, delids)
            this.$emit('finish', ids, delids)
            this.$emit('cancel')
        }
    }
}
</script>

<style lang="less" scoped>
.lesson-addition-wrap {
    width: 100%;
    height: 450px;

    overflow: hidden;
    .wrapper {
        width: 100%;
        height: 400px;
        display: flex;
        justify-content: flex-start;
        border: 2px solid @color-border-gray1;
        margin-bottom: 10px;
        .leftNav {
            width: 20%;
            height: 100%;
            padding: 0;
            margin: 0;
            border-right: 1px solid @color-border-gray1;
            margin-right: 3%;
            div {
                h4 {
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    color: @color-primary;
                    width: 100%;
                    border-bottom: 1px solid @color-border-gray1;
                    cursor: pointer;
                    background-color: @color-bgc-gray;
                }
                h4.is-active,
                h4:hover {
                    color: #309d7c;
                    background-color: #ddf3f0;
                }
                ul {
                    .ul-normal;
                    display: none;
                }
                li {
                    margin-left: 25px;
                    margin-right: 25px;
                    padding-left: 5px;
                    padding-right: 5px;
                    height: 42px;
                    line-height: 42px;
                    font-size: 15px;
                    border-bottom: 1px solid @color-border-gray1;
                    overflow: hidden;
                    cursor: pointer;
                    text-align: center;
                }
                li:hover,
                li.is-active {
                    color: @color-primary;
                    font-weight: bold;
                    background: #f9fafc;
                }
            }
            .is-active {
                h4 {
                    background-color: #ddf3f0;
                }
                ul {
                    display: block;
                }
            }
        }
        .content {
            width: 75%;
            height: 100%;
            overflow: auto;
            .item {
                width: 100%;
                border-bottom: 1px solid @color-border-gray1;
                padding-bottom: 20px;
                margin-bottom: 10px;
                margin-top: 10px;
                overflow: hidden;
                dl {
                    width: 100%;
                    height: 150px;
                    overflow: hidden;
                    display: flex;
                    justify-content: flex-start;
                    color: #000;
                    font-size: 16px;
                    dt {
                        width: 200px;
                        img {
                            width: 100%;
                        }
                    }
                    dd {
                        width: 300px;
                        height: 100%;
                        margin-left: 20px;
                        h4 {
                            height: 40px;
                            line-height: 40px;
                        }
                        h5 {
                            span {
                                margin-left: 10px;
                            }
                        }
                        p {
                            margin-top: 10px;
                            padding: 6px;
                            padding-left: 78px;
                            height: 115px;
                            line-height: 23px;
                            font-size: 14px;
                            overflow: hidden;
                            background-color: @color-bgc-gray;
                            position: relative;
                            span {
                                position: absolute;
                                top: 6px;
                                left: 6px;
                            }
                        }
                    }
                }
            }
        }
    }
}
.lesson-buttons {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.addition-pagination {
    padding-top: 0px;
    padding-bottom: 10px;
}
</style>
