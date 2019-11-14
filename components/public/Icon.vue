<template>
  <el-image
    class="icon"
    :src="'/icon/' + file + '.png'"
    :style="{ width: size + 'px', height: size + 'px' }"
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
      default: 16
    }
  }
}
</script>

<style>
.icon {
  margin-right: 5px;
  vertical-align: text-top;
}
</style>
