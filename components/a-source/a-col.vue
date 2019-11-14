<template>
  <div
    :style="{
      paddingLeft: halfGutter + 'px',
      paddingRight: halfGutter + 'px',
      float: 'left',
      width: getWidth + '%'
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    span: {
      type: Number,
      default: 1
    }
  },
  computed: {
    halfGutter() {
      const parent = this.$parent
      return parent.gutter / 2
    },
    getWidth() {
      const parent = this.$parent
      const width = this.span / parent.split
      // return Math.floor(width * 10000) / 100
      return width * 100
    }
  }
}
</script>
