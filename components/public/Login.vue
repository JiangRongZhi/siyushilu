<template>
  <div>
    <el-form
      ref="loginFromRef"
      label-width="120px"
      :model="loginFromData"
      :rules="rules"
      v-show="flag"
    >
      <el-form-item label="用户名：" prop="userNo">
        <el-input
          v-model="loginFromData.userNo"
          placeholder="请输入用户名"
          suffix-icon="el-icon-user-solid"
          autofocus="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="passwd">
        <el-input v-model="loginFromData.passwd" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item label="验证码：" prop="captcha">
        <el-col :span="12">
          <el-input v-model="loginFromData.captcha" placeholder="请输入验证码"></el-input>
        </el-col>
        <el-col :offset="1" :span="11">
          <img :src="captchaPath" alt="换一张" class="verify-image" @click="getCaptchaPath" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginFormSubmit">登录</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import utils from '@/scripts/utils.js'
import config from '@/scripts/config.js'
export default {
    props: {
        backPath: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            flag: true,
            forgetShow: false,
            forgetFromData: {
                userNo: '',
                email: '',
                erCode: ''
            },
            loginFromData: {
                userNo: '',
                passwd: '',
                uuid: '',
                captcha: ''
            },
            captchaPath: '',
            rules: {
                userNo: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                passwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                captcha: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        this.getCaptchaPath()
    },
    methods: {
        ...mapActions('user', ['login']),
        // 取消
        handleCancel() {
            this.$emit('cancel')
            //console.log(this.backPath)
            this.$router.push({
                path: this.backPath,
                query: {}
            })
        },
        // 获取验证码
        getCaptchaPath() {
            const uuid = utils.getUUID()
            this.loginFromData.uuid = uuid
            this.captchaPath = `${config.baseUrl}/captcha.jpg?uuid=${uuid}`
        },
        // 登录按钮
        loginFormSubmit() {
            this.$refs.loginFromRef.validate(valid => {
                if (valid) {
                    this.sendData()
                } else {
                    return false
                }
            })
        },
        // 发送数据
        sendData() {
            // console.log(this.loginFromData)
            this.login(this.loginFromData).then(res => {
                if (res === 'refresh-verify') {
                    this.getCaptchaPath()
                }
                if (res === 'success') {
                    this.$emit('cancel')
                    location.reload()
                    // console.log('redirect:', this.backPath)
                    // if (this.backPath) {
                    //   this.$router.push({
                    //     path: this.backPath,
                    //     query: {}
                    //   })
                    // }
                }
            })
        }
    }
}
</script>

<style scpode>
.verify-image {
    height: 100%;
    width: 100%;
    vertical-align: middle;
    cursor: pointer;
}
</style>
