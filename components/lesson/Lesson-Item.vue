<template>
  <nuxt-link
    class="lesson-item-link"
    :to="{ path: '/lesson/detail', query: { id: data.id,from:'lesson' } }"
    target="_blank"
  >
    <el-image class="lesson-card-image" :src="data.coverImage"></el-image>
    <div class="lesson-item-info">
      <div class="lesson-item-title" :title="data.name">
        <span>{{ data.name }}</span>
      </div>
      <p class="lesson-item-data">上传者：{{data.teacherName}}</p>
      <p class="lesson-item-date">创建时间：{{ data.createTime | filterDate('yyyy-MM-dd hh:mm') }}</p>
      <!-- <div class="lesson-item-data">
        所属专业：{{data.professionName}}
      </div>-->
      <p class="lesson-item-data">浏览量：{{data.broadcast}}</p>
    </div>
  </nuxt-link>
</template>

<script>
// import LessonData from '@/components/public/Lesson-Data.vue'
export default {
    // components: {
    //   LessonData
    // },
    props: {
        data: {
            type: Object,
            default: () => {
                return {}
            }
        }
    }
}
</script>

<style lang="less" scoped>
.lesson-item-link {
    display: block;
    text-decoration: none;
    border-radius: 5px;
    overflow: hidden;
    background-color: @color-bgc-gray;
    .lesson-card-image {
        width: 100%;
        height: 160px;
    }
    .lesson-item-info {
        padding: 5px;
        font-size: 14px;
        color: @color-text;
    }
    .lesson-item-title {
        height: 44px;
        line-height: 22px;
        color: @color-black;
        overflow: hidden;
    }
    &:hover .lesson-item-title {
        text-decoration: underline;
        color: @color-primary;
    }
    .lesson-item-date {
        padding-bottom: 10px;
        span {
            float: right;
            font-size: 12px;
        }
    }
    .lesson-item-data {
        padding-bottom: 10px;
        span {
            margin-right: 10px;
        }
    }
}
</style>
