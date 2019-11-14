<template>
  <div class="course-edit-wrap">
    <MineTop active="course"></MineTop>
    <div class="course-edit-body">
      <div class="container-1200">
        <div class="form-title">
          <span v-if="isNew">创建课程资源</span>
          <span v-else>编辑课程资源</span>
        </div>
        <el-form
          ref="courseFromRef"
          label-position="left"
          label-width="140px"
          :rules="rules"
          :model="courseFormData"
        >
          <el-form-item prop="coverImage" label="课程封面：">
            <el-checkbox-group v-model="courseFormData.coverImage"></el-checkbox-group>
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :action="uploadUrl"
              :on-success="handleAvatarSuccess"
              :before-upload="uploadBefore"
              :on-remove="handleRemove"
            >
              <img v-if="courseFormData.coverImage" :src="courseFormData.coverImage" class="avatar" />
              <i v-else v-loading="loading" class="el-icon-plus avatar-uploader-icon">
                <div>添加封面</div>
              </i>
              <div v-if="courseFormData.coverImage" class="edit-coverImage">修改封面</div>
            </el-upload>
          </el-form-item>

          <el-form-item prop="name" label="课程名称：">
            <el-input v-model="courseFormData.name" placeholder="请输入课程名称"></el-input>
          </el-form-item>
          <el-form-item prop="professionId" label="所属专业：">
            <el-select v-model="courseFormData.professionId" placeholder="请选择所属专业">
              <el-option
                v-for="(item, index) in proList"
                :key="index"
                :label="item.name"
                :value="item.pid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="courseDesc" label="课程介绍：">
            <el-input
              v-model="courseFormData.courseDesc"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 10 }"
            ></el-input>
          </el-form-item>
          <el-form-item label="课程目录：">自动生成</el-form-item>

          <el-form-item prop="isPublish" label="是否发布：">
            <div class="c-form-item">
              <el-radio-group v-model="courseFormData.isPublish">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>

          <el-form-item label="课程发布：" prop="shared" v-show="courseFormData.isPublish==1">
            <el-checkbox-group v-model="courseFormData.shared"></el-checkbox-group>
            <div class="c-form-item">
              <el-checkbox label="教学班级" v-model="selectClass" @change="setPublish($event)"></el-checkbox>
              <el-checkbox label="课程资源库" v-model="lessonChecked" @change="setPublish2($event)"></el-checkbox>

              <div class="select-class" v-show="selectClass">
                <el-form-item prop="classList">
                  <el-cascader
                    v-model="courseFormData.classList"
                    :options="classList"
                    :props="{value:'id', label:'name',children:'classList',multiple:true}"
                    :show-all-levels="false"
                  ></el-cascader>
                </el-form-item>
              </div>
            </div>
          </el-form-item>

          <el-divider></el-divider>
          <div class="lesson-add">
            <div>已添加{{ courseDetail.lessonNum || 0 }}个课堂资源</div>
            <div class="add-lesson-button" @click="handleAddLesson">
              <div class="add-icon">+</div>
              <div class="add-tip">添加课堂资源</div>
            </div>
            <el-dialog title="添加课堂资源" :visible.sync="dialogLessonAdditionVisible">
              <LessonAddition
                :course-id="courseId"
                :current-ids="courseDetail.ids"
                @cancel="dialogLessonAdditionVisible = false"
                @finish="handleAdditionFinish"
              ></LessonAddition>
            </el-dialog>
            <div class="add-lesson" v-for="item in courseData" :key="item.id">
              <div class="imgs">
                <el-image class="course-item-image" :src="item.coverImage ? item.coverImage:'' "></el-image>
              </div>
              <div class="lessname">{{item.name}}</div>
              <a href="javascript:;" class="btn-remove" @click="removeAddInfo(item.id)"></a>
              <div class="block"></div>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="lesson-list">
            <LessonList v-if="courseId" :course-id="courseId" :can-delete="true"></LessonList>
          </div>
          <div class="form-buttons">
            <el-form-item size="medium">
              <el-button @click="handleCancel">取消</el-button>
              <el-button v-if="isNew" type="primary" @click="handleAddSubmit">确认创建</el-button>
              <el-button v-else type="primary" @click="handleEditSubmit">确认修改</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import config from '@/scripts/config.js'
