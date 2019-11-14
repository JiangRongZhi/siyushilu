<template>
  <div ref="subtitleRef" class="library-lesson-subtitle-content">
    <div v-if="subtitleList.length == 0" class="no-subtitle">字幕未找到！</div>
    <div v-for="(item, index) in subtitleList" :key="index">
      <span :ref="item.id"></span>
      <SubtitleItem
        :index="index + 1"
        :total="subtitleList.length"
        :text="trans=='1' ? item.content : item.transContent"
        :is-active="currentSubtitle.id === item.id"
        :subtitle-id="item.id"
        :can-edit="canEdit"
      ></SubtitleItem>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { sortBy, find } from 'lodash'
import SubtitleItem from '@/components/lesson/Subtitle-Item.vue'
export default {
    components: {
        SubtitleItem
    },
    props: {
        time: {
            type: Number,
            default: 0
        },
        id: {
            type: String,
            default: ''
        },
        canEdit: {
            type: Boolean,
            default: false
        },
        trans: {
            type: String,
            default: '1'
        }
    },
    data() {
        return {
            subtitleList: [],
            currentSubtitle: {}
        }
    },
    watch: {
        time: function(val) {
            this.scrollOnTime(val)
        }
    },
    mounted() {
        // console.log(this.id)
        this.showSubtitle(this.id)
    },
    methods: {
        ...mapActions('lesson', ['getSubtitle']),
        showSubtitle(id) {
            this.getSubtitle(id).then(res => {
                const sortRes = sortBy(res, ['playStartTime'])
                // console.log('字幕:', res, sortRes)
                this.subtitleList = sortRes
            })
        },
        scrollOnTime(t) {
            let currentSubtitle = find(this.subtitleList, v => {
                let time = t * 1000
                return time > v.playStartTime && time < v.playEndTime
            })
            if (
                (currentSubtitle && currentSubtitle.id) !=
                this.currentSubtitle.id
            ) {
                this.setCurrentTop(currentSubtitle)
            }
        },
        setCurrentTop(subtitle) {
            subtitle = subtitle || {}
            this.currentSubtitle = subtitle
            if (subtitle.id) {
                const subtitleContent = this.$refs.subtitleRef
                const subtitleItem = this.$refs[subtitle.id]
                if (subtitleItem) {
                    subtitleContent.scrollTop =
                        subtitleItem[0].offsetTop - subtitleContent.offsetTop
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.library-lesson-subtitle-content {
    overflow: auto;
    .no-subtitle {
        margin-top: 10px;
        text-align: center;
    }
}
</style>
