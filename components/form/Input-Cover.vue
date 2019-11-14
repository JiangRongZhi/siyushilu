<template>
  <el-upload
    class="avatar-uploader"
    :show-file-list="false"
    :action="uploadUrl"
    :on-success="handleAvatarSuccess"
    :before-upload="uploadBefore"
    :on-remove="handleRemove"
  >
    <img v-if="uploadImage" :src="uploadImage" class="avatar" />
    <i v-else v-loading="loading" class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import config from '@/scripts/config.js'
import http from '@/scripts/http.js'

export default {
  props: {
    value: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      fileuploadURL: config.fileuploadUrl,
      uploadImage: '',
      uploadedFiles: config.uploadedFiles,
      loading: false,
      uploadUrl: http.adornUrl(
        '/sys/fileinfo/uploadimage?token=' + this.$cookie.get('token')
      )
    }
  },
  watch: {
    value: function() {
      this.uploadImage = this.value
    }
  },

  mounted() {
    this.uploadImage = this.value
  },

  methods: {
    // 图片<
    beforeAvatarUpload(file) {
      console.log('before updoad')
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传封面图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传封面图片大小不能超过 2MB!')
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
      this.loading = false
      // this.$emit('input', res.data.filerealname)
      // this.$emit('input', res.id.toString())
      this.uploadImage = res.data.fileUrl

      this.$emit('setImageUrl', res.data.fileUrl)
    },
    handleAvatarError() {
      this.loading = false
      console.log('error')
    },

    uploadBefore(file) {
      const index = file.name.lastIndexOf('.')
      if (index < 0) {
        this.$message.error('只能上传 JPG/PNG和MP4 格式文件')
        return false
      }
      const substr = file.name.substring(index + 1)
      let flag = false
      const arr = ['JPG', 'PNG', 'MP4']
      for (const a in arr) {
        if (arr[a].toLowerCase() === substr.toLowerCase()) {
          flag = true
          break
        }
      }
      if (!flag) {
        this.$message.error('只能上传  JPG/PNG和MP4 格式文件')
        return false
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!')
      }
      return isLt10M
    },
    handleRemove(file, fileList) {
      // ajax
      this.$http({
        url: http.adornUrl('/sys/fileinfo/removebyid'),
        method: 'get',
        params: this.$http.adornParams({
          fileId: file.fileId
        })
      })
        .then(({ data }) => {})
        .catch(err => {
          console.log(err)
        })
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
  width: 262px;
  height: 160px;
  line-height: 160px;
  text-align: center;
}
.avatar-uploader .avatar {
  width: 262px;
  height: 160px;
  display: block;
}
</style>
