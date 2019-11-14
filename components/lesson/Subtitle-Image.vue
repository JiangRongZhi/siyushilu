<template>
  <div class="subtitle-image-wrap" ref="subtitleImagesRef">
    <div
      v-for="(item, index) in subtitles"
      :key="index"
      :ref="item.imageId"
      class="subtitle-image-item"
      :class="currentSubtitle.imageId === item.imageId ? 'active': ''"
      @click="handleImageClicked(item.showTime)"
    >
      <el-image :src="item.imageUrl" fit="cover">
        <el-image
          slot="error"
          :src="'http://iph.href.lu/135x75?fg=ffffff&bg=941100&text=' + item.content"
          class=""
        ></el-image>
      </el-image>
      <span>{{ (index + 1) + '/' + subtitles.length }}</span>
    </div>
  </div>
</template>

<script>
import { findLast } from 'lodash'
export default {
  props: {
    subtitles: {
      type: Array,
      default: []
    },
    time: {
      type: Number,
      default: 0
    },
    trans:{
      type:String,
      default:'1'
    }
  },
  data() {
    return {
      currentSubtitle: {}
    }
  },
  watch: {
    time: function(val) {
      this.scrollOnTime(val)
    }
  },
  methods: {
    scrollOnTime(t) {
      let currentSubtitle = findLast(
        this.subtitles,
        v => {
          let time = t * 1000
          return time >= v.showTime
        }
      )
      if ((currentSubtitle && currentSubtitle.imageId) != this.currentSubtitle.imageId) {
        this.setCurrentLeft(currentSubtitle)
      }
    },
    setCurrentLeft(subtitle) {
      subtitle = subtitle || {}
      this.currentSubtitle = subtitle
      if (subtitle.imageId) {
        const subtitleContent = this.$refs.subtitleImagesRef
        const subtitleItem = this.$refs[subtitle.imageId]
        if (subtitleItem) {
          subtitleContent.scrollLeft =
            subtitleItem[0].offsetLeft - subtitleContent.offsetLeft - 550
        }
      }
    },
    handleImageClicked(e) {
      // console.log(e)
      this.$emit('play-with', e)
    }
  }
}
</script>

<style lang="less" scoped>
.subtitle-image-wrap {
  overflow: auto;
  white-space: nowrap;
}
.subtitle-image-item {
  display: inline-block;
  margin: 5px;
  width: 135px;
  // height: 75px;
  font-size: 0px;
  border: 1px solid @color-border-gray;
  cursor: pointer;
  position: relative;
}
.subtitle-image-item span {
  position: absolute;
  padding: 1px 3px;
  right: 0;
  bottom: 0px;
  font-size: 12px;
  color: white;
  background-color: @color-border-gray;
  border-radius: 3px 0px 0px 0px;
}
.subtitle-image-item.active {
  border-color: @color-primary;
}
.subtitle-image-item.active span {
  background-color: @color-primary;
}
</style>
