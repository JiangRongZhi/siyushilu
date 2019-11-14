<template>
  <div class="mobile-wrap">
    <nuxt />
  </div>
</template>

<script>
export default {
  middleware: 'mobile-auth',
  head: {
    meta: [
      {
        id: 'viewport',
        ref: 'viewport',
        name: 'viewport',
        content: 'width=1080'
      }
    ]
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        const vp = document.getElementById('viewport')
        if (vp) {
          console.log(vp.content)
          vp.content = 'width=1080,initial-scale=' + window.screen.width / 1080
        }
      }, 500)
    })
  }
}
</script>

<style lang="less">
html,
body,
#__nuxt,
#__layout,
.mobile-wrap {
  height: 100%;
}
</style>
