<template>
  <div class="mobile-navigator-wrap">
    <span class="back-button">
      <nuxt-link
        v-if="backPath"
        :to="{ path: '/mobile/course', query: { id: backPath } }"
        class="back-link"
      >
        <i class="el-icon-arrow-left"></i>
      </nuxt-link>
    </span><slot />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    backPath: {
      type: String,
      default: '',
    },
  },
  methods: {
    ...mapActions('user', ['getUserInfo']),
    getUserData() {
      this.getUserInfo().then(res => {
        if (res === 'noLogin') {
          const fullPath = this.$route.fullPath
          this.$router.push({
            path: '/mobile/login',
            query: { fp: fullPath }
          })
        }
      })
    },
  },
  mounted() {
    this.getUserData()
  },
}
</script>

<style lang="less" scoped>
.mobile-navigator-wrap {
  height: 160px;
  line-height: 160px;
  font-size: 40px;
  background-color: @color-bgc-gray;
  .back-button {
    display: inline-block;
    width: 110px;
    font-size: 70px;
    text-align: center;
    vertical-align: top;
  }
  .back-link {
    color: @color-text;
  }
}
</style>
