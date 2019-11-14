<template>
  <div class="lesson-search-wrap">
    <div v-loading="loading" class="container-1200">
      <div class="result-header">
        <span
          v-if="lessonData.totalCount > 0"
        >为您找到“{{ searchText }}”相关的内容共计{{ lessonData.totalCount }}个</span>
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
      <div v-for="item in lessonData.list" :key="item.id" class="result-list">
        <div class="result-item">
          <nuxt-link class="result-link" :to="{ path: '/lesson/detail', query: { id: item.id,from:'lesson' } }" target="_blank">
            <el-image class="result-image" :src="item.coverImage"></el-image>
            <div class="result-item-title">
              <!-- eslint-disable -->
              <div class="result-item-name" :title="item.name" v-html="formatSearch(item.name)"></div>
              <!-- eslint-enable -->
              <p>浏览量：{{item.broadcast}}</p>
            </div>
            <div class="result-item-teacher">
              <span>{{item.teacherName}}</span>
              {{ item.createTime | filterDate('yyyy-MM-dd hh:mm') }}
            </div>
            <div class="result-item-desc">
              <div class="result-item-point">课堂知识点：{{ item.keyPoint }}</div>
              <div class="result-item-point-detail">
                <span>内容简介：</span>
                {{ item.keyPointDetail }}
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
      <div class="result-pagination">
        <Pagination
          :page="option.page"
          :size="option.limit"
          :total="lessonData.totalCount"
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
import LessonData from '@/components/public/Lesson-Data.vue'
import { hasToken } from '@/scripts/mixin'
export default {
    layout: 'aijinke',
    components: {
        SearchTip,
        LessonData,
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
            lessonData: {
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
            this.searchLesson()
        }
    },
    watch: {
        $route(to, from) {
            this.$router.go(0)
        }
    },
    methods: {
        ...mapActions('lesson', ['getList']),
        searchLesson() {
            this.loading = true
            this.getList(this.option)
                .then(res => {
                    if (res) {
                        this.lessonData = res
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
            this.searchLesson()
        },
        handleSort(s) {
          const opt = this.option
          //console.log(opt)
          opt.sort = 'sort=' + s
          this.searchLesson()
        }
    }
}
</script>

<style lang="less">
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
            .el-radio-button__orig-radio:checked+.el-radio-button__inner{
              background-color: #3dbb96;
            }
            span{
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
.result-list {
    margin-top: 30px;
    .result-item {
        position: relative;
        margin-bottom: 30px;
        padding-left: 290px;
        height: 210px;
        border-bottom: 1px solid @color-border-gray1;
    }
    .result-link {
        text-decoration: none;
        color: @color-gray1;
    }
    .result-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 270px;
        height: 180px;
    }
    .result-item-title {
        padding-top: 15px;
        padding-right: 10px;
        font-size: 17px;
        color: @color-black;
        position: relative;
        display: flex;
        justify-content: space-between;
        .search-text {
            color: @color-blue;
        }
        .result-item-name {
            white-space: nowrap;
            overflow: hidden;
        }
        .result-item-data {
            position: absolute;
            right: 0;
            top: 18px;
            height: 20px;
            line-height: 20px;
            font-size: 14px;
        }
    }
    .result-item-teacher {
        margin-top: 5px;
        font-size: 14px;
        span {
            margin-right: 10px;
        }
    }
    .result-item-desc {
        margin-top: 10px;
        padding-bottom: 15px;
        font-size: 15px;
        background-color: @color-bgc-gray;
        .result-item-point {
            margin-top: 5px;
            padding: 10px;
        }
        .result-item-point-detail {
            padding-left: 80px;
            height: 63px;
            line-height: 20px;
            position: relative;
            overflow: hidden;
            span {
                position: absolute;
                left: 10px;
            }
        }
    }
}
.result-pagination {
    padding-top: 30px;
    padding-bottom: 40px;
    text-align: center;
}
</style>
