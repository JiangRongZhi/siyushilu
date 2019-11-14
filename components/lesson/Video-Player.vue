<template>
  <div class="library-video-player-wrap">
    <!-- x5-video-ignore-metadata="true" -->
    <video
      ref="videoRef"
      src="/cache/testvideo.mp4"
      width="700"
      height="400"
      controls="controls"
      x5-playsinline=""
      playsinline="true"
      webkit-playsinline="true"
      x-webkit-airplay="true"
      x5-video-player-type="h5"
      x5-video-player-fullscreen=""
      x5-video-orientation="portraint"
    ></video>
    <canvas ref="canvasRef" class="video-player-canvas"></canvas>
  </div>
</template>

<script>
import DanmuPlayer from './DanmuPlayer.js'

export default {
  mounted() {
    const danmuPalyer = DanmuPlayer.getInstance({
      container: this.$refs.canvasRef,
      video: this.$refs.videoRef
    })
    danmuPalyer.sendDanmu('test danmu')
  }
}
</script>

<style>
.library-video-player-wrap {
  display: inline-block;
  position: relative;
}
.library-video-player-wrap video {
  object-fit: contain;
  background-color: black;
}
.video-player-canvas {
  position: absolute;
  top: 0px;
  left: 0;
}
</style>
