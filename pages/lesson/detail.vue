<template>
  <div class="lesson-detail-wrap">
    <div class="lesson-edit-title" v-show="active">
      <el-breadcrumb separator="|">
        <el-breadcrumb-item v-if="active=='unpublished'">未发布</el-breadcrumb-item>
        <el-breadcrumb-item v-else>已发布</el-breadcrumb-item>
        <el-breadcrumb-item>“{{ lessonDetail.name }}”详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="lesson-detail-title">
      <div class="lesson-detail-title-name">{{ lessonDetail.name }}</div>
      <span class="lesson-detail-title-teacher">
        {{
        lessonDetail.teacherName
        }}
      </span>
      <div class="lesson-detail-title-icons">
        <el-radio-group v-model="transLang" size="small" @change="onselectTranslang($event)">
          <el-radio-button
            :label="item.code"
            v-for="item in transLangList"
            :key="item.code"
          >{{item.langName}}</el-radio-button>
        </el-radio-group>

        <QRCode :qrcode-visible="qrcodeVisible" :path="mobilePath" @cancel="qrcodeVisible = false"></QRCode>
        <Icon file="qrcode" :size="21" @click.native="handleQRCode"></Icon>
        <!-- <a :href="lessonDetail.docUrl" target="_blank">
          <Icon file="download" :size="22"></Icon>
        </a>-->

        <div class="icon-download">
          <div class="download-list">
            <a :href="lessonDetail.docUrl" download target="_blank">word-PPT文档</a>
            <a :href="lessonDetail.txtUrl" download target="_blank">下载纯文本</a>
            <a :href="lessonDetail.videoUrl" download target="_blank">下载视频文件</a>
          </div>
        </div>
      </div>
    </div>
    <div class="lesson-detail-video">
      <DPlayer
        class="lesson-detail-video-player"
        :url="lessonDetail.videoUrl"
        :vtt="lessonDetail.vttUrl"
        :time="seekTime"
        @updatetime="handleUpdateTime"
      ></DPlayer>
      <div class="lesson-detail-subtitle">
        <div class="lesson-detail-subtitle-top">
          <el-input
            v-model="subtitleSearchInput"
            placeholder="请输入搜索的内容"
            @keyup.enter.native="handleSubtitleSearch"
            clearable
            @clear="handleSearchClear"
          >
            <el-button slot="append" icon="el-icon-search" @click="handleSubtitleSearch" />
          </el-input>
        </div>
        <SubtitleText
          v-if="subtitles"
          :subtitle-list="subtitles"
          :time="subtitleTime"
          :trans="transLang"
          :search-text="subtitleSearchText"
          class="lesson-detail-subtitle-content"
          @play-with="handlePlayWith"
        ></SubtitleText>
      </div>
    </div>
    <SubtitleImage
      v-if="subtitles"
      :subtitles="subtitles"
      :time="subtitleTime"
      @play-with="handlePlayWith"
    ></SubtitleImage>

    <div class="lesson-detail-bottom">
      <div class="lesson-detail-info">
        <div class="lesson-detail-info-top">
          <span>知识点简介：</span>
          {{ lessonDetail.keyPointDetail }}
        </div>
        <el-divider></el-divider>
        <div>
          <el-col :span="4">
            <span class="lesson-text">上传者：{{ lessonDetail.teacherName }}</span>
          </el-col>
          <el-col :span="4">
            <span class="lesson-text">发布时间：{{ lessonDetail.createTime | filterDate }}</span>
          </el-col>
          <el-col :span="8">
            <span class="lesson-text">创建时间：{{ lessonDetail.createTime | filterDate }}</span>
          </el-col>
          <el-col :span="8">
            <span class="lesson-text">浏览量：{{ lessonDetail.broadcast }}</span>
          </el-col>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import utils from '@/scripts/utils.js'
