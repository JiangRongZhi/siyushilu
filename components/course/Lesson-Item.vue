<template>
  <div class="lesson-item-wrap">
    <nuxt-link
      class="lesson-item-link"
      :to="{ path: '/lesson/detail', query: { id: data.id ,from:'course'} }"
      target="_blank"
      tag="a"
    >
      <el-row>
        <el-col :span="7">
          <el-image :src="data.coverImage">
            <el-image slot="error" src="http://iph.href.lu/200x180?text=金课封面" fit="cover"></el-image>
          </el-image>
        </el-col>
        <el-col :span="16" :offset="1">
          <h4>{{ data.name }}</h4>
          <h5>
            上传者：{{ data.teacherName }}
            <span>发布时间:{{ data.createTime | filterDate('yyyy-MM-dd hh:mm') }}</span>
            <span>浏览量:{{ data.broadcast || 0 }}次</span>
          </h5>
          <p>
            <span>知识点简介：</span>
            {{ data.keyPointDetail }}
          </p>
          <!-- <LessonData
            class="lesson-data"
            :collection="data.collection"
            :like="data.likes"
            :comment="data.comment"
          ></LessonData>-->
        </el-col>
      </el-row>
    </nuxt-link>
  </div>
</template>

<script>
import LessonData from '@/components/public/Lesson-Data'
export default {
    components: {
        LessonData
    },
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
.lesson-item-wrap {
    margin-bottom: 30px;
    padding-bottom: 25px;
    border-bottom: 1px solid @color-border-gray;
    .lesson-item-link {
        color: @color-black;
        font-size: 16px;
    }
    .el-image {
        width: 100%;
        height: 180px;
        border: 3px solid #c3c3c3;
    }
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
    .lesson-data {
        margin-top: 15px;
        font-size: 14px;
    }
}
</style>
