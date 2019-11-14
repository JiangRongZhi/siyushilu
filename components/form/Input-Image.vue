<template>
  <el-upload
    class="avatar-uploader"
    :action="fileuploadURL"
    name="upfilename"
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :on-progress="handleAvatarProgress"
    :on-success="handleAvatarSuccess"
    :on-error="handleAvatarError"
  >
    <img
      v-if="uploadImage || value"
      :src="uploadImage || uploadedFiles + value"
      class="avatar"
    />
    <i v-else v-loading="loading" class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import config from '@/scripts/config.js'

export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      fileuploadURL: config.fileuploadUrl,
      uploadImage: '',
      uploadedFiles: config.uploadedFiles,
      loading: false
    }
  },
  methods: {
    // 图片<
    beforeAvatarUpload(file) {
      console.log('before updoad')
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      const checked = isJPG && isLt2M
      if (checked) {
        this.loading = true
      }
      return checked
    },
    handleAvatarProgress() {
      console.log('progress')
    },
    handleAvatarSuccess(res, file) {
      // console.log('success')
      // console.log('图片上传成功：', res)
      this.loading = false
      // this.$emit('input', res.data.filerealname)
      this.$emit('input', res.id.toString())
      this.uploadImage = URL.createObjectURL(file.raw)
    },
    handleAvatarError() {
      this.loading = false
      console.log('error')
    }
    // 图片>
  }
}
</script>

<style>
/* 上传图片 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