import DPlayer from '@/components/lesson/DPlayer.vue'
import SubtitleText from '@/components/lesson/Subtitle-Text.vue'
import SubtitleImage from '@/components/lesson/Subtitle-Image.vue'
import CommentList from '@/components/public/Comment-List.vue'
import Icon from '@/components/public/Icon.vue'
import Avatar from '@/components/public/Avatar.vue'
import QRCode from '@/components/public/QRCode.vue'
import { hasToken } from '@/scripts/mixin'
import { sortBy } from 'lodash'
export default {
    layout: 'aijinke',
    components: {
        SubtitleText,
        DPlayer,
        SubtitleImage,
        CommentList,
        Icon,
        Avatar,
        QRCode
    },
    mixins: [hasToken],
    data() {
        return {
            active: false,
            lessonId: '',
            lessonDetail: {
                name: ''
            },
            transLangList: [],
            subtitles: [],
            seekTime: 0,
            recommentList: [],
            transLang: 'ch',
            langCode: '',
            videoUrl: '',
            subtitleSearchInput: '',
            subtitleSearchText: '',
            subtitleTime: 0,
            commentNewText: '',
            qrcodeVisible: false,
            mobilePath: ''
        }
    },
    mounted() {
        this.init()
    },
    watch: {
        $route(to, from) {
            this.$router.go(0)
        }
    },
    methods: {
        ...mapActions('lesson', [
            'getDetail',
            'setLike',
            'showRecommentList',
            'getSubtitleTransDetail',
            'publishLesson'
        ]),
        init() {
            const query = this.$route.query
            this.active = query.active
            if (query.id) {
                this.lessonId = query.id
                this.showDetail()
                this.getRecommentList()
                // 二维码路径
                const path = this.$router.resolve({
                    path: '/mobile/player',
                    query: { id: this.lessonId }
                }).href
                //const host = '192.168.0.7:8080'
                // const host = '106.13.119.77:9999'
                const host = location.host
                const protocol = location.protocol + '//'
                this.mobilePath = protocol + host + path
            }
        },
        showDetail() {
            this.getDetail(this.lessonId).then(res => {
                //console.table(res)
                this.lessonDetail = res
                //console.log(res)
                this.transLangList = res.translang
                this.transLang = this.transLangList[0].code

                this.onselectTranslang(this.transLang)
            })
        },
        onselectTranslang(event) {
            const option = {
                lessonId: this.lessonId,
                code: event
            }
            //console.log("event:"+event)
            this.getSubtitleTransDetail(option).then(res => {
                const sortRes = sortBy(res, ['picIndex'])
                //console.log('字幕:', sortRes)
                this.subtitles = sortRes

                for (let i in this.transLangList) {
                    let item = this.transLangList[i]
                    if (item.code == this.transLang) {
                        this.lessonDetail.vttUrl = item.vttUrl
                        break
                    }
                }
            })
        },

        getRecommentList() {
            this.showRecommentList(this.lessonId).then(res => {
                // console.table(res)
                this.recommentList = res.list
            })
        },
        // 字幕搜索
        handleSubtitleSearch(e) {
            this.subtitleSearchText = this.subtitleSearchInput
        },
        // 搜索清空
        handleSearchClear() {
            this.subtitleSearchText = ''
        },
        // 播放时间
        handleUpdateTime(t) {
            this.subtitleTime = t
        },
        // 设定播放时间
        handlePlayWith(t) {
            // console.log('t', t)
            this.seekTime = t / 1000
        },
        // 二维码
        handleQRCode() {
            this.qrcodeVisible = true
        },
        // 发布金课按钮
        handlePublish() {
            // console.log(this.multipleSelection)
            const ids = []
            ids.push(this.lessonId)
            this.publishLesson(ids).then(res => {
                if (res === 'publish success') {
                    utils.successMessage('发布成功！')
                    this.handleBack()
                }
            })
        },
        // 返回上一级
        handleBack() {
            history.back(-1)
        }
    }
}
</script>

