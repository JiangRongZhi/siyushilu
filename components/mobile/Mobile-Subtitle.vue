<template>
  <div ref="subtitleRef" class="library-lesson-subtitle-content">
    {{ searchText }}
    <div v-if="subtitleList.length == 0" class="no-subtitle">字幕未找到！</div>
    <div v-for="(item, index) in subtitleList" :key="index">
      <span :ref="item.imageId"></span>
      <div
        class="subtitle-item"
        :class="currentSubtitle.imageId === item.imageId ? 'active' : ''"
      >
        <div
          class="subtitle-item-tip"
          :class="currentSubtitle.imageId === item.imageId ? 'active' : ''"
        >
          ------{{ index + 1 }}/{{ subtitleList.length }}------
        </div>
        <div class="subtitle-item-content" >
          <span
            v-for="text in item.list"
            :key="text.id"
            class="subtitle-item-text"
            :class="time*1000 >= text.playStartTime && time*1000 < text.playEndTime ? 'text-active' : ''"
            @click="handleTextClicked(text.playStartTime)"
            v-html="trans=='1' ? formatSearch(text.content) : formatSearch(text.transContent)"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findLast } from 'lodash'
import utils from '@/scripts/utils.js'
export default {
  props: {
    subtitleList: {
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
    },
    searchText: {
      type: String,
      default: ''
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
        this.subtitleList,
        v => {
          let time = t * 1000
          return time >= v.showTime
        }
      )
      if ((currentSubtitle && currentSubtitle.imageId) != this.currentSubtitle.imageId) {
        this.setCurrentTop(currentSubtitle)
      }
    },
    setCurrentTop(subtitle) {
      subtitle = subtitle || {}
      this.currentSubtitle = subtitle
      if (subtitle.imageId) {
        const subtitleContent = this.$refs.subtitleRef
        const subtitleItem = this.$refs[subtitle.imageId]
        if (subtitleItem) {
          subtitleContent.scrollTop =
            subtitleItem[0].offsetTop - subtitleContent.offsetTop
        }
      }
    },
    handleTextClicked(e) {
      this.$emit('play-with', e)
    },
    formatSearch(value) {
      return utils.searchHighLight(value, this.searchText)
    }
  }
}
</script>

<style lang="less" scoped>
.library-lesson-subtitle-content {
  padding: 10px 20px;
  overflow: auto;
  background-color: #ffffff;
  .no-subtitle {
    margin-top: 10px;
    text-align: center;
    font-size: 30px;
  }
}
.subtitle-item-tip {
  line-height: 50px;
  text-align: center;
  font-size: 30px;
}
.subtitle-item-tip.active {
  color: @color-primary;
}
.subtitle-item-content {
  padding: 0 10px;
  line-height: 44px;
  text-indent: 2em;
  font-size: 32px;
}
.text-active {
  color: @color-primary;
}
</style>
