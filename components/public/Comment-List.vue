<template>
  <div class="lesson-comments">
    <el-divider content-position="left">
      <el-pagination
        layout="prev, pager, next"
        :page-size="3"
        :pager-count="5"
        :total="45"
      >
      </el-pagination>
    </el-divider>
    <CommentItem
      v-for="item in commentList"
      :key="item.floor"
      :data="item"
    ></CommentItem>
  </div>
</template>

<script>
import CommentItem from './Comment-Item.vue'

export default {
  components: {
    CommentItem
  },
  data() {
    return {
      commentList: [
        {
          pusher: '张冬春',
          content: '课讲的真好，如果有更多案例分析就好了',
          pushtime: '2019/01/24',
          floor: 1,
          subComments: []
        },
        {
          pusher: '小鑫',
          content: '课讲的真好，如果有更多案例分析就好了!!!',
          pushtime: '2019/01/25',
          floor: 2,
          subComments: [
            {
              pusher: '老师',
              content: '感谢关注'
            }
          ]
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped>
.lesson-comments {
  margin-bottom: 10px;
  padding-top: 0;
}
.el-divider {
  background-color: #000;
}
.comment-add {
  text-align: right;
  padding-right: 10px;
}
.comment-button-cancel {
  margin-left: 10px;
}
</style>
