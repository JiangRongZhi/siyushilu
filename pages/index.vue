<template>
  <div class="home-wrap">
    <Carousel></Carousel>
    <div class="home-download-wrap">
      <ul class="home-download-product-features">
        <li>
          <el-image src="/icon/home/1.png"></el-image>声音实时
          <br />转文字
        </li>
        <li>
          <el-image src="/icon/home/2.png"></el-image>多语种实时
          <br />互译
        </li>
        <li>
          <el-image src="/icon/home/3.png"></el-image>来华留学生
          <br />课堂革命
        </li>
        <li>
          <el-image src="/icon/home/4.png"></el-image>多语种教学资源
          <br />一键生成
        </li>
        <li>
          <el-image src="/icon/home/5.png"></el-image>多语种教学资源
          <br />积累与传承
        </li>
        <li>
          <el-image src="/icon/home/6.png"></el-image>结构化管理
          <br />与即时分享
        </li>
      </ul>
      <div class="download-block">
        <div class="download-info">
          <p class="download-name">丝路师语PC客户端</p>
          <p class="download-bref">
            大小：200.6MB
            <br />版本：丝路师语PC客户端 V1.0
            <br />适应系统：vista/win7/win8/win10
          </p>
          <a
            class="download-button"
            href="http://download.aijink.com/version/0.0.1/aijinke Setup 1.0.0.exe"
            target="_parent"
            @click="handleDownload"
            v-if="usertype"
          >下载PC客户端</a>
        </div>
        <div class="download-image">
          <el-image src="/image/home/123.png"></el-image>
        </div>
      </div>
    </div>

    <div class="home-why-wrap">
      <div class="container-1200">
        <el-image class="why-image" src="/image/home/456.jpg"></el-image>
        <div class="why-row">
          <p>
            <span>TO学校</span>
            <br />解决来华留学生课堂教学的语言障碍问题
            <br />解决来华留学生多语种教学资源的贫乏问题
          </p>
          <p>
            <span>TO老师</span>
            <br />提高来华留学生课堂教学的质量和效率
            <br />多语种课程教学资源一键生成
          </p>
          <p>
            <span>TO学生</span>
            <br />汉语教学的课堂终于听得懂了
            <br />课后还可以预习和复习
            <br />汉语水平得到提高
          </p>
        </div>
      </div>
    </div>

    <div class="home-help-wrap">
      <div class="home-help-item">
        <h4>客服咨询</h4>400-808-3315
        <br />silushiyu@sina.cn
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Carousel from '@/components/home/Carousel.vue'

export default {
    layout: 'aijinke',
    components: {
        Carousel
    },
    head() {
        return {
            title: '丝路师语',
            usertype: true,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'My custom description'
                }
            ]
        }
    },
    computed: {
        ...mapState('user', ['userInfo'])
    },
    created() {
        this.usertype = this.userInfo.type
        console.log('usertype:' + this.usertype)
    },
    methods: {
        handleDownload() {
            console.log('download')
        }
    }
}
</script>

<style scoped lang="less">
.home-download-wrap {
    .container-1200;
    height: 635px;
    position: relative;
    .home-download-product-features {
        position: absolute;
        width: 100%;
        height: 140px;
        bottom: -60px;
        margin: auto;
        padding: 0;
        list-style-type: none;
        text-align: center;
        font-size: 13px;
        background-color: @color-bgc-white;
        box-shadow: 0px 0px 5px 5px @color-shadow-gray;
        li {
            display: inline-block;
            width: 16%;
            line-height: 22px;
        }
        li + li {
            &:before {
                content: '';
                float: left;
                height: 90px;
                margin-top: 25px;
                border-left: 1px solid @color-gray;
            }
        }
        .el-image {
            display: block;
            margin: auto;
            margin-top: 15px;
            margin-bottom: 12px;
            width: 50px;
            height: 50px;
        }
    }
    .download-block {
        .download-info {
            display: inline-block;
            margin-top: 160px;
            margin-left: 60px;
            font-weight: bold;
            .download-name {
                font-size: 36px;
                color: @color-primary;
            }
            .download-bref {
                margin-top: 10px;
                line-height: 35px;
            }
            .download-button {
                display: inline-block;
                margin-top: 15px;
                width: 150px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                color: @color-white;
                background-color: @color-gray;
                cursor: pointer;
                &:hover {
                    color: @color-primary;
                }
            }
        }
        .download-image {
            margin-top: 90px;
            float: right;
            vertical-align: top;
        }
    }
}

.home-why-wrap {
    height: 800px;
    background-color: @color-bgc-gray1;
    .why-image {
        margin-top: 160px;
    }
    .why-row {
        float: right;
        margin-top: 160px;
        p {
            margin-bottom: 45px;
            line-height: 40px;
            text-align: right;
            font-size: 18px;
            span {
                font-size: 40px;
                color: @color-primary;
            }
        }
    }
}

.home-help-wrap {
    .container-1200;
    height: 150px;
    .home-help-item {
        float: left;
        margin-top: 30px;
        width: 17%;
        line-height: 32px;
        font-size: 15px;
        h4 {
            font-size: 20px;
        }
    }
    .help-link {
        float: right;
    }
}
</style>
