<template>
  <div ref="dplayer"></div>
</template>

<script>
import 'dplayer/dist/DPlayer.min.css'
//import DPlayer from 'dplayer'
import utils from '@/scripts/utils.js'
const DPlayer = process.client ? require('dplayer') : {}
/*
const options = {
  type: Object,
  default: function() {
    return {
      autoplay: !1,
      theme: '#FADFA3',
      loop: !0,
      lang: 'zh-cn',
      hotkey: !0,
      preload: 'auto',
      logo: 'https://i.loli.net/2019/06/06/5cf8c5d94521136430.png',
      volume: 0.7,
      mutex: !0,
      screenshot: !0,
      subtitle: {
        url:
          'https://cn-south-17-dplayer-49648867.oss.dogecdn.com/hikarunara.vtt',
        type: 'webvtt',
        fontSize: '20px',
        bottom: '10%',
        color: '#FADFA3'
      },
      video: {
        url:
          'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
        pic: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
        thumbnails: 'https://i.loli.net/2019/06/06/5cf8c5d9cec8510758.jpg',
        type: 'auto'
      },
      danmaku: {
        id: '9E2E3368B56CDBB4',
        api: 'https://api.prprpr.me/dplayer/',
        token: 'tokendemo',
        user: 'DIYgod',
        addition: [
          'https://cn-south-17-dplayer-49648867.oss.dogecdn.com/1678963.json'
        ]
      },
      contextmenu: [
        {
          text: 'custom1',
          link: 'https://github.com/DIYgod/DPlayer'
        },
        {
          text: 'custom2',
          click: function(t) {
            console.log(t)
          }
        }
      ],
      highlight: [
        {
          time: 20,
          text: '这是第 20 秒'
        },
        {
          time: 120,
          text: '这是 2 分钟'
        }
      ]
    }
  }
}
 */

export default {
    props: {
        url: {
            type: String,
            default: ''
        },
        vtt: {
            type: String,
            default: ''
        },
        time: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            dp: {}
        }
    },
    watch: {
        url: function() {
            this.showPlayer()
        },
        vtt: function() {
            this.showPlayer()
        },
        time: function(val) {
            if (utils.isRealNum(val)) {
                this.dp.seek(val)
            }
        }
    },
    methods: {
        showPlayer() {
            const dp = new DPlayer({
                container: this.$refs.dplayer,
                subtitle: {
                    url: this.vtt,
                    type: 'webvtt',
                    fontSize: '20px',
                    bottom: '10%',
                    // color: '#FADFA3'
                    color: '#fba305'
                },
                video: {
                    url: this.url,
                    type: 'auto'
                }
            })
            this.dp = dp
            // 时间同步
            dp.on('timeupdate', () => {
                this.$emit('updatetime', dp.video.currentTime)
            })
        }
    }
}
</script>
<style lang="less">
.dplayer-controller {
    padding: 0 !important;
    .dplayer-bar-wrap {
        width: 100% !important;
    }
}
</style>
