<template>
  <div class="forget-wrap">
    <div class="forget-top">
      <div class="container-1200">
        <el-image class="site-logo" src="/image/logo.png" alt="site logo" />
        <div class="title">找回密码</div>
      </div>
    </div>
    <div class="forget-content container-1200">
        <Forget v-show="checkedEmail"></Forget>
    </div>
  </div>
</template>
<script>
import Forget from '@/components/public/Forget.vue'
export default {
    components: {
        Forget
    },
    data() {
        return {
            checkedEmail:true
        }
    }
}
</script>
<style lang="less" scoped>
.forget-wrap {
    .forget-content
    {
        height: 95px;
        line-height: 95px;
        width: 100%;
        text-align: center;
        font-size: 24px;
        color: #383838;
    }
    .forget-top {
        height: 88px;
        // background-color: @color-bgc-white;
        border-bottom: 4px solid @color-border-gray;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .title {
            height: 35px;
            line-height: 35px;
            border-left: 3px solid #383838;
            font-size: 24px;
            float: left;
            color: #383838;
            padding-left: 20px;
            margin-top: 10px;
        }
        .site-logo {
            display: inline;
            float: left;
            margin-left: 10px;
            height: 50px;
            width: 190px;
            vertical-align: top;
            margin-right: 20px;
        }
    }
}
</style>