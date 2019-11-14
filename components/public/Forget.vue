<template>
  <div class="forget-email">
    <h3>{{title}}</h3>
    <div class="step" :class="steps" v-show="emailShow"></div>
    <div class="email-icon" v-show="emailShow2">
      <span></span>
      Email:{{resData.email}}
    </div>

    <div class="reset-success" v-show="success">
      <div class="title">
        <span></span>新密码设置成功
      </div>
      <div class="countdown">
        <span>{{total}}</span>秒后自动登录
      </div>
      <a href="javascript:;" class="btn-login" @click="login">立即登录</a>
    </div>

    <el-form
      :model="resetForm"
      :rules="resetFormRules"
      ref="resetForm"
      label-width="130px"
      label-position="left"
      v-show="reset"
    >
      <el-form-item label="新密码：" prop="newpwd">
        <el-input type="password" v-model="resetForm.newpwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="newpassword1">
        <el-input type="password" v-model="resetForm.newpassword1" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="toAmend">下一步</el-button>
      </el-form-item>
    </el-form>

    <el-form
      ref="emailFrom"
      label-width="130px"
      :model="emailFromData"
      :rules="rulesEmail"
      v-show="ems"
      label-position="left"
    >
      <el-form-item label="Eamil验证码：" prop="vercode">
        <el-col :span="18">
          <el-input v-model="emailFromData.vercode" placeholder="请输入验证码"></el-input>
        </el-col>
        <el-col :span="6">
          <a
            href="javascript:;"
            class="btn-getCode"
            :class="getCodeClass?'active':''"
            @click="handleGetCode"
          >{{codeMsg}}</a>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleVerCode">下一步</el-button>
      </el-form-item>
    </el-form>

    <el-form
      ref="forgetFrom"
      label-width="90px"
      :model="forgetFromData"
      :rules="rules"
      v-show="checkedEmail"
      label-position="left"
    >
      <el-form-item label="用户名：" prop="userNo">
        <el-input
          v-model="forgetFromData.userNo"
          placeholder="请输入用户名"
          suffix-icon="el-icon-user-solid"
          autofocus="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码：" prop="captcha">
        <el-col :span="16">
          <el-input v-model="forgetFromData.captcha" placeholder="请输入验证码"></el-input>
        </el-col>
        <el-col :span="8">
          <img :src="captchaPath" alt="换一张" class="verify-image" @click="getCaptchaPath" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleGetEmail">下一步</el-button>
      </el-form-item>
      <el-form-item>
        记得密码？<a href="javascript:;" @click="login">重新登录</a>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import utils from '@/scripts/utils.js'
