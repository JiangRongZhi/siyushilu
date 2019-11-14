<template>
  <div class="lesson-manager-wrap">
    <CollTop active="lesson"></CollTop>
    <div class="lesson-edit-title">
      <el-breadcrumb separator="|">
        <el-breadcrumb-item>
          <a href="javascript:;" @click="handleBack" class="goback">返回上一级</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ navName }}</el-breadcrumb-item>
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
      </div>-->
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
                    class="tr-row-button el-icon-document-copy"
                    size="mini"
                    @click="handleMove"
                  >移动</el-button>
                  <el-button
                    class="tr-row-button el-icon-delete"
                    size="mini"
                    @click="handleDeleteAll"
                  >删除</el-button>
                </template>

                <template slot-scope="scope">
                  <div class="tr-row">
                    <nuxt-link
                      :to="{ path: '/lesson/detail', query: { id: scope.row.id,from:'mine-collection-lesson' } }"
                      target="_blank"
                    >{{ scope.row.name }}</nuxt-link>
                    <el-button
                      class="tr-row-button el-icon-document-copy"
                      size="mini"
                      @click="handleMoveLsson(scope.row.id)"
                    >移动</el-button>
                    <el-button
                      class="tr-row-button el-icon-delete"
                      size="mini"
                      @click="handleDeletelesson(scope.row.id)"
                    >删除</el-button>
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
    <el-dialog title="移动至" :visible.sync="dialogs" width="30%" :before-close="handleClose">
      <ul class="mulu">
        <li @click="selected(1,'root')" :class="{active : active == 1}">根目录</li>
      </ul>
      <ul v-for="(item,index) of lessonData" :key="index" class="folder-list">
        <li
          v-if="item.type==1"
          @click="selected(item.id)"
          :class="{active : active == item.id}"
        >{{ item.name }}</li>
      </ul>
      <ul class="addfolder" v-show="newfolder">
        <li>
          <div class="cons">
            <el-input size="mini" ref="inputVals" v-model="folderData.dirName"></el-input>
          </div>
          <div class="btn">
            <a href="javascript:;" class="btn-cheack" @click="createFolder"></a>
            <a href="javascript:;" class="btn-close" @click="closeNewFolder"></a>
          </div>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button icon="el-icon-folder-add" class="flbtn" size="mini" @click="handNewFloder">新建文件夹</el-button>
        <el-button @click="dialogs = false" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="moveFolder">确 定</el-button>
      </span>
    </el-dialog>
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
            folderId: '',
            lessonList: [],
            lessonData: [],
            dialogs: false,
            count: 0,
            navName: '',
            multipleSelection: [],
            dialogVisible: false,
            moveData: {
                ids: []
            },
            option: {
                word: ''
            },
            folderID: '',
            newfolder: false,
            active: '',
            folderData: {
                dirName: ''
            }
        }
    },
    mounted() {
        const query = this.$route.query
        if (query.id) {
            this.navName = query.name
            this.folderId = query.id
            this.showList()
        }
    },
    methods: {
        ...mapActions('mine', [
            'getFolderLessonList',
            'getLessonCollectionList',
            'addFolder',
            'moveLessonRoot',
            'moveLesson',
            'deleteLessonArr'
        ]),
        showList() {
            this.getFolderLessonList(this.folderId).then(res => {
                this.lessonList = res
            })
        },
        //批量移动资源按钮
        handleMove() {
            this.multipleSelection.map(val => {
                this.moveData.ids.push(val.id)
            })
            if (this.moveData.ids.length > 0) {
                this.getLessonCollectionList().then(res => {
                    this.lessonData = res
                    this.dialogs = true
                })
            } else {
                utils.errMessage('请选择你要移动的课程！')
            }
        },
        //移动单个资源
        handleMoveLsson(e) {
            this.moveData.ids.push(e)
            this.getLessonCollectionList().then(res => {
                this.lessonData = res
                this.dialogs = true
            })
        },
        //选择目录
        selected(id, type) {
            this.active = id
            this.moveData.id = id
            this.moveData.type = type
        },
        moveFolder() {
            if (this.moveData.id == '' || this.moveData.id == undefined) {
                utils.errMessage('请选择你要移至的文件夹！')
            } else {
                if (this.moveData.type === 'root') {
                    this.moveLessonRoot(this.moveData.ids).then(res => {
                        if (res === 'success') {
                            utils.successMessage('移动成功！')
                            this.showList()
                            this.dialogs = false
                        }
                    })
                } else {
                    this.moveLesson(this.moveData).then(res => {
                        if (res === 'success') {
                            utils.successMessage('移动成功！')
                            this.showList()
                            this.dialogs = false
                        }
                    })
                }
            }
        },
        //移动时创建文件夹
        handNewFloder() {
            this.newfolder = true
            this.$nextTick(function() {
                this.$refs.inputVals.focus()
            })
        },
        createFolder() {
            this.addFolder(this.folderData).then(res => {
                if (res === 'add Folder success') {
                    this.getLessonCollectionList().then(res => {
                        this.lessonData = res
                        utils.successMessage('新建文件夹成功！')
                        this.newfolder = false
                        this.folderData.dirName = ''
                    })
                }
            })
        },
        closeNewFolder() {
            this.newfolder = false
            this.folderData.dirName = ''
        },
        handleClose(done) {
            this.newfolder = false
            this.folderData.dirName = ''
            this.$confirm('确认关闭？')
                .then(_ => {
                    done()
                })
                .catch(_ => {})
        },
        //批量删除文件夹和资源
        handleDeleteAll() {
            const ids = []
            this.multipleSelection.map(val => {
                ids.push(val.id)
            })
            if (ids.length > 0) {
                this.$confirm(
                    '此操作将你选中的资源删除至回收站（可进入回收站恢复）, 是否继续?',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                )
                    .then(() => {
                        this.deleteLessonArr(ids).then(res => {
                            if (res === 'delete success') {
                                this.showList()
                                this.$message({
                                    type: 'success',
                                    message: '资源已被移至回收站！'
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
            } else {
                utils.errMessage('请选择你要删除的资源或文件夹！')
                return false
            }
        },
        //删除单个文件
        handleDeletelesson(e) {
            this.$confirm(
                '此操作将会把资源移动至回收站（进入回收站可恢复）, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            )
                .then(() => {
                    const ids = []
                    ids.push(e)
                    this.deleteLessonArr(ids).then(res => {
                        if (res === 'delete success') {
                            this.$message({
                                type: 'success',
                                message: '资源已被移至回收站！'
                            })
                            this.showList()
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
        handleSelectionChange(e) {
            this.multipleSelection = e
        }
    }
}
</script>

<style lang="less">
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
.lesson-manager-wrap {
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
    li.active,
    li:hover {
        color: #309d7c;
        background-color: #ddf3f0;
        cursor: pointer;
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
