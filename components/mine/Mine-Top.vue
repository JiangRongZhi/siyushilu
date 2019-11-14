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
            课堂资源
          </nuxt-link>
        </el-col>
        <el-col :span="3">
          <nuxt-link
            class="top-link"
            :class="active == 'course' ? 'top-link-active' : ''"
            :to="{ path: '/mine/course/manager', query: {from:'mine-lesson-manager'} }"
          >
            课程资源
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
  },

  data(){
    return{
      usertype:null,
    }
  },

 mounted() {
    // 验证登录
    //  console.log("usertype:"+this.userInfo.type)
    //  this.usertype = this.userInfo.type

  },
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