import http from '@/scripts/http.js'
import MineTop from '@/components/mine/Mine-Top.vue'
import LessonList from '@/components/course/Lesson-List.vue'
import LessonAddition from '@/components/mine/Lesson-Addition.vue'
import utils from '@/scripts/utils.js'
const cityOptions = ['教学班级', '课程资源库']
export default {
    layout: 'aijinke',
    components: {
        MineTop,
        LessonList,
        LessonAddition
    },
    data() {
        return {
            courseId: '',
            courseDetail: {},
            publishs: cityOptions,
            dialogLessonAdditionVisible: false,
            dialogQRCodeText: '',
            proList: [],
            selectClass: false,
            lessonChecked: false,
            multipleSelection: [],
            checkboxi: 0,
            schooli: 0,
            courseData: '',
            active: '',
            classList: [],
            option: {
                page: 1, // 页码
                limit: 20 // 条数
            },
            courseFormData: {
                name: '',
                professionId: '',
                coverImage: '',
                courseDesc: '',
                isPublish: 0,
                shared: [],
                ids: [],
                schoolOpened: 0,
                classList: []
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入课堂名称',
                        trigger: 'blur'
                    }
                ],
                professionId: [
                    {
                        required: true,
                        message: '请选择所属专业',
                        trigger: 'change'
                    }
                ],
                coverImage: [
                    {
                        required: true,
                        message: '请上传一张封面图',
                        trigger: 'change'
                    }
                ],
                courseDesc: [
                    {
                        required: true,
                        message: '请填写课程介绍',
                        trigger: 'blur'
                    }
                ],
                shared: [
                    {
                        required: true,
                        message: '请至少选择一个',
                        trigger: 'change'
                    }
                ],
                classList: []
            },
            isNew: true,
            fileuploadURL: config.fileuploadUrl,
            uploadedFiles: config.uploadedFiles,
            loading: false,
            uploadUrl: ''
        }
    },
    watch: {
        courseFormData: {
            handler(newValue, oldValue) {
                newValue.isPublish == 0
                    ? (this.rules.shared = [])
                    : (this.rules.shared = [
                          {
                              required: true,
                              message: '请至少选择一个',
                              trigger: 'change'
                          }
                      ])
            },
            deep: true
        }
    },
    computed: {
        ...mapState('user', ['userInfo'])
    },
    mounted() {
        this.uploadUrl = http.adornUrl(
            '/sys/fileinfo/uploadimage?token=' + this.$cookie.get('token')
        )
        const query = this.$route.query

        if (query.active == 'unpublished') {
            this.active = query.active
            this.courseFormData.isPublish = 0
            this.rules.shared = []
        } else {
            this.active = 'published'
            this.courseFormData.isPublish = 1
        }

        this.getProList().then(res => {
            this.proList = res
        })
        this.getClasslist().then(res => {
            let k = 0
            for (let i in res) {
                let tmp = res[i]

                let cl = {
                    id: k++ + '',
                    name: tmp.yearName,
                    classList: tmp.classList
                }
                this.classList.push(cl)
            }
        })

        if (query.id) {
            this.isNew = false
            this.courseId = query.id
            this.showDetail()
        }
    },
    methods: {
        ...mapActions('course', [
            'addCourse',
            'getDetail',
            'editCourse',
            'getProList',
            'getTcourseAllinfo',
            'getAddLessonList',
            'courseUnpublishList',
            'getClasslist'
        ]),
        // 编辑获取详情
        showDetail() {
            this.getTcourseAllinfo(this.courseId).then(res => {
                const fData = res.tCourse
                if (res) {
                    this.courseDetail = fData
                    this.courseFormData.id = fData.id
                    this.courseFormData.name = fData.name
                    this.courseFormData.professionId = fData.professionId
                    this.courseFormData.courseDesc = fData.courseDesc
                    this.courseFormData.isPublish = fData.isPublish
                    this.courseFormData.coverImage = fData.coverImage
                    this.courseFormData.schoolOpened = fData.schoolOpened
                    if (this.courseFormData.schoolOpened == 1) {
                        this.lessonChecked = true
                    }
                    if (fData.classList) {
                        this.selectClass = true
                        let cls = []

                        let t = 0
                        for (let i in fData.classList) {
                            let tmp = fData.classList[i]
                            //查询数据
                            for (let j in this.classList) {
                                let yearinfo = this.classList[j]
                                for (let k in yearinfo.classList) {
                                    if (yearinfo.classList[k].id == tmp) {
                                        cls.push([yearinfo.id, tmp])
                                    }
                                }
                            }
                        }
                        this.courseFormData.classList = cls
                        //console.log(this.courseFormData.classList)
                    }
                }
            })
        },
        // 添加金课
        handleAddLesson() {
            this.dialogLessonAdditionVisible = true
        },
        //发布到
        setPublish2(e) {
            if (e) {
                this.courseFormData.schoolOpened = 1
                this.courseFormData.shared.push('a')
            } else {
                this.courseFormData.schoolOpened = 0
                this.courseFormData.shared.splice('a' || '')
            }
            //console.log(this.courseFormData.shared)
        },
        setPublish(e) {
            if (e) {
                this.selectClass = true
                this.courseFormData.shared.push('b')

                this.rules.classList = [
                    {
                        required: true,
                        message: '请至少选择一个班级',
                        trigger: 'change'
                    }
                ]
            } else {
                this.courseFormData.shared.splice('b' || '')
                this.selectClass = false
                this.rules.classList = []
            }
            //console.log(this.courseFormData.shared)
        },
        //班级选择
        getClassList(e) {
            this.courseFormData.classList = e
        },

        // 创建课程
        handleAddSubmit() {
            const ids = []
            this.courseFormData.classList.forEach((val, index) => {
                ids.push(val[1])
            })
            this.courseFormData.classList = ids

            this.$refs.courseFromRef.validate(valid => {
                if (valid) {
                    const data = this.courseFormData
                    this.addCourse(data).then(res => {
                        if (res.code === 0) {
                            if (data.isPublish == 1) {
                                utils.successMessage('创建成功,已经发布！')
                                this.active = 'published'
                            } else {
                                utils.successMessage('创建成功')
                                this.active = 'unpublished'
                            }
                            this.$router.push({
                                path: '/mine/course/detail',
                                query: {
                                    id: res.id,
                                    active: this.active,
                                    from:'mine-lesson-manager'
                                }
                            })
                        }
                    })
                } else {
                    return false
                }
            })
        },
        // 修改课程
        handleEditSubmit() {
            const ids = []
            this.courseFormData.classList.forEach((val, index) => {
                ids.push(val[1])
            })
            this.courseFormData.classList = ids
            this.$refs.courseFromRef.validate(valid => {
                if (valid) {
                    const data = this.courseFormData
                    //console.log('data:' + data)
                    this.editCourse(data).then(res => {
                        if (res === 'edit success') {
                            if (data.isPublish == 1) {
                                utils.successMessage('修改完成,已经发布！')
                                this.active = 'published'
                            } else {
                                utils.successMessage('修改成功！')
                            }
                            this.$router.push({
                                path: '/mine/course/detail',
                                query: {
                                    id: this.courseId,
                                    active: this.active,
                                    from:'mine-lesson-manager'
                                }
                            })
                        }
                    })
                } else {
                    return false
                }
            })
        },
        //获取添加的课堂信息
        getLessonList() {
            this.getAddLessonList(this.courseFormData.ids).then(res => {
                this.courseData = res
            })
        },
        //移除添加的课堂
        removeAddInfo(id) {
            this.courseFormData.ids.forEach((value, index, array) => {
                //console.log(value)
                if (value == id) {
                    array.splice(value, 1)
                }
            })
            this.getLessonList()
        },
        // 添加金课
        handleAdditionFinish(ids, delids) {
            //console.log('finish', ids, delids)
            this.courseFormData.ids = ids
            this.courseFormData.delids = delids
            this.getLessonList()
        },
        setImageUrl(url) {
            this.courseFormData.coverImage = url
        },
        handleCancel() {
            //console.log(this.courseFormData)
            this.$router.go(-1)
        },
        //图片上传
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
            this.courseFormData.coverImage = res.data.fileUrl
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
    }
}
</script>

