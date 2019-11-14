<template>
  <div class="uc-center-wrap">
    <div class="main">
      <el-container>
        <el-aside width="260px">
          <div class="aside-panel">
            <div class="aside-avatar">
              <el-image
                v-if="infoForm.sex == 2 && usertype == 1"
                src="/image/avatar/teacher-female-2.png"
              ></el-image>
              <el-image
                v-if="infoForm.sex == 1  && usertype == 1"
                src="/image/avatar/teacher-male-2.png"
              ></el-image>
              <el-image v-if="usertype == 2" src="/image/avatar/student2.png"></el-image>
            </div>
            <ul class="uc-grid">
              <li>
                <span>姓名：</span>
                {{infoForm.name}}
              </li>
              <li>
                <span>角色：</span>
                {{infoForm.character}}
              </li>
              <li>
                <span>账号：</span>
                {{infoForm.userNo}}
              </li>
              <li>
                <span>学校名称：</span>
                {{infoForm.schoolName}}
              </li>
              <li>
                <span>教学单位：</span>
                {{infoForm.xyName}}
              </li>
            </ul>
          </div>
        </el-aside>
        <el-main>
          <div class="col-panel">
            <div class="main-panel form-panel">
              <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="账户信息" name="first">
                  <el-form
                    :model="infoForm"
                    :rules="rulesInfo"
                    ref="infoForm"
                    label-width="120px"
                    class="panelForm"
                  >
                    <el-form-item label="姓名" prop="name">
                      <el-input disabled v-model="infoForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                      <el-radio-group disabled v-model="infoForm.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="生日" required>
                      <el-col :span="11">
                        <el-form-item prop="date1">
                          <el-date-picker type="date" placeholder="选择日期" v-model="infoForm.date1"></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                    <el-form-item :label="infoForm.type==1?'授课专业':'所属专业'" prop="professionName">
                      <el-input v-model="infoForm.professionName"></el-input>
                    </el-form-item>

                    <el-form-item label="授课课程" prop="lesson" v-if="infoForm.type==1">
                      <el-input v-model="infoForm.lesson"></el-input>
                    </el-form-item>

                    <el-form-item label="授课班级" prop="classlist" v-if="infoForm.type==1">
                      <el-cascader
                        v-model="infoForm.teacherClassList"
                        :options="infoForm.classTree"
                        :props="{value:'id',multiple:true}"
                        :show-all-levels="false"
                        style="width:100%"
                        clearable
                      ></el-cascader>
                    </el-form-item>
                    <el-form-item label="所属班级" prop="className" v-else>
                      <el-input disabled v-model="infoForm.className"></el-input>
                    </el-form-item>
                    <el-form-item :label="usertype==1?'教师工号':'学生学号'" prop="code">
                      <el-input disabled v-model="infoForm.code"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mphone">
                      <el-input disabled v-model="infoForm.mphone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                      <el-input disabled v-model="infoForm.email"></el-input>
                    </el-form-item>
                    <div class="form-footer">
                      <el-button type="success" @click="submitUserInfo('infoForm')">保存</el-button>
                    </div>
                  </el-form>
                </el-tab-pane>

                <el-tab-pane label="修改密码" name="second">
                  <el-form
                    :model="resetForm"
                    :rules="resetFormRules"
                    ref="resetForm"
                    label-width="200px"
                    class="passForm"
                  >
                    <el-form-item label="旧密码：" prop="password">
                      <el-input type="password" v-model="resetForm.password" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="新密码：" prop="newpwd">
                      <el-input type="password" v-model="resetForm.newpwd" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：" prop="newpassword1">
                      <el-input
                        type="password"
                        v-model="resetForm.newpassword1"
                        auto-complete="off"
                      ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click.native.prevent="toAmend">确认修改</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import utils from '@/scripts/utils.js'
export default {
    layout: 'aijinke',
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
                newpassword1: '',
                password: '',
                username: ''
            },
            resetFormRules: {
                password: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' }
                ],
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
            usertype: null,
            activeName: 'first',
            activeIndex: '1',
            infoForm: {
                type: 1,
                id: '',
                name: '李媛媛',
                sex: '1',
                date1: '1985-2-2',
                professionName: '市场营销',
                code: '007',
                lesson: '市场营销理论',
                classList: [],
                mphone: '180222111',
                email: 'xxxx@163.com',
                character: '老师',
                userNo: '',
                xyName: '',
                classTree: [],
                teacherClassList: [],
                className: '',
                schoolName: ''
            },
            rulesInfo: {}
        }
    },
    computed: {
        ...mapState('user', ['userInfo'])
    },
    created() {
        this.getUserDetails()
        this.usertype = this.userInfo.type
    },
    methods: {
        ...mapMutations('user', ['logout']),
        ...mapActions('user', [
            'getUserDetail',
            'updateUserInfo',
            'updateStudentInfo',
            'resetPassword'
        ]),

        getUserDetails() {
            this.getUserDetail().then(res => {
                console.log(res)
                if (res) {
                    this.infoForm.classTree = res.classTree[0].children
                    this.infoForm.teacherClassList = res.teacherClassList
                    this.infoForm.type = res.type
                    const data = res.data
                    this.infoForm.tid = data.tid
                    this.infoForm.name = data.name
                    this.infoForm.email = data.email
                    this.infoForm.date1 = data.birth
                    this.infoForm.lesson = data.lesson
                    this.infoForm.professionName = data.professionName
                    this.infoForm.mphone = data.mphone
                    this.infoForm.sex = data.sex
                    this.infoForm.schoolName = data.schoolName
                    this.infoForm.userNo = data.userNo

                    this.infoForm.classList = data.classList
                    if (res.type == 1) {
                        this.infoForm.character = '老师'
                        this.infoForm.code = data.code
                        this.infoForm.xyName = data.xyName
                    } else {
                        this.infoForm.character = '学生'
                        this.infoForm.code = data.scode
                        this.infoForm.xyName = data.instituteName
                        this.infoForm.className = data.className
                    }
                }
            })
        },
        //重置密码
        toAmend() {
            this.$refs.resetForm.validate(valid => {
                if (valid) {
                    this.resetPassword(this.resetForm).then(res => {
                        if (res.code == 0) {
                            utils.successMessage('密码修改成功,请重新登录！')
                            this.logout()
                            location.reload()
                        }
                    })
                }
            })
        },
        //更新用户信息
        submitUserInfo(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.infoForm.character == '老师') {
                        this.updateUserInfo(this.infoForm).then(res => {
                            if (res.code == 0) {
                                utils.successMessage('修改成功！')
                            }
                        })
                    } else {
                        this.updateStudentInfo(this.infoForm).then(res => {
                            if (res.code == 0) {
                                utils.successMessage('修改成功！')
                            }
                        })
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>
