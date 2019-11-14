<template>
  <div class="uc-center-wrap">
    <div class="main">
      <el-container>
        <el-aside width="260px">
          <div class="aside-panel">
            <div class="aside-avatar">
              <img src="/image/avatar.png" alt />
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
                <span>学校：</span>
                {{infoForm.xyName}}
              </li>
              <li>
                <span>授课专业：</span>
                {{infoForm.professionName}}
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
                      <el-radio-group v-model="infoForm.sex">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="2">女</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="生日" required>
                      <el-col :span="11">
                        <el-form-item prop="date1">
                          <el-date-picker type="date" placeholder="选择日期" v-model="infoForm.date1"></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="授业专业" prop="professionName">
                      <el-input v-model="infoForm.professionName"></el-input>
                    </el-form-item>
                    <el-form-item label="授课课程" prop="lesson">
                      <el-input v-model="infoForm.lesson"></el-input>
                    </el-form-item>
                    <el-form-item label="授课班级" prop="classlist">
                      <el-cascader
                        v-model="infoForm.teacherClassList"
                        :options="infoForm.classTree"
                        :props="{value:'id',multiple:true}"
                        :show-all-levels="false"
                        style="width:100%"
                        clearable
                      ></el-cascader>
                    </el-form-item>
                    <el-form-item label="教师工号" prop="code">
                      <el-input disabled v-model="infoForm.code"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mphone">
                      <el-input disabled v-model="infoForm.mphone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                      <el-input v-model="infoForm.email"></el-input>
                    </el-form-item>
                    <div class="form-footer">
                      <el-button type="success" @click="submitUserInfo('infoForm')">保存</el-button>
                    </div>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="修改密码" name="second">
                  <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="150px"
                    class="passForm"
                  >
                    <el-form-item label="输入原密码" prop="oldPass">
                      <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="输入新密码" prop="pass">
                      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="再次输入新密码" prop="checkPass">
                      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>

                    <div class="form-footer">
                      <el-button type="success" @click="resetPasswrod('ruleForm')">提交</el-button>
                    </div>
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
import { mapActions } from 'vuex'
import utils from '@/scripts/utils.js'
export default {
    layout: 'aijinke',
    data() {
        var oldPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入旧密码'))
            }
        }
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass')
                }
                callback()
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            activeName: 'first',
            activeIndex: '1',
            infoForm: {
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
                teacherClassList: []
            },
            ruleForm: {
                pass: '',
                checkPass: '',
                oldPass: ''
            },
            rulesInfo: {},
            rules: {
                pass: [
                    {
                        validator: validatePass,
                        trigger: 'blur'
                    }
                ],
                checkPass: [
                    {
                        validator: validatePass2,
                        trigger: 'blur'
                    }
                ],
                oldPass: [
                    {
                        validator: oldPass,
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    created() {
        this.getUserDetails()
    },
    methods: {
        ...mapActions('user', ['getUserDetail', 'updateUserInfo']),

        getUserDetails() {
            this.getUserDetail().then(res => {
                //console.log(res)
                if (res) {
                    this.infoForm.classTree = res.classTree[0].children
                    this.infoForm.teacherClassList = res.teacherClassList
                    const data = res.data
                    this.infoForm.tid = data.tid
                    this.infoForm.name = data.name
                    this.infoForm.email = data.email
                    this.infoForm.date1 = data.birth
                    this.infoForm.code = data.code
                    this.infoForm.lesson = data.lesson
                    this.infoForm.professionName = data.professionName
                    this.infoForm.mphone = data.mphone
                    //this.infoForm.sex = data.sex
                    this.infoForm.userNo = data.userNo
                    this.infoForm.xyName = data.xyName
                    this.infoForm.classList = data.classList
                    if (res.type == 1) {
                        this.infoForm.character = '老师'
                    } else {
                        this.infoForm.character = '学生'
                    }
                }
            })
        },
        //重置密码
        resetPasswrod(formName){
          this.$refs[formName].validate(valid => {
              console.log(valid)
                if (valid) {
                  console.log('1111')
                } else {
                    console.log('error submit!!')
                    return false
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
                        console.log('学生')
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
