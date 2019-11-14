<template>
  <el-upload
    class="avatar-uploader"
    :show-file-list="true"
    :action="uploadUrl"
    :file-list="fileList"
    :on-success="handleAvatarSuccess"
    :before-upload="uploadBefore"
  >
    <el-button size="small" type="primary" :loading="loading">
      <slot />
    </el-button>
  </el-upload>
</template>

<script>
import config from '@/scripts/config.js'
import http from '@/scripts/http.js'

export default {
  props: {
    value: {
      type: String,
      required: true
    },
  
  },
  data() {
    return {
      fileuploadURL: config.fileuploadUrl,
      uploadImage: '',
      fileList:[],
      filename:'',
      uploadedFiles: config.uploadedFiles,
      loading: false,
      uploadUrl: http.adornUrl(
        '/sys/fileinfo/uploadvideo?token=' + this.$cookie.get('token')
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

    // if(!this.value){
    //   fileList.add({name:this.name,url:this.value})
    // }
  },

  methods: {
    handleAvatarProgress() {
      console.log('progress')
    },
    handleAvatarSuccess(res, file) {

      this.loading = false
      // this.$emit('input', res.data.filerealname)
      // this.$emit('input', res.id.toString())
      this.uploadImage = res.data.fileUrl

      this.$emit('setVideoUrl', res.data.fileUrl)
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    handleAvatarError() {
      this.loading = false
      console.log('error')
    },

    uploadBefore(file) {
      const index = file.name.lastIndexOf('.')
      this.filename = file.name
      if (index < 0) {
        this.$message.error('只能上传MP4/pdf/doc/docx 格式文件')
        return false
      }
      const substr = file.name.substring(index + 1)
      let flag = false
      const arr = ['MP4', 'pdf', 'doc', 'docx']
      for (const a in arr) {
        if (arr[a].toLowerCase() === substr.toLowerCase()) {
          flag = true
          break
        }
      }
      if (!flag) {
        this.$message.error('只能上传 MP4/pdf/doc/docx 格式文件')
        return false
      }
      const isLt10M = file.size / 1024 / 1024 < 200
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 200MB!')
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
