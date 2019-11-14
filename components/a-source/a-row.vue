<template>
  <div
    class="a-row"
    :style="{ marginLeft: halfGutter + 'px', marginRight: halfGutter + 'px' }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    split: {
      type: Number,
      default: 1
    },
    gutter: {
      type: Number,
      default: 0
    }
  },
  computed: {
    halfGutter() {
      return this.gutter / -2
    }
  }
}
</script>

<style scoped>
.a-row:after {
  content: '';
  display: block;
  clear: both;
}
</style>
