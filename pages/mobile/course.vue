<template>
  <div class="mobile-course-wrap">
    <MobileNavigator>{{ courseDetail.name }}</MobileNavigator>
    <div class="course-cover">
      <el-image class="course-pointer" :src="courseDetail.coverImage" fit="cover">
        <el-image
          slot="error"
          class="course-pointer"
          src="http://iph.href.lu/300x240?text=课程封面"
          fit="cover"
        ></el-image>
      </el-image>
      <div class="course-lessons">共{{ courseDetail.lessonNum || 0 }}个</div>
    </div>
    <div class="course-props">
      <el-row>
        <el-col :span="24" class="course-pro">
          <span>所属专业：{{ courseDetail.professionName }}</span>
        </el-col>
        <el-col :span="10">
          <span>创建时间：{{ courseDetail.createTime | filterDate }}</span>
        </el-col>
        <el-col :span="7">
          <span>浏览量：{{ courseDetail.broadcast || 0 }}次</span>
        </el-col>
      </el-row>
    </div>
    <div class="lesson-list">
      <div class="infinite-list-wrapper" style="overflow:auto">
        <div
          class="list"
          v-infinite-scroll="loadMore"
          :infinite-scroll-disabled="loading || noMore"
        >
          <div v-for="i in lessonData.list" class="list-item" :key="i.courseId">
            <MobileLessonItem :data="i" :back-path="courseId"></MobileLessonItem>
          </div>
        </div>
        <p class="list-tip" v-if="loading">加载中...</p>
        <p class="list-tip" v-if="noMore">没有更多了</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import MobileNavigator from '@/components/mobile/Mobile-Navigator.vue'
import MobileLessonItem from '@/components/mobile/Mobile-Lesson-Item.vue'
export default {
    layout: 'mobile',
    components: {
        MobileNavigator,
        MobileLessonItem
    },
    data() {
        return {
            courseId: '',
            courseDetail: {},
            lessonData: {
                totalCount: 0,
                pageSize: 0,
                totalPage: 0,
                list: []
            },
            option: {
                page: 1, // 页码
                limit: 3 // 条数
            },
            loading: false,
            noMore: false
        }
    },
    mounted() {
        const query = this.$route.query
        if (query.id) {
            this.courseId = query.id
            console.log(this.courseId)
            this.showDetail()
            this.showLessons()
        }
    },
    methods: {
        ...mapActions('course', ['getDetail', 'getRealCourseListAll']),
        showDetail() {
            this.getDetail(this.courseId).then(res => {
                if (res) {
                    this.courseDetail = res.tCourse
                }
            })
        },
        showLessons() {
            return this.getRealCourseListAll({
                id: this.courseId,
                option: this.option
            }).then(res => {
              console.log(res)
                const list = res.list
                if (res && list.length > 0) {
                    this.lessonData.list.push(...list)
                } else {
                    this.noMore = true
                }
            })
        },
        loadMore() {
            this.loading = true
            this.option.page += 1
            this.showLessons().then(res => {
                this.loading = false
            })
        }
    }
}
</script>

<style lang="less">
.mobile-course-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.course-cover {
    position: relative;
    .course-lessons {
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 140px;
        height: 58px;
        line-height: 58px;
        font-size: 28px;
        text-align: center;
        color: #ffffff;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .course-pointer {
        width: 100%;
        height: 556px;
    }
}
.course-props {
    padding: 5px 38px;
    font-size: 30px;
    color: #4a4a4a;
    line-height: 50px;
    background-color: #ffffff;
    .course-pro {
        font-size: 34px;
        line-height: 60px;
    }
}
.lesson-list {
    flex: 1;
    background-color: @color-bgc-gray;
    overflow: hidden;
    .infinite-list-wrapper {
        height: 100%;
        height: 100%;
    }
    .list-tip {
        text-align: center;
    }
}
</style>
