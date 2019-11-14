<template>
  <div class="mobile-login-wrap">
    <el-image class="site-logo" src="/image/logo.png" alt="site logo" />
    <div class="login-title">登录</div>
    <el-form
      ref="loginFromRef"
      label-width="80px"
      :model="loginFromData"
      :rules="rules"
    >
      <el-form-item prop="userNo" class="form-item form-item-user">
        <div slot="label">
          <Icon file="mobile/user" :size="49"></Icon>
        </div>
        <el-input
          v-model="loginFromData.userNo"
          placeholder="请输入用户名"
          autofocus="true"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="passwd" class="form-item form-item-pass">
        <div slot="label">
          <Icon file="mobile/lock" :size="49"></Icon>
        </div>
        <el-input
          v-model="loginFromData.passwd"
          placeholder="请输入密码"
          show-password
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label-width="300px"
        prop="captcha"
        class="form-item form-item-captcha"
      >
        <div slot="label">
          <img
            :src="captchaPath"
            alt="换一张"
            class="verify-image"
            @click="getCaptchaPath"
          />
        </div>
        <el-input
          v-model="loginFromData.captcha"
          placeholder="请输入验证码"
        >
        </el-input>
      </el-form-item>
      <el-form-item label-width="0px" class="form-item form-item-button">
        <el-button @click="loginFormSubmit">登录</el-button>
      </el-form-item>
      <el-form-item label-width="0px" class="form-item form-item-tip">
        <span>若忘记密码，请PC端找回</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import utils from '@/scripts/utils.js'
import config from '@/scripts/config.js'
import Icon from '@/components/public/Icon.vue'
export default {
  layout: 'mobile',
  components: {
    Icon
  },
  data() {
    return {
      loginFromData: {
        userNo: '',
        passwd: '',
        uuid: '',
        captcha: ''
      },
      captchaPath: '',
      backPath: '/mobile/login',
      rules: {
        userNo: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        passwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getCaptchaPath()
    const query = this.$route.query
    if (query.fp) {
      this.backPath = query.fp
    }
  },
  methods: {
    ...mapActions('user', ['login']),
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
          // console.log('redirect:', this.backPath)
          if (this.backPath) {
            this.$router.push({ path: this.backPath, query: {} })
          }
        }
      })
    }
  }
}
</script>

<style lang="less">
.mobile-login-wrap {
  height: 100%;
  background: url('/image/mobile/background.jpg') center top no-repeat #e0fbe8;
  background-size: 100% 100%;
  .form-item.is-required .el-form-item__label::before {
    content: none;
  }
  .el-form-item__error {
    font-size: 22px;
  }
}
.site-logo {
  margin-top: 344px;
  margin-left: 237px;
  width: 600px;
}
.login-title {
  margin-top: 140px;
  margin-left: 100px;
  font-size: 60px;
  font-weight: bold;
  color: #3e3536;
}
.form-item {
  margin-left: 100px;
  padding-bottom: 15px;
  width: 880px;
  border-bottom: 1px solid @color-border-gray;
  .el-input__inner {
    margin-top: 20px;
    font-size: 36px;
    border: none;
    background-color: transparent;
  }
}
.form-item-user {
  margin-top: 100px;
}
.form-item-pass {
  margin-top: 60px;
}
.form-item-captcha {
  margin-top: 60px;
}
.form-item-button {
  margin-top: 100px;
  border-bottom: none;
  .el-button {
    display: block;
    padding: 40px;
    width: 100%;
    font-size: 36px;
    color: @color-white;
    background-color: transparent;
    background: linear-gradient(to right, #8ee989, #37c089);
    border-radius: 50px;
  }
}
.form-item-tip {
  margin-top: 50px;
  border-bottom: none;
  text-align: center;
  span {
    font-size: 36px;
    color: @color-gray1;
  }
}
.verify-image {
  height: 100%;
  width: 100%;
  vertical-align: middle;
  cursor: pointer;
}
</style>
