<template>
  <div ref="subtitleRef" class="library-lesson-subtitle-content">
    <div v-if="subtitleList.length == 0" class="no-subtitle">字幕未找到！</div>
    <div v-for="(item, index) in subtitleList" :key="index">
      <span :ref="item.imageId"></span>
      <div
        class="subtitle-item"
        :class="currentSubtitle.imageId === item.imageId ? 'active' : ''"
      >
        <div class="subtitle-item-tip">
          ------{{ index + 1 }}/{{ subtitleList.length }}------
        </div>
        <div class="subtitle-item-content" >
          <span
            v-for="text in item.list"
            :key="text.id"
            class="subtitle-item-text"
            :class="time*1000 >= text.playStartTime && time*1000 < text.playEndTime ? 'text-active' : ''"
            @click="handleTextClicked(text.playStartTime)"
            v-html="formatSearch(text.content)"
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
    canEdit: {
      type: Boolean,
      default: false
    },
    trans: {
      type: String,
      default: '1'
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
  overflow: auto;
  .no-subtitle {
    margin-top: 10px;
    text-align: center;
  }
}
.subtitle-item-tip {
  line-height: 40px;
  text-align: center;
}
.subtitle-item.active .subtitle-item-tip {
  color: @color-primary;
}
.subtitle-item-content {
  padding: 0 10px;
  line-height: 25px;
  text-indent: 2em;
  .el-textarea {
    display: block;
  }
}
.subtitle-item-text {
  cursor: pointer;
}
.text-active {
  color: @color-primary;
}
</style>
