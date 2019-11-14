<template>
  <div class="mobile-player-wrap">
    <MobileNavigator v-if="backPath" :back-path="backPath">资源播放</MobileNavigator>
    <div class="player-header">
      <span class="lesson-name">{{ lessonDetail.name }}</span>
      <span class="lesson-teacher">{{ lessonDetail.teacherName }}</span>
    </div>
    <MobileVideoPlayer
      class="lesson-video-player"
      :url="lessonDetail.videoUrl"
      :time="seekTime"
      @updatetime="handleUpdateTime"
    ></MobileVideoPlayer>
    <SubtitleImage
      v-if="subtitles"
      :subtitles="subtitles"
      :time="subtitleTime"
      @play-with="handlePlayWith"
      class="mobile-subtitle-images"
    ></SubtitleImage>
    <div class="lesson-subtitle-top">
      <el-input
        class="lesson-subtitle-search"
        v-model="subtitleSearchInput"
        placeholder="请输入搜索的内容"
        @keyup.enter.native="handleSubtitleSearch"
        clearable
        @clear="handleSearchClear"
      >
        <el-button slot="append" icon="el-icon-search" @click="handleSubtitleSearch" />
      </el-input>
      <a class="lesson-download-link" :href="lessonDetail.docUrl" target="_blank">
        <i class="el-icon-download"></i>下载文稿
      </a>
    </div>
    <MobileSubtitle
      v-if="subtitles"
      :subtitle-list="subtitles"
      :search-text="subtitleSearchText"
      :time="subtitleTime"
      class="lesson-subtitle-content"
      @play-with="handlePlayWith"
    ></MobileSubtitle>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import MobileNavigator from '@/components/mobile/Mobile-Navigator.vue'
import MobileVideoPlayer from '@/components/mobile/Mobile-Video-Player.vue'
import MobileSubtitle from '@/components/mobile/Mobile-Subtitle.vue'
import SubtitleImage from '@/components/lesson/Subtitle-Image.vue'
import { sortBy } from 'lodash'
export default {
    layout: 'mobile',
    components: {
        MobileNavigator,
        MobileVideoPlayer,
        MobileSubtitle,
        SubtitleImage
    },
    data() {
        return {
            lessonId: '',
            backPath: '',
            subtitleTime: 0,
            subtitleSearchInput: '',
            subtitleSearchText: '',
            lessonDetail: {},
            subtitles: [],
            seekTime: 0
        }
    },
    mounted() {
        const query = this.$route.query
        if (query.id) {
            this.lessonId = query.id
            this.showDetail()
            if (query.bp) {
                this.backPath = query.bp
            }
        }
    },
    methods: {
        ...mapActions('lesson', ['getDetail','getSubtitleTransDetail']),
        showDetail() {
            this.getDetail(this.lessonId).then(res => {
                // console.table(res)
                this.lessonDetail = res
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
        }
    }
}
</script>

<style lang="less">
.mobile-player-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.player-header {
    height: 84px;
    line-height: 84px;
    background-color: #ffffff;
}
.lesson-name {
    padding: 0 38px;
    font-size: 40px;
    color: #000000;
}
.lesson-teacher {
    font-size: 32px;
    color: #747474;
}
.lesson-video-player {
    height: 608px;
}
.lesson-subtitle-top {
    padding: 14px 38px;
    background-color: @color-bgc-gray;
    .lesson-subtitle-search {
        width: 620px;
        font-size: 34px;
        .el-input__inner {
            height: 80px;
        }
    }
    .lesson-download-link {
        float: right;
        display: inline-block;
        line-height: 80px;
        font-size: 34px;
        color: #838383;
        text-decoration: none;
    }
}
.lesson-subtitle-content {
    flex: 1;
}
.mobile-subtitle-images .subtitle-image-item {
    width: 240px;
}
</style>
