<template>
  <div class="subtitle-item-wrap">
    <div class="subtitle-item-tip">------{{ index }}/{{ total }}------</div>
    <div
      class="subtitle-item-content"
      :class="isActive ? 'subtitle-item-active' : ''"
    >
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    text: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.subtitle-item-tip {
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  color: @color-primary;
}
.subtitle-item-content {
  padding: 0 10px;
  line-height: 44px;
  text-indent: 2em;
  font-size: 32px;
}
.subtitle-item-active {
  color: @color-primary;
}
</style>
