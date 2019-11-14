<template>
  <div>
    <div v-for="(item,index) in lessonData.list" :key="index" class="lesson-item">
      <div class="c-index">{{item.chapter}}.{{item.section}}</div>
      <div v-if="canDelete" class="text-right">
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          @click="deleteCourseLesson(item.id)"
          plain
        >从本课程删除该资源</el-button>
      </div>

      <LessonItem :data="item"></LessonItem>
    </div>
    <div v-if="lessonData.list.length" class="lesson-list-pagination">
      <Pagination
        :page="option.page"
        :size="option.limit"
        :total="lessonData.totalCount"
        @change="handlePaginationChange"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import LessonItem from '@/components/course/Lesson-Item2.vue'
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
        canDelete: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            lessonData: {
                totalCount: 0,
                pageSize: 0,
                totalPage: 0,
                list: []
            },
            option: {
                page: 1, // 页码
                limit: 6 // 条数
            }
        }
    },
    mounted() {
        this.showList()
    },
    methods: {
        ...mapActions('course', ['getRealCourseListAll', 'delCourseLesson']),
        showList() {
            this.getRealCourseListAll({
                id: this.courseId,
                option: this.option
            }).then(res => {
                if (res) {
                    this.lessonData = res
                }
            })
        },
        deleteCourseLesson(lessonId) {
            this.delCourseLesson({
                courseId: this.courseId,
                lessonId: lessonId
            }).then(res => {
                if (res === 'del success') {
                    this.showList()
                }
            })
        },
        handlePaginationChange(e) {
            this.option.page = e
            this.showList()
        }
    }
}
</script>

<style lang="less" scoped>
.lesson-item {
    position: relative;
    .c-index {
        position: absolute;
        top: 5px;
        left: 5px;
        z-index: 11;
        color: @color-white;
        background-color: rgba(0, 0, 0, 0.5);
        font-size: 14px;
        padding: 3px 8px;
         border-radius: 5px;
    }
}

.lesson-list-pagination {
    padding-bottom: 20px;
    text-align: center;
}
</style>
