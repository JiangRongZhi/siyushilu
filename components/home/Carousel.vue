<template>
  <el-carousel :interval="6000" arrow="never" class="carousel-wrap">
    <el-carousel-item v-for="(item, index) in list" :key="index">
      <div
        class="carousel-image"
        :style="{ backgroundImage: 'url(' + item.image + ')' }"
      ></div>
      <!-- <el-image :src="item.image"></el-image> -->
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          path: 'home',
          image: '/image/carousel/1.jpg'
        },
        {
          path: 'home',
          image: '/image/carousel/2.jpg'
        }
      ]
    }
  }
}
</script>

<style lang="less">
.carousel-wrap {
  width: 100%;
  height: 600px;
  .carousel-image {
    width: 100%;
    height: 100%;
    background-position: center top;
  }
  .el-carousel__container {
    height: 100%;
  }
  .el-carousel__indicators--horizontal {
    margin-bottom: 15px;
    .el-carousel__button {
      width: 40px;
      height: 5px;
    }
  }
}
</style>
