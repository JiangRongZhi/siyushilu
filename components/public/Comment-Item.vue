<template>
  <div class="comment-item">
    <Avatar class="comment-item-avatar" file="学生1"></Avatar>
    <div class="comment-item-content">
      <div class="comment-item-name">{{ data.pusher }}</div>
      <div class="comment-item-text">{{ data.content }}</div>
      <div class="subcomment-list">
        <div
          v-for="(item, index) in data.subComments"
          :key="index"
          class="subcomment-item"
        >
          {{ item.pusher }}：{{ item.content }}
        </div>
      </div>
      <div class="comment-add">
        <el-link v-if="!isEdit" type="success" @click="handleAddComment">
          添加回复
        </el-link>
        <div v-else>
          <el-link type="primary" @click="handleAddComment">提交回复</el-link>
          <el-link
            class="comment-button-cancel"
            type="warning"
            @click="handleCancelComment"
            >取消
          </el-link>
        </div>
        <div v-if="isEdit">
          <el-input
            v-model="commentText"
            type="textarea"
            class="comment-text-input"
          ></el-input>
        </div>
      </div>
    </div>
    <div class="comment-item-floor">
      <span class="comment-item-number">{{ data.floor }}楼</span>
      <span class="comment-item-date">评论时间：{{ data.pushtime }}</span>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/public/Avatar.vue'
export default {
  components: {
    Avatar
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      isEdit: false,
      commentText: ''
    }
  },
  methods: {
    handleAddComment() {
      if (this.isEdit) {
        console.log(this.commentText)
        this.cancelEdit()
      } else {
        this.isEdit = true
      }
    },
    handleCancelComment() {
      this.cancelEdit()
    },
    cancelEdit() {
      this.isEdit = false
      this.commentText = ''
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item {
  padding-left: 60px;
  position: relative;
  // border-bottom: @layout-border-width solid @loyout-border-color;
}
.comment-item-avatar {
  position: absolute;
  top: 0;
  left: 0;
}
.comment-item-content {
  padding: 0 20px;
  line-height: 30px;
  font-size: 14px;
  background-color: @color-bgc-gray;
  border-radius: 8px;
  .comment-item-name {
    font-weight: bold;
  }
  .comment-item-text {
    color: @color-gray2;
  }
  .subcomment-list {
    padding-left: 30px;
    border-top: 1px dotted black;
    .subcomment-item {
    }
  }
  .comment-add {
    padding-left: 30px;
    .comment-text-input {
      padding-bottom: 10px;
    }
  }
}
.comment-item-floor {
  padding: 10px 15px;
  font-size: 13px;
  .comment-item-number {
    margin-right: 15px;
    font-weight: bold;
  }
  .comment-item-date {
    color: @color-gray2;
  }
}
</style>