<style lang="less">
.avatar-uploader {
    .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .el-upload:hover {
        border-color: #409eff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 262px;
        height: 160px;
        line-height: 160px;
        text-align: center;
        div {
            font-size: 14px;
            line-height: 1;
            margin-top: -60px;
        }
    }
    .avatar {
        width: 262px;
        height: 160px;
        display: block;
    }
}
.course-edit-title {
    .container-1200;
    padding: 12px 0;
}
.course-edit-body {
    background-color: @color-bgc-gray;
    padding-bottom: 20px;
    .select-class {
        width: 300px;
        margin-bottom: 20px;
        .el-select {
            width: 100%;
        }
    }
    .form-title {
        line-height: 40px;
        font-weight: bold;
    }
    .cover-image {
        width: 310px;
        height: 206px;
    }
}
.lesson-item {
}
.lesson-add {
    overflow: hidden;
    .add-lesson {
        float: left;
        width: 270px;
        height: 180px;
        background-color: @color-white;
        margin-top: 20px;
        margin-right: 30px;
        border: 1px solid #c3c3c3;
        position: relative;
        .lessname {
            height: 20px;
            line-height: 30px;
            text-align: center;
        }
        .imgs {
            width: 100%;
            height: 150px;
            overflow: hidden;
            img {
                width: 100%;
            }
        }
        .btn-remove {
            position: absolute;
            right: 0;
            top: 50%;
            left: 0;
            margin: -20px auto 0;
            background-image: url(/icon/Remove.png);
            background-size: 40px 40px;
            z-index: 11;
            width: 40px;
            height: 40px;
            background-repeat: no-repeat;
            display: none;
        }
        .block {
            width: 100%;
            height: 100%;
            background: #000;
            opacity: 0.5;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
            display: none;
        }
    }
    .add-lesson:hover {
        .btn-remove,
        .block {
            display: block;
        }
    }
    .add-lesson-button {
        margin-top: 20px;
        width: 270px;
        margin-right: 30px;
        height: 180px;
        text-align: center;
        border: 1px dashed #333;
        background-color: @color-white;
        float: left;
        cursor: pointer;
        .add-icon {
            margin-top: 30px;
            font-size: 50px;
            color: @color-primary;
        }
        .add-tip {
            margin-top: 30px;
        }
    }
}
.edit-coverImage {
    position: absolute;
    z-index: 11;
    left: 0;
    height: 25px;
    width: 100%;
    text-align: center;
    padding-top: 25px;
    line-height: 25px;
    color: #ffffff;
    margin-top: -25px;
    top: 50%;
    background-image: url(/icon/puls.png);
    background-size: 25px 25px;
    background-position: center top;
    background-repeat: no-repeat;
}
.form-buttons {
    text-align: right;
}
.c-form-item {
    padding-left: 15px;
    border: 1px solid @color-border-gray;
    background-color: @color-white;
}
/* .quill-editor-custom {
  line-height: normal;
  background-color: @color-white;
} */
</style>
