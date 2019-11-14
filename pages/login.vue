<template>
  <div class="login-wrap">
    <Login class="login-content" :back-path="backPath"></Login>
  </div>
</template>

<script>
import Login from '@/components/public/Login.vue'
export default {
  layout: 'aijinke',
  components: {
    Login
  },
  computed: {
    backPath() {
      const query = this.$route.query
      if (query.fp) {
        return query.fp
      } else {
        return '/'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrap {
  .container-1200;
  .login-content {
    margin: 80px 275px 100px;
    width: 500px;
  }
}
</style>
