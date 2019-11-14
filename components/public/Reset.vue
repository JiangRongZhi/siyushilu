<template>
  <div>
    <el-form ref="resetForm" label-width="120px" :model="resetForm" :rules="resetFormRules">
      <el-form-item label="新密码：" prop="newpwd">
        <el-input type="password" v-model="resetForm.newpwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="newpassword1">
        <el-input type="password" v-model="resetForm.newpassword1" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="toAmend">确认修改</el-button>
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
            resetForm: {
                password: ''
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
            }
        }
    },
    mounted() {},
    methods: {
        ...mapActions('user', ['login']),
        //重置密码
        toAmend() {
            this.$refs.resetForm.validate(valid => {
                // if (valid) {
                //     this.resetPassword(this.resetForm).then(res => {
                //         if (res.code == 0) {
                //             utils.successMessage('密码修改成功,请重新登录！')
                //             this.logout()
                //             location.reload()
                //         }
                //     })
                // }
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
