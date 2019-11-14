<template>
  <div class="courses-carousel">
    <el-carousel :interval="4000">
      <el-carousel-item v-for="(item, index) in list" :key="index">
        <div class="c-name">{{ item.name }}</div>
        <nuxt-link
          class="lesson-item-link"
          :to="{ path: '/course/detail', query: { id: item.id,from:'course'} }"
          target="_blank"
          tag="a"
        >
          <el-image :src="item.coverImage" fit="cover">
            <el-image slot="error" :src="'http://iph.href.lu/860x320?text=' + item.name"></el-image>
          </el-image>
        </nuxt-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            list: []
        }
    },
    mounted() {
        this.showHotList()
    },
    methods: {
        ...mapActions('course', ['hotList']),
        showHotList() {
            this.hotList().then(res => {
                res && (this.list = res.list)
            })
        }
    }
}
</script>

<style lang="less">
.courses-carousel {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 470px;
    .el-carousel {
        height: 470px;
        overflow: hidden;
        .el-carousel__container{
          height: 470px;
          overflow: hidden;
        }
        .el-image {
            width: 100%;
            height: 100%;
        }
    }

    .c-name {
        position: absolute;
        bottom: 10px;
        left: 10px;
        z-index: 11;
        color: @color-white;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 10px;
        font-size: 24px;
    }
}
</style>
