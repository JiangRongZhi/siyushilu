<template>
    <div class="hot-lessons-wrap">
        <el-carousel
            class="hot-lessons-carousel"
            direction="vertical"
            :autoplay="false"
            @change="handleCarouselChange"
            ref="carousel"
        >
            <el-carousel-item v-for="(item, index) in list" :key="index">
                <el-image :src="item.coverImage" fit="cover">
                    <el-image
                        slot="error"
                        :src="'http://iph.href.lu/860x320?text=' + item.name"
                        class
                    ></el-image>
                </el-image>
            </el-carousel-item>
        </el-carousel>
        <div class="hot-lessons-list">
            <h4>热播课堂资源</h4>
            <ul>
                <li
                    v-for="(item, index) in list"
                    :key="index"
                    :class="activeIndex == index ? 'active-item' : ''"
                    @mouseover="setActiveItem(index)"
                >
                    <nuxt-link
                        class="hot-lesson-link"
                        :to="{ path: '/lesson/detail', query: { id: item.id ,from:'lesson'} }"
                    >{{ item.name }}</nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            activeIndex: 0,
            list: []
        };
    },
    mounted() {
        this.showHotList();
    },
    methods: {
        ...mapActions("lesson", ["hotList"]),
        showHotList() {
            this.hotList().then(res => {
                res && (this.list = res.list);
            });
        },
        handleCarouselChange(e) {
            this.activeIndex = e;
        },
        setActiveItem(index) {
            this.$refs.carousel.setActiveItem(index);
            this.activeIndex = index;
        }
    }
};
</script>

<style lang="less">
.hot-lessons-wrap {
    .container-1200;
    padding-top: 30px;
    height: 450px;
    .el-carousel__indicators {
        opacity: 0;
    }
    .hot-lessons-carousel {
        float: left;
        width: 900px;
        height: 390px;
        .el-image {
            width: 100%;
            height: 100%;
            border: 3px solid #e8e8e8;
        }
        .el-carousel__container {
            height: 100%;
        }
    }
    .hot-lessons-list {
        float: right;
        width: 280px;
        height: 390px;
        border: 1px solid @color-border-gray1;
        h4 {
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: @color-primary;
            border-bottom: 1px solid @color-border-gray1;
            background-color: @color-bgc-gray;
        }
        ul {
            .ul-normal;
        }
        li {
            margin-left: 25px;
            margin-right: 25px;
            padding-left: 5px;
            padding-right: 5px;
            height: 42px;
            line-height: 42px;
            font-size: 14px;
            border-bottom: 1px solid @color-border-gray1;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            overflow: hidden;
        }
        .hot-lesson-link {
            text-decoration: none;
            color: @color-text;
        }
        li:hover {
            .hot-lesson-link {
                color: @color-primary;
                font-weight: bold;
            }
        }
        .active-item {
            .hot-lesson-link {
                color: @color-primary;
                font-weight: bold;
            }
        }
    }
}
</style>
