<template>
  <div class="lesson-edit-wrap">
    <MineTop active="lesson"></MineTop>
    <div class="lesson-edit-title">
      <el-breadcrumb separator="|">
        <el-breadcrumb-item v-if="active=='published'">已发布</el-breadcrumb-item>
        <el-breadcrumb-item v-else>未发布</el-breadcrumb-item>
        <el-breadcrumb-item v-if="active=='published'">“{{lessonFormData.name}}”编辑</el-breadcrumb-item>
        <el-breadcrumb-item v-else>“{{lessonFormData.name}}”发布</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="lesson-edit-body">
      <div class="container-1200">
        <div class="lesson-detail-video">
          <DPlayer
            class="lesson-detail-video-player"
            :url="lessonDetail.videoUrl"
            @updatetime="handleUpdateTime"
          ></DPlayer>
          <div class="lesson-detail-subtitle">
            <div class="lesson-detail-subtitle-top">
              <el-input
                v-model="subtitleSearchText"
                placeholder="请输入搜索的内容"
                @keyup.enter.native="handleSubtitleSearch"
              >
                <el-button slot="append" icon="el-icon-search" @click="handleSubtitleSearch" />
              </el-input>
              <!-- <el-button class="el-icon-edit" @click="isedit=true">编辑</el-button> -->
            </div>
            <VideoSubtitle
              v-if="lessonId"
              :id="lessonId"
              :time="subtitleTime"
              :can-edit="true"
              :is-edit="isedit"
              class="lesson-detail-subtitle-content"
            ></VideoSubtitle>
          </div>
        </div>

        <div class="edit-lesson-form">
          <el-form
            ref="lessonFromRef"
            label-position="right"
            label-width="180px"
            :rules="rules"
            :model="lessonFormData"
          >
            <el-form-item prop="point" label="课堂资源名称：" class="bgb">
              <el-col :span="7">
                <el-input v-model="lessonFormData.courseName" placeholder="课程名称"></el-input>
              </el-col>
              <el-col :offset="1" :span="9">
                第
                <el-input-number v-model="lessonFormData.chapter" size="small" :min="0"></el-input-number>章 - 第
                <el-input-number v-model="lessonFormData.section" size="small" :min="0"></el-input-number>节
              </el-col>
              <el-col :span="7">
                <el-input v-model="lessonFormData.point" placeholder="课堂知识点"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item prop="coverImage" label="课堂封面：">
              <el-checkbox-group v-model="lessonFormData.coverImage"></el-checkbox-group>
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                :action="uploadUrl"
                :on-success="handleAvatarSuccess"
                :before-upload="uploadBefore"
                :on-remove="handleRemove"
              >
                <img
                  v-if="lessonFormData.coverImage"
                  :src="lessonFormData.coverImage"
                  class="avatar"
                />
                <i v-else v-loading="loading" class="el-icon-plus avatar-uploader-icon"></i>
                <div v-if="lessonFormData.coverImage" class="edit-coverImage">重新上传</div>
              </el-upload>
            </el-form-item>

            <el-form-item prop="keyPointDetail" label="知识点简介：">
              <el-input
                v-model="lessonFormData.keyPointDetail"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 6 }"
              ></el-input>
            </el-form-item>

            <el-form-item label="课堂发布：" prop="publish">
              <div class="c-form-item">
                <el-checkbox-group v-model="lessonFormData.publish">
                  <el-checkbox label="教学班级" @change="setPublish($event)"></el-checkbox>
                  <el-checkbox label="课堂资源库" @change="setPublish2($event)"></el-checkbox>
                </el-checkbox-group>

                <div class="select-class" v-show="selectClass">
                  <el-form-item prop="classList">
                    <el-cascader
                      v-model="lessonFormData.classList"
                      :options="classList"
                      :props="{value:'id', label:'name',children:'classList',multiple:true}"
                      :show-all-levels="false"
                    ></el-cascader>
                  </el-form-item>
                </div>
              </div>
            </el-form-item>

            <el-form-item class="form-buttons" size="medium">
              <el-button @click="handleCancel">取消</el-button>
              <el-button type="primary" v-if="active=='published'" @click="handleAddSubmit">确认修改</el-button>
              <el-button type="primary" v-else @click="handlePublish">发布课堂</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import config from '@/scripts/config.js'
