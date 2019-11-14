<template>
  <div class="mine-top-wrap">
    <div class="container-1200">
      <el-row>
        <el-col :span="3">
          <nuxt-link
            class="top-link"
            :class="active == 'lesson' ? 'top-link-active' : ''"
            :to="{ path: '/mine/lesson/manager', query: {} }"
          >
            统计报告
          </nuxt-link>
        </el-col>
        <el-col :span="3">
          <nuxt-link
            class="top-link"
            :class="active == 'course' ? 'top-link-active' : ''"
            :to="{ path: '/mine/course/manager', query: {} }"
          >
            数据分析
          </nuxt-link>
        </el-col>
        <el-col :span="3">
          <nuxt-link class="top-link" 
           :class="active == 'collection' ? 'top-link-active' : ''"
           :to="{ path: '/mine/collection/manager', query: {} }">
            班级金课
          </nuxt-link>
        </el-col>
          <el-col :span="3">
          <nuxt-link class="top-link" 
           :class="active == 'stat' ? 'top-link-active' : ''"
           :to="{ path: '/stat/teacherStatistics', query: {} }">
            我的收藏
          </nuxt-link>
        </el-col>
    
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.mine-top-wrap {
  height: 50px;
  line-height: 50px;
  font-size: 17px;
  font-weight: bold;
  background-color: @color-bgc-primary;
}
.top-link {
  color: @color-white;
  text-decoration: none;
}
.top-link-active {
  color: @color-black;
}
</style>