<style lang="less">
.lesson-detail-wrap {
    .lesson-edit-title {
        padding: 12px 0;
        a {
            font-weight: bold;
            color: #000;
        }
        a:hover {
            color: #309d7c;
        }
    }
    button:hover {
        border: 1px solid #309d7c;
        background-color: #ddf3f0;
        color: #309d7c;
    }
    .container-1200;
    .lesson-detail-title {
        margin-top: 10px;
        height: 55px;
        .bdr;
        .lesson-detail-title-name {
            display: inline-block;
            max-width: 950px;
            padding-left: 20px;
            line-height: 55px;
            font-size: 18px;
            vertical-align: middle;
            white-space: nowrap;
            overflow: hidden;
        }
        .lesson-detail-title-teacher {
            margin-left: 25px;
            font-size: 14px;
            color: @color-gray1;
        }
        .lesson-detail-title-trans {
            vertical-align: top;
            white-space: nowrap;
            overflow: hidden;
            width: 150px;
            margin-bottom: 10px;
            margin-right: 70px;
        }
        .lesson-detail-title-icons {
            float: right;
            margin-top: 15px;
            .icon {
                margin-right: 10px;
            }
            .icon-download {
                float: right;
                margin-right: 10px;
                width: 23px;
                height: 21px;
                background-image: url(/icon/download.png);
                position: relative;

                .download-list {
                    position: absolute;
                    top: 21px;
                    right: 0px;
                    width: 100px;
                    font-size: 12px;
                    z-index: 11;
                    background: #fff;
                    padding: 5px;
                    display: none;
                    a {
                        display: block;
                        text-align: right;
                        line-height: 3;
                        color: #000;
                    }
                }
            }
            .icon-download:hover {
                .download-list {
                    display: block;
                }
            }
        }
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
    .lesson-detail-bottom {
        margin-top: 15px;
        .lesson-detail-info {
            margin-bottom: 20px;
            padding: 15px;
            background-color: @color-bgc-gray;
            height: auto;
            overflow: hidden;
            .lesson-detail-info-top {
                line-height: 40px;
                font-size: 17px;
                .lesson-title {
                    color: @color-primary;
                }
                .lesson-text {
                    // display: none;
                    font-size: 14px;
                }
            }
            .lesson-like {
                display: inline-block;
                width: 50px;
                font-size: 12px;
            }
            .lesson-data {
                float: right;
            }
            .lesson-brief {
                padding-left: 110px;
                height: 42px;
                line-height: 22px;
                font-size: 14px;
                position: relative;
                span {
                    position: absolute;
                    left: 0;
                }
            }
        }
    }
    .lesson-detail-comments {
        .lesson-detail-comments-title {
            font-size: 17px;
            span {
                margin-left: 22px;
                font-size: 14px;
            }
        }
        .lesson-detail-comments-publish {
            margin-top: 15px;
            padding-left: 65px;
            position: relative;
            .comments-publish-avatar {
                position: absolute;
                top: 0;
                left: 0;
            }
            .comments-publish-input textarea {
                background-color: @color-bgc-gray;
            }
            .comments-publish-button {
                margin-top: 10px;
                text-align: right;
            }
        }
    }
    .lesson-detail-recommend {
        padding: 0 10px;
        .recommend-title {
            font-size: 18px;
        }
        .recommend-list {
            margin-top: 15px;
        }
        .recommend-item {
            margin-bottom: 15px;
        }
        .recommend-item-image {
            margin-right: 5px;
            width: 140px;
            height: 90px;
            vertical-align: top;
        }
        .recommend-item-info {
            display: inline-block;
            width: 170px;
            height: 90px;
        }
        .recommend-item-name {
            height: 75px;
            line-height: 25px;
            overflow: hidden;
            font-size: 16px;
        }
        .recommend-item-date {
            font-size: 12px;
        }
        .result-link {
            text-decoration: none;
            color: @color-gray1;
        }
    }
}
</style>
