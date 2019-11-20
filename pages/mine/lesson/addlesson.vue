<template>
    <div class="lesson-edit-wrap">
        <MineTop active="lesson"></MineTop>
        <div class="lesson-edit-title">
            <el-breadcrumb separator="|">
                <el-breadcrumb-item>创建课堂资源</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="lesson-edit-body">
            <div class="container-1200" v-show="centerDialogVisible">
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
                                <el-input-number
                                    v-model="lessonFormData.chapter"
                                    size="small"
                                    :min="0"
                                ></el-input-number>章 - 第
                                <el-input-number
                                    v-model="lessonFormData.section"
                                    size="small"
                                    :min="0"
                                ></el-input-number>节
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
                                :action="uploadimgUrl"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                                :on-remove="handleRemove"
                            >
                                <img
                                    v-if="lessonFormData.coverImage"
                                    :src="lessonFormData.coverImage"
                                    class="avatar"
                                />

                                <i
                                    v-else
                                    v-loading="loadingimg"
                                    class="el-icon-plus avatar-uploader-icon"
                                ></i>
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
                        <el-form-item v-if="isNew" label="视频上传：" prop="videoUrl">
                            <el-checkbox-group v-model="lessonFormData.videoUrl"></el-checkbox-group>
                            <el-col :span="6">
                                <el-upload
                                    class="avatar-uploader"
                                    :show-file-list="true"
                                    :action="uploadvideoUrl"
                                    :file-list="fileList"
                                    :on-success="handleAvatarSuccessVideo"
                                    :before-upload="uploadBefore"
                                >
                                    <el-button size="small" type="primary" :loading="loading">
                                        选择视频
                                        <slot />
                                    </el-button>
                                </el-upload>
                            </el-col>
                        </el-form-item>

                        <el-row :gutter="20">
                            <el-col :span="10">
                                <el-form-item label="视频字幕识别语言" prop="defaultLangcode">
                                    <el-select
                                        v-model="lessonFormData.defaultLangcode"
                                        placeholder="请选择视频字幕识别语言"
                                    >
                                        <el-option label="中文" value="zh"></el-option>
                                        <el-option label="英文" value="en"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="视频字幕翻译语言：" prop="transLangList">
                                    <el-select
                                        v-model="lessonFormData.transLangList"
                                        placeholder="请选择视频字幕语言"
                                        @change="getSelectLang($event)"
                                    >
                                        <el-option
                                            :label="item.langName"
                                            :value="item.id"
                                            v-for="(item,index) in lang"
                                            :key="index"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="课堂发布：" prop="publish">
                            <div class="c-form-item">
                                <el-checkbox-group v-model="lessonFormData.publish">
                                    <el-checkbox label="教学班级" @change="setPublish($event)"></el-checkbox>
                                    <el-checkbox label="课堂资源库" @change="setPublish2($event)"></el-checkbox>
                                </el-checkbox-group>

                                <div class="select-class" v-show="selectClass">
                                    <el-form-item prop="classList">
                                        <el-cascader
                                            :options="classList"
                                            :props="{value:'id', label:'name',children:'classList',multiple:true}"
                                            :show-all-levels="false"
                                            v-model="lessonFormData.classList"
                                        ></el-cascader>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-form-item>

                        <el-form-item class="form-buttons" size="medium">
                            <el-button @click="handleCancel">取消</el-button>
                            <el-button
                                v-if="isNew"
                                type="primary"
                                @click="handleAddSubmit('add')"
                            >确认创建</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div
                class="success"
                v-show="!centerDialogVisible"
            >创建资源进行中，预计2小时生成，生成的资源自动保存在“我的资源—课堂资源—已发布”列表里</div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import config from "@/scripts/config.js";