import config from '@/scripts/config.js'
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入新密码'))
            } else if (
                value.toString().length < 6 ||
                value.toString().length > 18
            ) {
                callback(new Error('密码长度为6-18位'))
            } else {
                callback()
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.resetForm.newpwd) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            title: '输入账号',
            emailShow: false,
            emailShow2: false,
            steps: 'one',
            checkedEmail: true,
            ems: false,
            getCodeClass: false,
            success: false,
            reset: false,
            codeMsg: '获取验证码',
            totalTime: 60,
            total: 6,
            captchaPath: '',
            resetForm: {
                key: '',
                newpassword1: ''
            },
            emailFromData: {
                vercode: '',
                key: ''
            },
            forgetFromData: {
                userNo: '',
                captcha: '',
                uuid: ''
            },
            resData: {
                email: '',
                key: '',
                key2: ''
            },
            resetFormRules: {
                newpwd: [
                    { required: true, validator: validatePass, trigger: 'blur' }
                ],
                newpassword1: [
                    {
                        required: true,
                        validator: validatePass2,
                        trigger: 'blur'
                    }
                ]
            },
            rulesEmail: {
                vercode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            },
            rules: {
                userNo: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
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
        ...mapActions('user', [
            'getEmail',
            'getEmailCode',
            'checkEmailCode',
            'resetPassword2'
        ]),
        //获取验证码
        getCaptchaPath() {
            const uuid = utils.getUUID()
            this.forgetFromData.uuid = uuid
            this.captchaPath = `${config.baseUrl}/captcha.jpg?uuid=${uuid}`
        },
        //获取邮箱
        handleGetEmail() {
            this.$refs.forgetFrom.validate(valid => {
                if (valid) {
                    this.getEmail(this.forgetFromData).then(res => {
                        //console.log(res)
                        this.resData.email = res.email
                        this.resData.key = res.key
                        this.title = '通过Email验证码找回'
                        this.checkedEmail = false
                        this.ems = true
                        this.emailShow = true
                        this.emailShow2 = true
                    })
                } else {
                    return false
                }
            })
        },
        //验证码倒计时
        countDown() {
            this.codeMsg = this.totalTime + 's后重新发送'
            this.getCodeClass = true
            let clock = window.setInterval(() => {
                this.totalTime--
                this.codeMsg = this.totalTime + 's后重新发送'
                if (this.totalTime < 0) {
                    //当倒计时小于0时清除定时器
                    window.clearInterval(clock)
                    this.codeMsg = '重新发送验证码'
                    this.getCodeClass = false
                    this.totalTime = 60
                }
            }, 1000)
        },

        //获取邮箱验证码
        handleGetCode() {
            this.countDown()
            this.getEmailCode(this.resData.key).then(res => {
                if (res.code == 0) {
                    this.emailFromData.key = res.key
                }
            })
        },
        //验证邮箱验证码
        handleVerCode() {
            this.checkEmailCode(this.emailFromData).then(res => {
                if (res.code == 0) {
                    this.ems = false
                    this.resetForm.key = res.key
                    this.steps = 'two'
                    this.emailShow2 = false
                    this.reset = true
                }
            })
        },
        //重置密码
        toAmend() {
            this.$refs.resetForm.validate(valid => {
                if (valid) {
                    this.resetPassword2(this.resetForm).then(res => {
                        if (res.code == 0) {
                            this.steps = 'three'
                            this.success = true
                            this.countDown2()
                            this.reset = false
                        }
                    })
                }
            })
        },
        //重新登录
        login() {
            this.$router.push({
                path: '/',
                query: {
                    login: 'no'
                }
            })
        },
        countDown2() {
            let clock = window.setInterval(() => {
                this.total--
                if (this.total < 0) {
                    //当倒计时小于0时清除定时器
                    window.clearInterval(clock)
                    this.login()
                }
            }, 1000)
        }
    }
}
</script>

<style scpode lang="less">
.forget-email {
    width: 632px;
    margin: 0 auto;
    .reset-success {
        width: 100%;
        .btn-login {
            background-color: #44bd9a;
            width: 472px;
            height: 56px;
            display: block;
            line-height: 56px;
            text-align: center;
            font-size: 20px;
            color: #ffffff;
            text-decoration: none;
            margin: 0 auto;
        }
        .countdown {
            font-size: 16px;
            color: #737373;
            line-height: 1;
            margin: 30px 0 10px;
            span {
                color: #0d906a;
            }
        }
        .title {
            line-height: 46px;
            height: 46px;
            color: #040404;
            font-size: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            span {
                display: inline-block;
                background-image: url(/image/dui.png);
                background-size: 46px 46px;
                background-position: center;
                background-repeat: no-repeat;
                height: 46px;
                width: 46px;
                margin: 25px;
            }
        }
    }
    .step {
        width: 632px;
        height: 60px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        margin-bottom: 30px;
    }
    .step.one {
        background-image: url(/image/stepone.png);
    }
    .step.two {
        background-image: url(/image/steptwo.png);
    }
    .step.three {
        background-image: url(/image/stepthree.png);
    }
    .email-icon {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 32px;
        line-height: 32px;
        font-size: 20px;
        color: #383838;
        margin-bottom: 20px;
        span {
            background: url(/image/email.png);
            width: 32px;
            height: 32px;
            margin-right: 10px;
        }
    }
    .btn-getCode {
        width: 100%;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: 0.1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        text-decoration: none;
    }
    .btn-getCode.active {
        background: #dcdfe6;
        pointer-events: none;
    }
    .el-button--primary {
        width: 100%;
        background-color: #44bd9a;
        border-color: #44bd9a;
    }
}
.verify-image {
    height: 100%;
    width: 100%;
    vertical-align: middle;
    cursor: pointer;
}
</style>
