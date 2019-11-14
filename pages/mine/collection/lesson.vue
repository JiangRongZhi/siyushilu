<template>
  <div class="lesson-manager-wrap">
    <CollTop active="lesson"></CollTop>
    <div class="container-1200">
      <div class="manager-top">
        <div class="search-word" v-if="search">
          搜索
          <span>“{{name}}”</span>,共
          <span>{{count}}</span>条结果
        </div>
        <div class="manager-search">
          <el-button class="tr-row-button el-icon-delete-solid" @click="handleRecycle">回收站</el-button>
          <el-input v-model="name" placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </div>
      </div>
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
                  <el-button icon="el-icon-folder-add" size="mini" @click="handleFolder">新建文件夹</el-button>
                  <el-button class="el-icon-document-copy" size="mini" @click="handleMove">移动</el-button>
                  <el-button
                    class="tr-row-button el-icon-delete"
                    size="mini"
                    @click="handleDeleteAll"
                  >删除</el-button>
                </template>

                <template slot-scope="scope">
                  <div class="tr-row">
                    <div v-if="scope.row.type==1">
                      <a
                        href="javascript:;"
                        class="icon-folder"
                        @click="handleFolderDetail(scope.row.id,scope.row.name)"
                      >{{ scope.row.name }}</a>
                      <el-button
                        class="tr-row-button el-icon-edit"
                        size="mini"
                        @click="handleEditFolder(scope.row.id,scope.row.name)"
                      >重命名</el-button>
                      <el-button
                        class="tr-row-button el-icon-delete"
                        size="mini"
                        @click="handleDeleteFolder(scope.row.id)"
                      >删除</el-button>
                    </div>
                    <div v-else-if="scope.row.type==0">
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
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" sortable label="更新时间" width="150">
                <template
                  slot-scope="scope"
                >{{ scope.row.updateTime | filterDate('yyyy-MM-dd hh:mm') }}</template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <!-- <div class="manager-pagination">
        <Pagination
          :page="option.page"
          :size="option.limit"
          :total="lessonList.totalCount"
          @change="handlePaginationChange"
        ></Pagination>
      </div>-->
    </div>
    <el-dialog title="新建文件夹" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-input v-model="folderData.dirName" ref="inputVal"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createFolder">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="文件夹重命名" :visible.sync="dialog" width="30%" :before-close="handleClose">
      <el-input v-model="upFolderData.name" ref="inputVal2"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="handFolder">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="移动至" :visible.sync="dialogs" width="30%" :before-close="handleClose">
      <ul class="mulu">
        <li>根目录</li>
      </ul>
      <ul v-for="(item,index) of lessonList" :key="index" class="folder-list">
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
        <el-button @click="dialogs = false,newfolder=false" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="moveFolder">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import utils from '@/scripts/utils.js'
