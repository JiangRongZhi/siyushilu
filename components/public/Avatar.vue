<template>
  <el-image
    :style="{ width: size + 'px', height: size + 'px' }"
    :src="'/image/avatar/' + file + '.png'"
  ></el-image>
</template>

<script>
export default {
  props: {
    file: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 45
    }
  }
}
</script>
