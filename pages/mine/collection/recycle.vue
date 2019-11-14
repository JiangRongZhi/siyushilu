<template>
  <div class="lesson-manager-wrap">
    <CollTop active="lesson"></CollTop>
    <div class="lesson-edit-title">
      <el-breadcrumb separator="|">
        <el-breadcrumb-item>
          <a href="javascript:;" @click="handleBack" class="goback">返回上一级</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>回收站</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container-1200">
      <!-- <div class="manager-top">
        <div class="search-word" v-if="search">
          搜索
          <span>“{{option.word}}”</span>,共
          <span>{{count}}</span>条结果
        </div>
        <div class="manager-search">
          <el-input v-model="option.word" placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </div>
      </div> -->
      <div class="manager-content-lesson">
        <div class="manager-right">
          <div class="manager-table">
            <el-table
              :data="lessonList"
              style="width: 100%"
              :default-sort="{ prop: 'createTime', order: 'descending' }"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column width="auto">
                <template slot="header">
                  <span class="mright-10">名称</span>

                  <el-button
                    class="tr-row-button el-icon-refresh-right"
                    size="mini"
                    @click="handleReset"
                  >恢复</el-button>
                </template>

                <template slot-scope="scope">
                  <div class="tr-row">
                    <nuxt-link
                      :to="{ path: '/lesson/detail', query: { id: scope.row.id,from:'mine-collection-lesson' } }"
                      target="_blank"
                    >{{ scope.row.name }}</nuxt-link>
                    <el-button
                      class="tr-row-button el-icon-s-promotion"
                      size="mini"
                      @click="handleRecover(scope.row.id)"
                    >恢复</el-button>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="updateTime" sortable label="更新时间" width="150">
                <template
                  slot-scope="scope"
                >{{ scope.row.updateTime | filterDate('yyyy-MM-dd hh:mm') }}</template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import utils from '@/scripts/utils.js'
import CollTop from '@/components/mine/Coll-Top.vue'
import { hasToken } from '@/scripts/mixin'
export default {
    layout: 'aijinke',
    components: {
        CollTop
    },
    mixins: [hasToken],
    data() {
        return {
            search: false,
            lessonList: [],
            count: 0,
            multipleSelection: [],
            dialogVisible: false,
            dialog: false,
            dialogs: false,
            newfolder: false,
            darrf: false,
            darrl: false,
            active: '',
            folderData: {
                dirName: ''
            },
            upFolderData: {
                name: '',
                id: ''
            },
            moveData: {
                ids: []
            },
            option: {
                word: ''
            }
        }
    },
    mounted() {
        this.showList()
    },
    methods: {
        ...mapActions('mine', ['getRecycleClessonLsit','recoverLesson']),
        showList() {
            this.getRecycleClessonLsit().then(res => {
                this.lessonList = res
            })
        },
        //恢复资源
        handleReset() {
            const ids = []
            this.multipleSelection.map(val => {
                ids.push(val.id)
            })
            if(ids.length>0){
                //console.log(ids)
                this.recover(ids)
            }else{
                utils.errMessage('请选择你要恢复的资源！')
                return false
            }
        },
        handleRecover(e){
          const ids = [e]
          this.recover(ids)
        },
        recover(e){
            this.$confirm(
                    '此操作将你选中的资源恢复至我的课堂, 是否继续?',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                )
                    .then(() => {
                        this.recoverLesson(e).then(res => {
                            if (res === 'success') {
                                this.showList()
                                this.$message({
                                    type: 'success',
                                    message: '资源已被恢复至我的课堂！'
                                })
                            }
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
        },
        handleSearch() {
            this.option.word ? (this.search = true) : (this.search = false)
            this.getLessonCollectionList(this.option).then(res => {
                this.lessonList = res.list
                this.count = this.lessonList.length
            })
        },
        // 返回上一级
        handleBack() {
            this.$router.push({
                path: '/mine/collection/lesson'
            })
        },
        //checkbox
        handleSelectionChange(e) {
            this.multipleSelection = e
        }
    }
}
</script>

<style lang="less">
.lesson-manager-wrap {
    .lesson-edit-title {
        .container-1200;
        padding: 12px 0;
        a.goback {
            font-weight: bold;
            color: #000;
        }
        a:hover {
            color: #309d7c;
        }
    }
    .manager-top {
        height: 60px;
        .search-word {
            float: left;
            padding: 10px 0;
            height: 40px;
            line-height: 40px;
            span {
                color: #3dbb96;
            }
        }
        .manager-search {
            float: right;
            padding: 10px 0;
            display: flex;
            justify-content: flex-start;
            .el-icon-delete-solid {
                margin-right: 10px;
            }
        }
    }
    .manager-header {
        line-height: 30px;
    }
    .manager-table {
        border: 1px solid #ebeef5;
        margin-bottom: 30px;
        .icon-folder {
            display: inline-block;
            background: url(/icon/files.png) no-repeat left center;
            padding-left: 25px;
        }
        .icon-recycle {
            display: inline-block;
            background: url(/icon/huishouzhan.png) no-repeat left center;
            padding-left: 25px;
        }
        .el-table__row {
            a {
                color: #606266;
                text-decoration: none;
            }
            a:hover {
                color: #3dbb96;
            }
        }
    }
    .manager-pagination {
        text-align: right;
        margin-bottom: 30px;
    }
}
.flbtn {
    float: left;
}
.mulu {
    li {
        width: 100%;
        padding: 0 0 0 35px;
        background-image: url(/icon/mulu.png);
        background-repeat: no-repeat;
        background-size: 20px 20px;
        background-position: 10px center;
        height: 36px;
        line-height: 36px;
        margin-top: -20px;
    }
}
.folder-list {
    li {
        width: 100%;
        padding: 0 0 0 55px;
        background: url(/icon/files.png) no-repeat left 30px center;
        height: 36px;
        line-height: 36px;
    }
    li.active,
    li:hover {
        color: #309d7c;
        background-color: #ddf3f0;
        cursor: pointer;
    }
}
.addfolder {
    li {
        width: 100%;
        padding: 0 0 0 55px;
        background: url(/icon/files.png) no-repeat left 30px center;
        height: 36px;
        line-height: 36px;
        display: flex;
        .cons {
            margin-right: 10px;
        }
        .btn-cheack,
        .btn-close {
            display: inline-block;
            width: 26px;
            height: 26px;

            padding: 0;
            background-size: 26px 26px;
            margin-top: 5px;
        }
        .btn-cheack {
            background-image: url(/icon/dui.png);
        }
        .btn-close {
            background-image: url(/icon/cuo.png);
        }
    }
}
.mright-10 {
    margin-right: 10px;
}
.tr-row {
    min-height: 30px;
    line-height: 30px;
    .tr-row-button {
        display: none;
        float: right;
    }

    &:hover {
        color: red;
        .tr-row-button {
            display: inline-block;
            margin-left: 5px;
        }
    }
}
</style>