import http from "@/scripts/http.js";
import MineTop from "@/components/mine/Mine-Top.vue";
import VideoSubtitle from "@/components/lesson/Video-Subtitle.vue";
import DPlayer from "@/components/lesson/DPlayer.vue";
import UploadFile from "@/components/form/Upload-File.vue";
import InputCover from "@/components/form/Input-Cover.vue";
import utils from "@/scripts/utils.js";
import { hasToken } from "@/scripts/mixin";
const cityOptions = ["教学班级", "课堂资源库"];
export default {
    layout: "aijinke",
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
            fileuploadURL: config.fileuploadUrl,
            uploadImage: "",
            selectClass: false,
            fileList: [],
            uploadedFiles: config.uploadedFiles,
            loading: false,
            loadingimg: false,
            uploadimgUrl: "",
            uploadvideoUrl: "",
            publishs: cityOptions,
            lang: [],
            proList: [],
            classList: [],
            multipleSelection: [],
            centerDialogVisible: true,
            checkboxi: 0,
            schooli: 0,
            lessonFormData: {
                name: "",
                courseName: "",
                chapter: 0,
                section: 0,
                coverImage: "",
                point: "",
                keyPointDetail: "",
                professionName: "",
                professionId: "",
                videoUrl: "",
                docUrl: "",
                publish: [],
                proList: [],
                classList: [],
                transLangList: "",
                defaultLangcode: "",
                isPublished: 1,
                uploadimgUrl: "",
                schoolOpened: 0
            },
            captchaPath: "",
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入课堂名称",
                        trigger: "blur"
                    }
                ],
                coverImage: [
                    {
                        required: true,
                        message: "请上传一张封面图",
                        trigger: "change"
                    }
                ],
                point: [
                    { required: true, message: "请输入知识点", trigger: "blur" }
                ],
                professionId: [
                    {
                        required: true,
                        message: "请选择所属专业",
                        trigger: "change"
                    }
                ],
                keyPointDetail: [
                    {
                        required: true,
                        message: "请输入知识点内容简介",
                        trigger: "blur"
                    }
                ],
                videoUrl: [
                    { required: true, message: "请上传视频", trigger: "change" }
                ],
                defaultLangcode: [
                    {
                        required: true,
                        message: "请选择字幕识别语言",
                        trigger: "change"
                    }
                ],
                transLangList: [
                    {
                        required: true,
                        message: "请选择字幕翻译语言",
                        trigger: "change"
                    }
                ],
                transLangList: [
                    {
                        required: true,
                        message: "请选择字幕语言",
                        trigger: "change"
                    }
                ],
                publish: [
                    {
                        type: "array",
                        required: true,
                        message: "请至少选择一个",
                        trigger: "change"
                    }
                ],
                classList: []
            },
            lessonId: "",
            lessonDetail: {},
            subtitleTime: 0,
            subtitleSearchText: "",
            isNew: true,
            active: ""
        };
    },
    mounted() {
        this.TransList();
        this.getProList().then(res => {
            this.proList = res;
        });
        this.getClasslist().then(res => {
            let k = 0;
            for (let i in res) {
                let tmp = res[i];

                let cl = {
                    id: k++ + "",
                    name: tmp.yearName,
                    classList: tmp.classList
                };
                this.classList.push(cl);
            }
        });
        this.uploadimgUrl = http.adornUrl(
            "/sys/fileinfo/uploadimage?token=" + this.$cookie.get("token")
        );
        this.uploadvideoUrl = http.adornUrl(
            "/sys/fileinfo/uploadvideo?token=" + this.$cookie.get("token")
        );
    },
    methods: {
        ...mapActions("lesson", [
            "addLesson",
            "getTransLang",
            "getProList",
            "getClasslist"
        ]),
        // 字幕语言列表
        TransList() {
            this.getTransLang().then(res => {
                this.lang = res;
            });
        },
        handleAddSubmit(e) {
            this.$refs.lessonFromRef.validate(valid => {
                if (valid) {
                    this.createName();
                } else {
                    return false;
                }
            });
        },
        createName() {
            if (
                this.lessonFormData.courseName == "" ||
                this.lessonFormData.courseName == null
            ) {
                this.lessonFormData.name = this.lessonFormData.point;
            } else if (this.lessonFormData.chapter == 0) {
                this.lessonFormData.name =
                    this.lessonFormData.courseName +
                    ":" +
                    this.lessonFormData.point;
            } else if (
                this.lessonFormData.chapter > 0 &&
                this.lessonFormData.section == 0
            ) {
                this.lessonFormData.name =
                    this.lessonFormData.courseName +
                    ":" +
                    "第" +
                    this.lessonFormData.chapter +
                    "章 " +
                    this.lessonFormData.point;
            } else {
                this.lessonFormData.name =
                    this.lessonFormData.courseName +
                    ":" +
                    "第" +
                    this.lessonFormData.chapter +
                    "章第" +
                    this.lessonFormData.section +
                    "节 " +
                    this.lessonFormData.point;
            }
            this.sendAddData();
        },
        // 发送创建数据
        sendAddData() {
            // console.log(this.lessonFormData.name)
            this.addLesson(this.lessonFormData).then(res => {
                if (res === "add success") {
                    utils.successMessage("创建成功！");
                    this.centerDialogVisible = false;
                }
            });
        },
        handleCancel() {
            this.goBack();
        },
        //专业列表数据改变
        getProfessName(id) {
            this.proList.find(item => {
                if (item.pid === id) {
                    this.lessonFormData.professionName = item.name;
                }
            });
        },
        //字幕语言选择
        getSelectLang(e) {
            this.lessonFormData.transLangList = e;
            //console.log(e)
        },
        //班级选择
        getClassList(e) {
            this.lessonFormData.classList = e;
        },
        goBack() {
            this.$router.push({
                path: "/mine/lesson/manager",
                query: {
                    active: this.active
                }
            });
        },
        //发布到
        setPublish2(e) {
            if (e) {
                this.lessonFormData.schoolOpened = 1;
            } else {
                this.lessonFormData.schoolOpened = 0;
            }
        },

        setPublish(e) {
            if (e) {
                this.selectClass = true;
                this.rules.classList = [
                    {
                        required: true,
                        message: "请至少选择一个班级",
                        trigger: "change"
                    }
                ];
            } else {
                this.selectClass = false;
                this.rules.classList = [];
            }
        },
        // 图片<
        beforeAvatarUpload(file) {
            //console.log('before updoad')
            const isJPG = file.type === "image/jpeg" || "image/png";
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isJPG) {
                this.$message.error("上传封面图片只能是 JPG或者PNG 格式!");
            }
            if (!isLt5M) {
                this.$message.error("上传封面图片大小不能超过 5MB!");
            }
            const checked = isJPG && isLt5M;
            if (checked) {
                this.loadingimg = true;
            }
            return checked;
        },
        handleAvatarProgress() {
            console.log("progress");
        },
        handleAvatarSuccess(res, file) {
            this.loading = false;
            this.lessonFormData.coverImage = res.data.fileUrl;
        },
        //视频上传
        uploadBefore(file) {
            const isLt2G = file.size / 1024 / 1024 / 1024 < 2;
            if (
                [
                    "video/mp4",
                    "video/ogg",
                    "video/flv",
                    "video/avi",
                    "video/wmv",
                    "video/rmvb"
                ].indexOf(file.type) == -1
            ) {
                this.$message.error("请上传正确的视频格式");
                return false;
            }
            if (!isLt2G) {
                this.$message.error("上传视频大小不能超过2G哦!");
                return false;
            }
            return isLt2G;
        },
        handleAvatarSuccessVideo(res, file) {
            this.lessonFormData.videoUrl = res.data.fileUrl;
            this.$message({
                message: "上传成功",
                type: "success"
            });
        },
        handleAvatarError() {
            this.loading = false;
            console.log("error");
        },
        handleRemove(file, fileList) {
            // ajax
            this.$http({
                url: http.adornUrl("/sys/fileinfo/removebyid"),
                method: "get",
                params: this.$http.adornParams({
                    fileId: file.fileId
                })
            })
                .then(({ data }) => {})
                .catch(err => {
                    console.log(err);
                });
        }

        // 图片>
    }
};
</script>

<style lang="less">
.lesson-edit-title {
    .container-1200;
    padding: 12px 0;
}
.lesson-edit-body {
    background-color: @color-bgc-gray;
    overflow: hidden;
    .success {
        width: 100%;
        height: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
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
.c-form-item {
    padding-left: 15px;
    border: 1px solid @color-border-gray;
    background-color: @color-white;
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
            padding: 10px 35px;
            background-color: @color-bgc-gray;
        }
        .lesson-detail-subtitle-content {
            height: 420px;
        }
    }
}
</style>