import http from '@/scripts/http.js'
import MineTop from '@/components/mine/Mine-Top.vue'
import VideoSubtitle from '@/components/lesson/Video-Subtitle.vue'
import DPlayer from '@/components/lesson/DPlayer.vue'
import UploadFile from '@/components/form/Upload-File.vue'
import InputCover from '@/components/form/Input-Cover.vue'
import utils from '@/scripts/utils.js'
import { hasToken } from '@/scripts/mixin'
const cityOptions = ['教学班级', '课堂资源库']
export default {
    layout: 'aijinke',
    components: {
        MineTop,
        VideoSubtitle,
        DPlayer,
        UploadFile,
        InputCover
    },
    mixins: [hasToken],
    data() {
        return {
            isedit: false,
            fileuploadURL: config.fileuploadUrl,
            uploadImage: '',
            uploadedFiles: config.uploadedFiles,
            loading: false,
            publishs: cityOptions,
            selectClass: false,
            lessonChecked: false,
            lang: [],
            proList: [],
            classList: [],
            multipleSelection: [],
            checkboxi: 0,
            schooli: 0,
            uploadUrl: '',
            lang: {
                name: '',
                code: ''
            },
            lessonFormData: {
                name: '',
                courseName: '',
                chapter: 0,
                section: 0,
                coverImage: '',
                point: '',
                keyPointDetail: '',
                professionName: '',
                professionId: '',
                videoUrl: '',
                docUrl: '',
                publish: [],
                proList: [],
                classList: [],
                transLangList: [],
                defaultLangcode: 'zh',
                isPublished: 0,
                uploadUrl: '',
                schoolOpened: 0
            },
            captchaPath: '',
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入课堂名称',
                        trigger: 'blur'
                    }
                ],
                coverImage: [
                    {
                        required: true,
                        message: '请上传一张封面图',
                        trigger: 'change'
                    }
                ],
                point: [
                    { required: true, message: '请输入知识点', trigger: 'blur' }
                ],
                professionId: [
                    {
                        required: true,
                        message: '请选择所属专业',
                        trigger: 'change'
                    }
                ],
                defaultLangcode: [
                    {
                        required: true,
                        message: '请选择字幕识别语言',
                        trigger: 'change'
                    }
                ],
                keyPointDetail: [
                    {
                        required: true,
                        message: '请输入知识点内容简介',
                        trigger: 'blur'
                    }
                ],
                videoUrl: [
                    { required: true, message: '请上传视频', trigger: 'change' }
                ],
                transLangList: [
                    {
                        required: true,
                        message: '请选择字幕语言',
                        trigger: 'change'
                    }
                ],
                publish: [
                    {
                        type: 'array',
                        required: true,
                        message: '请至少选择一个',
                        trigger: 'change'
                    }
                ],
                classList: []
            },
            lessonId: '',
            lessonDetail: {},
            subtitleTime: 0,
            subtitleSearchText: '',
            active: ''
        }
    },
    mounted() {
        const query = this.$route.query
        this.lessonId = query.id
        this.active = query.active
        this.uploadUrl = http.adornUrl(
            '/sys/fileinfo/uploadimage?token=' + this.$cookie.get('token')
        )

        this.TransList()
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
        this.showDetail(query.id)
    },
    methods: {
        ...mapActions('lesson', [
            'addLesson',
            'getDetail',
            'editLesson',
            'getTransLang',
            'getProList',
            'publishLesson',
            'getClasslist'
        ]),
        showDetail(id) {
            this.getDetail(id).then(res => {
                //console.log(res)
                this.lessonDetail = res
                this.lessonFormData.id = res.id
                this.lessonFormData.name = res.name
                this.lessonFormData.courseName = res.courseName
                if (res.chapter) {
                    this.lessonFormData.chapter = res.chapter
                }
                if (res.section) {
                    this.lessonFormData.section = res.section
                }
                if (this.active == 'published') {
                    this.lessonFormData.point = res.keyPoint
                }

                this.lessonFormData.keyPointDetail = res.keyPointDetail
                this.lessonFormData.professionId = res.professionId
                this.lessonFormData.professionName = res.professionName
                this.lessonFormData.isPublished = res.isPublished
                this.lessonFormData.defaultLangcode = res.defaultLangcode
                this.lessonFormData.schoolOpened = res.schoolOpened
                if (res.schoolOpened == 1) {
                    this.lessonFormData.publish.push('课堂资源库')
                }
                if (res.translang.length > 1) {
                    this.lessonFormData.transLangList =
                        res.translang[1].langName
                    this.lang.name = res.translang[1].langName
                    this.lang.code = res.translang[1].code
                }
                if (res.classlist) {
                    this.lessonFormData.classList = res.classlist
                    this.lessonFormData.publish.push('教学班级')
                    this.selectClass = true

                    //console.log(res.classlist)
                    let cls = []

                    let t = 0
                    for (let i in res.classlist) {
                        let tmp = res.classlist[i]
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
                    this.lessonFormData.classList = cls
                }
                if (res.videoUrl) {
                    this.lessonFormData.videoUrl = res.videoUrl
                } else {
                    this.lessonFormData.videoUrl = ''
                }

                if (res.docUrl) {
                    this.lessonFormData.docUrl = res.docUrl
                } else {
                    this.lessonFormData.docUrl = ''
                }
                if (res.coverImage) {
                    this.lessonFormData.coverImage = res.coverImage
                    //console.log(this.lessonFormData.coverImage)
                } else {
                    this.lessonFormData.coverImage = ''
                }
            })
        },
        // 字幕搜索
        handleSubtitleSearch() {
            console.log(this.subtitleSearchText)
        },
        // 字幕语言
        TransList() {
            this.getTransLang().then(res => {
                this.lang = res
            })
        },
        // 播放时间
        handleUpdateTime(t) {
            this.subtitleTime = t
        },

        setPublish2(e) {
            if (e) {
                this.lessonFormData.schoolOpened = 1
            } else {
                this.lessonFormData.schoolOpened = 0
            }
        },

        setPublish(e) {
            if (e) {
                this.selectClass = true
                this.rules.classList = [
                    {
                        required: true,
                        message: '请至少选择一个班级',
                        trigger: 'change'
                    }
                ]
            } else {
                this.selectClass = false
                this.rules.classList = []
            }
        },
        handleAddSubmit(e) {
            this.$refs.lessonFromRef.validate(valid => {
                if (valid) {
                    this.sendEditData()
                } else {
                    return false
                }
            })
        },
        // 发送创建数据
        sendAddData() {
            this.addLesson(this.lessonFormData).then(res => {
                if (res === 'add success') {
                    utils.successMessage('创建成功！')
                    this.goBack()
                }
            })
        },
        // 发送编辑数据
        sendEditData() {
            this.lessonFormData.name =
                this.lessonFormData.courseName +
                ':' +
                '第' +
                this.lessonFormData.chapter +
                '章第' +
                this.lessonFormData.section +
                '节-' +
                this.lessonFormData.point
            if (this.lessonFormData.transLangList == this.lang.name) {
                this.lessonFormData.transLangList = this.lang.code
            }
            this.editLesson(this.lessonFormData).then(res => {
                if (res === 'edit success') {
                    utils.successMessage('修改成功！')
                    this.$router.push({
                        path: '/lesson/detail',
                        query: {
                            id: this.lessonFormData.id,
                            active: this.active,
                            from: 'mine-lesson-manager'
                        }
                    })
                }
            })
        },

        //发布金课
        handlePublish() {
            this.lessonFormData.name =
                this.lessonFormData.courseName +
                ':' +
                '第' +
                this.lessonFormData.chapter +
                '章第' +
                this.lessonFormData.section +
                '节-' +
                this.lessonFormData.point
            if (this.lessonFormData.transLangList == this.lang.name) {
                this.lessonFormData.transLangList = this.lang.code
            }
            const ids = []
            this.$refs.lessonFromRef.validate(valid => {
                if (valid) {
                    this.editLesson(this.lessonFormData).then(res => {
                        if (res === 'edit success') {
                            ids.push(this.lessonId)
                            this.publishLesson(ids).then(res => {
                                if (res === 'publish success') {
                                    utils.successMessage('发布成功！')
                                    this.$router.push({
                                        path: '/lesson/detail',
                                        query: {
                                            id: this.lessonFormData.id,
                                            active: 'published',
                                            from: 'mine-lesson-manager'
                                        }
                                    })
                                }
                            })
                        }
                    })
                } else {
                    return false
                }
            })
        },
        handleCancel() {
            this.goBack()
        },
        //专业列表数据改变
        getProfessName(id) {
            this.proList.find(item => {
                if (item.pid === id) {
                    this.lessonFormData.professionName = item.name
                }
            })
        },
        //字幕语言选择
        getSelectLang(e) {
            this.lessonFormData.transLangList = e
            //console.log(e)
        },
        goBack() {
            this.$router.push({
                path: '/mine/lesson/manager',
                query: {
                    active: this.active
                }
            })
        },
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
            this.lessonFormData.coverImage = res.data.fileUrl
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

<style lang="less">
.lesson-edit-title {
    .container-1200;
    padding: 12px 0;
}
.lesson-edit-body {
    background-color: @color-bgc-gray;
    overflow: hidden;
    .form-title {
        line-height: 40px;
        font-weight: bold;
    }
}

.edit-lesson-form {
    padding-bottom: 30px;
    padding-top: 10px;
    .bgb {
        background: #fff;
        .el-form-item__error {
            text-align: right;
        }
        label {
            background: #f4f4f4;
        }
    }
    .select-class {
        width: 300px;
        margin-bottom: 20px;
        .el-cascader {
            width: 300px;
        }
    }
    .el-select {
        width: 100%;
    }
    .form-buttons {
        margin-bottom: 0;
        text-align: right;
    }
    .el-button--primary {
        border: 1px solid #309d7c;
        background-color: #ddf3f0;
        color: #309d7c;
    }
    button:hover {
        color: #fff;
        background-color: #309d7c;
        border-color: #309d7c;
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
.c-form-item {
    padding-left: 15px;
    border: 1px solid @color-border-gray;
    background-color: @color-white;
}
.lesson-detail-video {
    margin-top: 15px;
    padding-bottom: 15px;
    height: 480px;
    .lesson-detail-video-player {
        float: left;
        width: 800px;
        height: 480px;
    }
    .lesson-detail-subtitle {
        float: right;
        width: 380px;
        height: 480px;
        border: 1px solid @color-border-gray;
        .lesson-detail-subtitle-top {
            padding: 10px;
            background-color: @color-bgc-gray;
            display: flex;
            justify-content: space-between;
            .el-input {
                margin-right: 10px;
            }
        }
        .lesson-detail-subtitle-content {
            height: 420px;
        }
    }
}
</style>
