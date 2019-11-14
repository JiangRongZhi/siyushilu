<template>
  <div class="lesson-wrap">
    <HotLessons></HotLessons>
    <div class="container-1200">
      <ListOptions @set-option="handleSetOption"></ListOptions>
      <div class="lesson-list">
        <a-row :split="5" :gutter="10">
          <a-col v-for="item in lessonData.list" :key="item.id">
            <lesson-item class="lesson-item" :data="item"></lesson-item>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="normal-pagination">
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
import HotLessons from '@/components/lesson/Hot-Lessons.vue'
import ListOptions from '@/components/public/List-Options.vue'
import LessonItem from '@/components/lesson/Lesson-Item.vue'
import Pagination from '@/components/public/Pagination.vue'
import { hasToken } from '@/scripts/mixin'
export default {
  layout: 'aijinke',
  components: {
    HotLessons,
    ListOptions,
    LessonItem,
    Pagination
  },
  mixins: [hasToken],
  head() {
    return {
      title: '丝路师语课堂库',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description'
        }
      ]
    }
  },
  data() {
    return {
      option: {
        page: 1, // 页码
        limit: 15 // 条数
      },
      lessonData: {
        totalCount: 0,
        pageSize: 0,
        totalPage: 0,
        list: []
      }
    }
  },
  mounted() {
    // 验证登录
    // console.log(this.$store.state.user)
    // 显示数据
    this.showList()
  },
  methods: {
    ...mapActions('lesson', ['getList']),
    // 获取列表
    showList() {
      // console.table(this.option)
      this.getList(this.option).then(res => {
        // console.log(res)
        res && (this.lessonData = res)
      })
    },
    handlePaginationChange(e) {
      this.option.page = e
      this.showList()
    },
    handleSetOption(options) {

      // console.log(options)
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
      //console.log(opt)
      this.showList()
    }
  }
}
</script>

<style lang="less">
.lesson-list {
  margin-top: 20px;
  .lesson-item {
    margin-bottom: 10px;
  }
}
</style>
