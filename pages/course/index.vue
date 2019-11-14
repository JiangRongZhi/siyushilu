<template>
  <div class="courses-wrap">
    <HotCourses></HotCourses>
    <ListOptions class="courses-list-options" @set-option="handleSetOption">
    </ListOptions>
    <div class="course-list">
      <a-row :split="5" :gutter="15">
        <a-col v-for="item in courseData.list" :key="item.id">
          <nuxt-link
            class="course-one-link"
            target="_blank"
            :to="{ path: '/course/detail', query: { id: item.id,from:'course'} }"
          >
            <CourseItem class="course-item" :data="item"></CourseItem>
          </nuxt-link>
        </a-col>
      </a-row>
    </div>
    <div class="course-pagination">
      <Pagination
        :page="option.page"
        :size="option.limit"
        :total="courseData.totalCount"
        @change="handlePaginationChange"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import HotCourses from '@/components/course/Hot-Courses.vue'
import ListOptions from '@/components/public/List-Options.vue'
import ARow from '@/components/a-source/a-row.vue'
import ACol from '@/components/a-source/a-col.vue'
import CourseItem from '@/components/course/Course-Item.vue'
import Pagination from '@/components/public/Pagination.vue'
import { hasToken } from '@/scripts/mixin'
export default {
  layout: 'aijinke',
  components: {
    HotCourses,
    ListOptions,
    ARow,
    ACol,
    CourseItem,
    Pagination
  },
  mixins: [hasToken],
  data() {
    return {
      option: {
        page: 1, // 页码
        limit: 15 // 条数
      },
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
    ...mapActions('course', ['getList']),
    // 获取列表
    showList() {
      // console.table(this.option)
      this.getList(this.option).then(res => {
        //console.log(res.list)
        res && (this.courseData = res)
      })
    },
    handleSetOption(options) {
       console.log(options)
      const opt = this.option
      if (options.year) {
        this.option.page = 1
        opt.yearId = options.year
      }
      if (options.year === '') {
        this.option.page = 1
        delete opt.yearId
      }
      if (options.sort) {
        this.option.page = 1
        opt.sort = options.sort
      }
      this.showList()
    },
    handlePaginationChange(e) {
      console.log(e)
      this.option.page = e
      this.showList()
    }
  }
}
</script>

<style lang="less">
.courses-wrap {
  .container-1200;
  .courses-list-options {
    margin-top: 20px;
  }
  .course-list {
    margin-top: 20px;
  }
  .course-one-link {
    display: inline-block;
    margin-bottom: 15px;
    width: 100%;
    border-radius: 5px;
    color: @color-text;
    text-decoration: none;
    overflow: hidden;
  }
}
.course-pagination {
  padding-top: 30px;
  padding-bottom: 40px;
  text-align: center;
}
</style>
