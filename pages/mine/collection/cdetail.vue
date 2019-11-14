<template>
  <div class="course-wrap">
    <CollTop active="course"></CollTop>
    <div class="course-banner">
      <div class="container-1200">
        <QRCode :qrcode-visible="qrcodeVisible" :path="mobilePath" @cancel="qrcodeVisible = false"></QRCode>
        <div class="course-icons">
          <Icon file="qrcode" :size="22" @click.native="handleQRCode"></Icon>
        </div>
        <el-row :gutter="30">
          <el-col :span="7">
            <div class="item-top">
              <el-image class="course-pointer" :src="courseDetail.coverImage" fit="cover">
                <el-image
                  slot="error"
                  class="course-pointer"
                  src="http://iph.href.lu/300x240?text=课程封面"
                  fit="cover"
                ></el-image>
              </el-image>
              <div class="c-count">共{{courseDetail.lessonNum}}个</div>
            </div>
          </el-col>

          <el-col :span="17">
            <div class="course-brief">
              <h3>
                <span class="course-name">{{ courseDetail.name }}</span>
                <span class="course-teacher">{{ courseDetail.teacherName }}</span>
              </h3>
              <p>
                <span>课程简介：</span>
                {{ courseDetail.courseDesc }}
              </p>
              <div class="course-props">
                <el-row>
                  <el-col :span="6">
                    <span>所属专业：{{ courseDetail.professionName }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>创建时间：{{ courseDetail.createTime | filterDate }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>浏览量：{{ courseDetail.broadcast || 0 }}次</span>
                  </el-col>
                  <!-- <el-col :span="6">
                    <span>收藏人数：{{ courseDetail.collection || 0 }}人</span>
                  </el-col>-->
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="courses">
      <el-row :gutter="30">
        <el-col :span="18">
          <div class="lesson-list">
            <LessonList v-if="courseId" :course-id="courseId"></LessonList>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="course-catalog" v-if="menuShow">
            <div class="catalog-head">课程目录</div>
            <div class="catalog-list">
              <nuxt-link
                v-for="(item, index) in catalogList"
                :key="index"
                class="catalog-item"
                :to="{ path: '/lesson/detail', query: { id: item.list[0].lessonId } }"
              >{{index+1}}-{{ item.menuName }}</nuxt-link>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import QRCode from '@/components/public/QRCode.vue'
import Icon from '@/components/public/Icon.vue'
import LessonList from '@/components/course/Lesson-List.vue'
import CollTop from '@/components/mine/Coll-Top.vue'
import { hasToken } from '@/scripts/mixin'
export default {
    layout: 'aijinke',
    components: {
        Icon,
        QRCode,
        LessonList,
        CollTop
    },
    mixins: [hasToken],
    data() {
        return {
            courseId: '',
            qrcodeVisible: false,
            mobilePath: '',
            courseDetail: {},
            menuShow: false,
            catalogList: {}
        }
    },
    mounted() {
        const query = this.$route.query
        if (query.id) {
            this.courseId = query.id
            this.showDetail()
            //this.getCatalogue()
            // 二维码路径
            const path = this.$router.resolve({
                path: '/mobile/course',
                query: { id: this.courseId }
            }).href
            // location.host
            //const host = '106.13.119.77:9999'
            const host = location.host
            const protocol = location.protocol + '//'
            this.mobilePath = protocol + host + path
        }
    },
    methods: {
        ...mapActions('course', ['getDetail', 'setLike', 'getCatalogue']),
        // 获取详情信息
        showDetail() {
            this.getDetail(this.courseId).then(res => {
                if (res) {
                    this.courseDetail = res.tCourse
                    //console.log('data:',this.courseDetail)
                    if (res.menulist.length > 0) {
                        this.menuShow = true
                        this.catalogList = res.menulist
                    }
                }
            })
        },
        // 二维码
        handleQRCode() {
            this.qrcodeVisible = true
        },
        // 收藏
        handleCollection() {
            this.setLike({
                type: 'collection',
                lessonId: this.courseId
            }).then(res => {
                if (res) {
                    this.courseDetail.userCollection = res.status ? 1 : 0
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.course-wrap {
    // background-color: #c0c0c0;

    .course-banner {
        margin-top: 30px;
        height: 290px;
        padding-top: 20px;
        background-color: @color-bgc-gray;

        .item-top {
            position: relative;
            width: 100%;
            height: 100%;
            .c-count {
                position: absolute;
                padding: 3px 8px;
                top: 10px;
                left: 10px;
                font-size: 14px;
                border-radius: 5px;
                color: @color-white;
                background-color: rgba(0, 0, 0, 0.5);
            }
            .el-image {
                border: 3px solid #c3c3c3;
            }
        }
        .container-1200 {
            position: relative;
            .course-icons {
                height: 30px;
                line-height: 30px;
                text-align: right;
                position: absolute;
                right: 30px;
                top: 0px;
                z-index: 11;
                .icon {
                    margin-right: 10px;
                }
            }
        }

        .course-pointer {
            width: 330px;
            height: 250px;
        }
        .course-brief {
            h3 {
                height: 40px;
                line-height: 40px;
                .course-name {
                    display: inline-block;
                    max-width: 700px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    vertical-align: top;
                }
                .course-teacher {
                    margin-left: 20px;
                    font-size: 14px;
                }
            }
            p {
                padding-top: 6px;
                padding-left: 70px;
                height: 140px;
                line-height: 25px;
                font-size: 14px;
                position: relative;
                span {
                    position: absolute;
                    top: 6px;
                    left: 0px;
                }
            }
            .course-props {
                margin-top: 40px;
                font-size: 14px;
            }
        }
    }

    .courses {
        .container-1200;
        padding-bottom: 20px;
    }
    .lesson-list {
        margin-top: 30px;
    }

    .course-catalog {
        margin-top: 30px;
        border: 1px solid @color-border-gray;
        .catalog-head {
            height: 50px;
            line-height: 50px;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            background-color: @color-bgc-gray;
        }
        .catalog-list {
            padding: 8px 15px;
            padding-bottom: 80px;
            line-height: 26px;
            font-size: 15px;
        }
        .catalog-item {
            display: block;
            color: @color-black;
        }
        .catalog-item:hover {
            color: @color-primary;
        }
    }
}
</style>