import CollTop from '@/components/mine/Coll-Top.vue'
import Pagination from '@/components/public/Pagination.vue'
import { hasToken } from '@/scripts/mixin'
export default {
    layout: 'aijinke',
    components: {
        CollTop,
        Pagination
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
            name: ''
        }
    },
    mounted() {
        this.showList()
    },
    methods: {
        ...mapActions('mine', [
            'getLessonCollectionList',
            'addFolder',
            'upFolder',
            'deleteFolder',
            'deleteLessonArr',
            'moveLesson',
            'getFolderLessonList'
        ]),
        showList() {
            this.getLessonCollectionList().then(res => {
                let array = []
                res.forEach(v => {
                    if (v.type != 2) {
                        array.push(v)
                    }
                })
                this.lessonList = array
            })
        },
        //新建文件夹
        handleFolder(e) {
            this.dialogVisible = true
            this.$nextTick(function() {
                this.$refs.inputVal.focus()
            })
        },
        createFolder() {
            //console.log(this.folderData)
            this.addFolder(this.folderData).then(res => {
                if (res === 'add Folder success') {
                    utils.successMessage('新建文件夹成功！')
                    this.showList()
                    this.dialogVisible = false
                }
            })
        },
        //编辑文件夹按钮
        handleEditFolder(e, name) {
            this.dialog = true
            this.upFolderData.id = e
            this.upFolderData.name = name
            this.$nextTick(function() {
                this.$refs.inputVal2.focus()
            })
        },
        handFolder() {
            this.upFolder(this.upFolderData).then(res => {
                if (res === 'success') {
                    this.dialog = false
                    utils.successMessage('更新成功！')
                    this.showList()
                }
            })
        },
        //删除文件夹
        handleDeleteFolder(e) {
            this.$confirm(
                '此操作将永久删除该文件夹（文件夹里的资源会移动至根目录）, 是否继续?',
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
                    this.deleteFolder(ids).then(res => {
                        if (res === 'delete success') {
                            this.$message({
                                type: 'success',
                                message: '文件夹删除成功！!'
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
        //批量删除文件夹和资源
        handleDeleteAll() {
            const folderIds = [],
                ids = []
            let msg = ''
            this.multipleSelection.map(val => {
                if (val.type === 1) {
                    folderIds.push(val.id)
                } else {
                    ids.push(val.id)
                }
            })
            if (folderIds.length == 0 && ids.length == 0) {
                utils.errMessage('请选择你要删除的资源或文件夹！')
                return false
            } else if (folderIds.length > 0 && ids.length == 0) {
                this.$confirm(
                    '此操作将永久删除该文件夹（文件夹里的资源会移动至根目录）, 是否继续?',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                )
                    .then(() => {
                        this.deleteFolder(folderIds).then(res => {
                            if (res === 'delete success') {
                                this.showList()
                                this.$message({
                                    type: 'success',
                                    message: '删除成功！!'
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
            } else if (folderIds.length == 0 && ids.length > 0) {
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
                this.$confirm(
                    '此操作会将你选择的文件夹删除（文件夹中的资源会被移至根目录）,选中的文件会被移至回收站， 是否继续?',
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
                        this.deleteFolder(folderIds).then(res => {
                            this.showList()
                            if (res === 'delete success') {
                                this.$message({
                                    type: 'success',
                                    message: '文件夹删除成功!'
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
            }
        },
        //移动资源
        handleMove() {
            this.multipleSelection.map(val => {
                if (val.type === 1) {
                    utils.errMessage('文件夹不能移动！')
                    return false
                } else {
                    this.moveData.ids.push(val.id)
                }
            })
            if (this.moveData.ids.length > 0) {
                this.dialogs = true
                //console.log(this.moveData)
            } else {
                utils.errMessage('请选择你要移动的资源！')
            }
        },
        handleMoveLsson(e) {
            this.moveData.ids.push(e)
            this.dialogs = true
        },
        //移动时创建文件夹
        handNewFloder() {
            this.newfolder = true
            this.$nextTick(function() {
                this.$refs.inputVals.focus()
            })
        },
        createFolder2() {
            this.addFolder(this.folderData).then(res => {
                if (res === 'add Folder success') {
                    utils.successMessage('新建文件夹成功！')
                    this.showList()
                    this.newfolder = false
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
        selected(id) {
            this.active = id
            this.moveData.id = id
        },
        moveFolder() {
            if (this.moveData.id == '' || this.moveData.id == undefined) {
                utils.errMessage('请选择你要移至的文件夹！')
            } else {
                this.moveLesson(this.moveData).then(res => {
                    if (res === 'success') {
                        utils.successMessage('移动成功！')
                        this.showList()
                        this.dialogs = false
                    }
                })
            }
        },
        //进入文件夹
        handleFolderDetail(e, name) {
            this.$router.push({
                path: '/mine/collection/folderdetail',
                query: {
                    id: e,
                    name: name,
                    from: 'mine-collection-lesson'
                }
            })
        },
        handleRecycle() {
            this.$router.push({
                path: '/mine/collection/recycle'
            })
        },
        // 分页按钮
        handlePaginationChange(e) {
            this.option.page = e
            this.getLessonCollectionList(this.option).then(res => {
                this.lessonList = res.list
            })
        },
        handleSearch() {
            this.name ? (this.search = true) : (this.search = false)
            this.getLessonCollectionList(this.name).then(res => {
                this.lessonList = res
                this.count = this.lessonList.length
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
