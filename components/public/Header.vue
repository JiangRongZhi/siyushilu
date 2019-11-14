<template>
  <div class="header-wrap">
    <div class="container-1200">
      <div class="college-content">
        <el-image class="college-logo" src="/image/logo1.png" alt="logo" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            src: ''
        }
    },
    mounted() {
        this.getHeaderLogo().then(res=>{
          //console.log(res.log)
        })
    },
    methods: {
        ...mapActions('lesson', ['getHeaderLogo'])
    }
}
</script>

<style scoped lang="less">
.header-wrap {
    height: 120px;
    background-color: @color-bgc-gray;
}
.college-content {
    float: left;
    margin-top: 24px;
    margin-left: 10px;
    height: 75px;
    line-height: 75px;
    .college-logo {
        // width: 75px;
        // height: 75px;
        vertical-align: top;
    }
    .college-name {
        padding-left: 15px;
        font-size: 30px;
    }
}
.college-select {
    float: right;
    margin-top: 40px;
    width: 280px;
    .college-select-button {
        display: block;
    }
}
</style>
