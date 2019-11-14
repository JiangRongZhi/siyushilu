<template>
  <div class="course-search-wrap">
    <div class="result-header">
      <span
        v-if="courseData.totalCount > 0"
      >为您找到“{{ searchText }}”相关的内容共计{{ courseData.totalCount }}个</span>
      <span v-else>未找到“{{ searchText }}”相关的内容</span>
      <div class="result-sort">
        <span>排 序:</span>
        <div class="search-sort">
          <el-radio-group v-model="activeName" size="mini">
            <el-radio-button label="new">
              <span @click="handleSort('new')">最新</span>
            </el-radio-button>
            <el-radio-button label="hot">
              <span @click="handleSort('broadcast')">最热</span>
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="course-search-result">
      <div v-for="item in courseData.list" :key="item.id" class="result-item">
        <nuxt-link class="result-link" :to="{ path: '/course/detail', query: { id: item.id,from:'course' } }" target="_blank">
          <el-image class="result-image" :src="item.coverImage" fit="cover">
            <el-image
              slot="error"
              class="result-image"
              src="http://iph.href.lu/260x220?text=课程封面"
              fit="cover"
            ></el-image>
          </el-image>
          <div class="result-info">
            <p class="result-title">
              <span class="result-title-name" :title="item.name" v-html="formatSearch(item.name)"></span>
              <span class="result-title-teacher">{{ item.teacherName }}</span>
            </p>
            <p class="result-brief">
              <span>课程简介：</span>
              {{ item.courseDesc }}
            </p>
            <div class="result-property">
              <el-row>
                <el-col :span="6">
                  <span>所属专业：{{ item.professionName }}</span>
                </el-col>
                <el-col :span="6">
                  <span>创建时间：{{ item.createTime | filterDate }}</span>
                </el-col>
                <el-col :span="6">
                  <span>浏览量：{{ item.broadcast || 0 }}次</span>
                </el-col>
                <!-- <el-col :span="6">
                  <span>收藏人数：{{ item.collection || 0 }}人</span>
                </el-col>-->
              </el-row>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div class="result-pagination">
        <Pagination
          :page="option.page"
          :size="option.limit"
          :total="courseData.totalCount"
          @change="handlePaginationChange"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import utils from '@/scripts/utils.js'
import SearchTip from '@/components/public/Search-Tip.vue'
import Pagination from '@/components/public/Pagination.vue'
import { hasToken } from '@/scripts/mixin'
export default {
    layout: 'aijinke',
    components: {
        SearchTip,
        Pagination
    },
    mixins: [hasToken],
    data() {
        return {
            activeName: 'new',
            option: {
                page: 1, // 页码
                limit: 16 // 条数
            },
            searchText: '',
            loading: false,
            courseData: {
                totalCount: 0,
                pageSize: 0,
                totalPage: 0,
                list: []
            }
        }
    },
    mounted() {
        const query = this.$route.query
        if (query.word) {
            // console.log(query.word)
            this.option.word = query.word
            this.searchText = query.word
            this.searchCourse()
        }
    },
    watch: {
        $route(to, from) {
            this.$router.go(0)
        }
    },
    methods: {
        ...mapActions('course', ['getList']),
        searchCourse() {
            this.loading = true
            this.getList(this.option)
                .then(res => {
                    if (res) {
                        this.courseData = res
                    }
                    this.loading = false
                })
                .catch(() => {
                    this.loading = false
                })
        },
        formatSearch(value) {
            return utils.searchHighLight(value, this.searchText)
        },
        handlePaginationChange(e) {
            this.option.page = e
            this.searchCourse()
        },
        handleSort(s) {
            const opt = this.option
            opt.sort = 'sort=' + s
            this.searchCourse()
        }
    }
}
</script>

<style lang="less">
.course-search-wrap {
    .container-1200;
    .result-header {
        margin-top: 15px;
        padding-left: 20px;
        line-height: 50px;
        background: @color-bgc-gray;
        overflow: hidden;
        .result-sort {
            float: right;
            margin-right: 10px;
            .search-sort {
                float: right;
                margin-left: 10px;
                .el-radio-button__orig-radio:checked + .el-radio-button__inner {
                    background-color: #3dbb96;
                }
                span {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
                .active-sort {
                    color: @color-primary;
                    background-color: @color-bgc-green;
                }
            }
        }
    }
    .course-search-result {
        padding-top: 30px;
    }
    .search-text {
        color: @color-blue;
    }
    .result-item {
        margin-bottom: 30px;
        padding-bottom: 28px;
        border-bottom: 1px solid @color-border-gray;
    }
    .result-link {
        display: block;
        color: @color-black;
    }
    .result-image {
        vertical-align: top;
        width: 310px;
        height: 207px;
    }
    .result-info {
        float: right;
        width: 866px;
    }
    .result-title {
        height: 50px;
        line-height: 50px;
        .result-title-name {
            font-size: 18px;
        }
        .result-title-teacher {
            margin-left: 20px;
            font-size: 14px;
        }
    }
    .result-brief {
        padding: 12px;
        padding-left: 86px;
        height: 120px;
        line-height: 24px;
        overflow: hidden;
        font-size: 14px;
        background-color: @color-bgc-gray;
        position: relative;
        span {
            position: absolute;
            top: 12px;
            left: 15px;
        }
    }
    .result-property {
        font-size: 14px;
        margin-top: 20px;
    }
}
.result-pagination {
    padding-top: 30px;
    padding-bottom: 40px;
    text-align: center;
}
</style>
