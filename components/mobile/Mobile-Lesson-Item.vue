<template>
  <div class="lesson-item-wrap">
    <nuxt-link
      class="lesson-item-link"
      :to="{ path: '/mobile/player', query: { id: data.id , bp: backPath  } }"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-image :src="data.coverImage" fit="cover">
            <el-image
              slot="error"
              src="http://iph.href.lu/200x180?text=金课封面"
              fit="cover"
            >
            </el-image>
          </el-image>
        </el-col>
        <el-col :span="12">
          <h4>{{ data.name }}</h4>
          <h5>
            {{ data.teacherName }}
            <span>
              {{ data.createTime | filterDate('yyyy-MM-dd hh:mm') }}
            </span>
          </h5>
          <p>
            <span>内容简介：</span>
            {{ data.keyPointDetail }}
          </p>
          <!-- <LessonData
            class="lesson-data"
            :size="26"
            :collection="data.collection"
            :like="data.likes"
            :comment="data.comment"
          ></LessonData> -->
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
    },
    backPath: {
      type: String,
      default: '',
    },
  }
}
</script>

<style lang="less" scoped>
.lesson-item-wrap {
  margin: 0 16px;
  padding: 20px 22px;
  height: 380px;
  border-bottom: 1px solid @color-border-gray;
  position: relative;
  .lesson-item-link {
    color: @color-black;
    font-size: 26px;
  }
  .el-image {
    width: 100%;
    height: 340px;
  }
  h4 {
    height: 70px;
    line-height: 70px;
    font-size: 36px;
  }
  h5 {
    font-size: 28px;
    color: #747474;
    span {
      margin-left: 10px;
    }
  }
  p {
    margin-top: 10px;
    padding: 6px;
    padding-left: 120px;
    height: 78px;
    line-height: 23px;
    font-size: 24px;
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
    position: absolute;
    right: 0;
    bottom: 10px;
    color: #747474;
  }
}
</style>
