<template>
  <el-dialog
    title="手机扫码浏览"
    :visible.sync="qrcodeVisible"
    width="300px"
    :before-close="handleClose"
  >
    <qr-code :text="path"></qr-code>
  </el-dialog>
</template>

<script>
export default {
  props: {
    qrcodeVisible: {
      type: Boolean,
      default: false
    },
    path: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClose() {
      this.$emit('cancel')
    }
  }
}
</script>
