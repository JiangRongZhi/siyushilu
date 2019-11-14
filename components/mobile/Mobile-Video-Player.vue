<template>
  <video
    ref="videoRef"
    :src="url"
    controls="controls"
    preload="auto"
    x5-playsinline="true"
    playsinline="true"
    webkit-playsinline="true"
    x-webkit-airplay="true"
  ></video>
</template>

<script>
import utils from '@/scripts/utils.js'
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    time: {
      type: Number,
      default: 0
    }
  },
  watch: {
    url: function() {
      this.showPlayer()
    },
    time: function(val) {
      if (utils.isRealNum(val)) {
        const video = this.$refs.videoRef
        video.currentTime = val
      }
    }
  },
  methods: {
    showPlayer() {
      // 监听播放时间
      const video = this.$refs.videoRef
      // 使用事件监听方式捕捉事件
      video.addEventListener("timeupdate", () => {
        // 用秒数来显示当前播放进度
        // console.log(video.currentTime)
        this.$emit('updatetime', video.currentTime)
      },false);
    }
  }
}
</script>
