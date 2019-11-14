<template>
  <div class="lesson-manager-wrap">
    <MineTop active="lesson"></MineTop>
    <div class="lesson-edit-title">
      <el-breadcrumb separator="|">
        <el-breadcrumb-item>
          <a href="javascript:;" @click="handleBack" class="goback">返回上一级</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="leftActive=='unpublished'">未发布</el-breadcrumb-item>
        <el-breadcrumb-item v-else>已发布</el-breadcrumb-item>
        <el-breadcrumb-item>搜索：“{{ word }}”</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container-1200">
      <div class="manager-content">
        <div class="manager-table">
          <el-table :data="lessonList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column width="auto">
              <template slot="header">
                <span class="mright-10">文件名</span>
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
                  <div v-else>
                    <nuxt-link
                      v-if="leftActive == 'published'"
                      :to="{ path: '/lesson/detail', query: { id: scope.row.id,active:leftActive,from:'mine-lesson-manager' } }"
                      target="_blank" tag="a"
                    >{{ scope.row.name }}</nuxt-link>
                    <nuxt-link
                      v-else
                      :to="{ path: '/mine/lesson/edit', query: { id: scope.row.id,active:leftActive,from:'mine-lesson-manager' } }"
                      target="_blank" tag="a"
                    >{{ scope.row.name }}</nuxt-link>
                    <el-button
                      class="tr-row-button el-icon-delete"
                      size="mini"
                      @click="handleDelete(scope.row.id)"
                    >删除</el-button>
                    <el-button
                      v-if="leftActive == 'published'"
                      class="tr-row-button el-icon-edit"
                      size="mini"
                      @click="handleEdit(scope.row.id)"
                    >编辑</el-button>
                    <el-button
                      v-if="leftActive === 'unpublished'"
                      class="tr-row-button el-icon-s-promotion"
                      size="mini"
                      @click="handlePublish(scope.row.id)"
                    >发布</el-button>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" sortable label="创建时间" width="150">
              <template
                slot-scope="scope"
              >{{ scope.row.createTime | filterDate('yyyy-MM-dd hh:mm') }}</template>
            </el-table-column>
            <el-table-column prop="updateTime" sortable label="修改时间" width="150">
              <template
                slot-scope="scope"
              >{{ scope.row.updateTime | filterDate('yyyy-MM-dd hh:mm') }}</template>
            </el-table-column>
          </el-table>
        </div>
      </div>
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
            <a href="javascript:;" class="btn-cheack" @click="createFolder2"></a>
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
import { mapActions, mapState } from 'vuex'
import utils from '@/scripts/utils.js'
import MineTop from '@/components/mine/Mine-Top.vue'
import ManagerTop from '@/components/mine/Manager-Left.vue'
import { hasToken } from '@/scripts/mixin'
export default {
    layout: 'aijinke',
    components: {
        MineTop
    },
    mixins: [hasToken],
    data() {
        return {
            lessonList: [],
            leftActive: '',
            multipleSelection: [],
            folderID: '',
            navName: '',
            word: '',
            dialogVisible: false,
            dialog: false,
            dialogs: false,
            newfolder: false,
            folderData: {
                dirName: ''
            },
            active: '',
            folderList: [],
            upFolderData: {
                name: '',
                id: ''
            },
            moveData: {
                ids: []
            }
        }
    },
    mounted() {
        const query = this.$route.query
        if (query.word) {
            this.leftActive = query.active
            this.word = query.word
            this.showList(query.word)
        }
    },
    methods: {
        ...mapActions('lesson', [
            'serachMineUnpublishList',
            'searchMinePublishList',
            'publishLesson',
            'unpublishLesson',
            'deleteLesson',
            'addFolder',
            'upFolder',
            'deleteFolder',
            'moveLesson',
            'deleteLessonArr',
            'deleteFolderArr'
        ]),
        showList() {
            if (this.leftActive === 'unpublished') {
                this.showUnpublishList()
            }
            if (this.leftActive === 'published') {
                this.showPublishList()
            }
        },
        // 显示未发布
        showUnpublishList() {
            this.serachMineUnpublishList(this.word).then(res => {
                this.lessonList = res
                console.log(res)
            })
        },
        // 显示已发布
        showPublishList() {
            this.searchMinePublishList(this.word).then(res => {
                // console.log(res)
                this.lessonList = res
            })
        },
        // 编辑金课按钮
        handleEdit(e) {
            let newpage = this.$router.resolve({
                path: '/mine/lesson/edit',
                query: {
                    id: e,
                    active: this.leftActive,
                    from:'mine-lesson-manager'
                }
            })
            window.open(newpage.href, '_blank')
        },
        // 发布金课按钮
        handlePublish(e) {
            let newpage = this.$router.resolve({
                path: '/mine/lesson/edit',
                query: {
                    id: e,
                    active: 'unpublished'
                }
            })
            window.open(newpage.href, '_blank')
        },
        handleDelete(e) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.deleteLesson(e).then(res => {
                        if (res === 'delete success') {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
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
        handleSelectionChange(e) {
            // console.log(e)
            this.multipleSelection = e
        },
        //编辑文件夹按钮
        handleEditFolder(e, name) {
            this.dialog = true
            this.upFolderData.id = e
            this.upFolderData.name = name
            this.type = this.leftActive
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
                '此操作将永久删除该文件夹，文件夹的内容会移动至根目录, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            )
                .then(() => {
                    this.deleteFolder(e).then(res => {
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
        //移动金课
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
                utils.errMessage('请选择你要移动的课程！')
            }
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
        //新建文件夹
        handleFolder(e) {
            this.dialogVisible = true
            this.$nextTick(function() {
                this.$refs.inputVal.focus()
            })
        },
        createFolder() {
            this.folderData.type = this.leftActive
            this.addFolder(this.folderData).then(res => {
                if (res === 'add Folder success') {
                    utils.successMessage('新建文件夹成功！')
                    this.showList()
                    this.dialogVisible = false
                }
            })
        },
        //移动时创建文件夹
        handNewFloder() {
            this.newfolder = true
            this.$nextTick(function() {
                this.$refs.inputVals.focus()
            })
        },
        createFolder2() {
            this.folderData.type = this.leftActive
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
        handleFolderDetail(e, name) {
            //console.log(e)
            this.$router.push({
                path: '/mine/lesson/folderdetail',
                query: {
                    id: e,
                    leftActive: this.leftActive,
                    name: name
                }
            })
        },
        // 返回上一级
        handleBack() {
            this.$router.push({
                path: '/mine/lesson/manager',
                query: {
                    active: this.leftActive
                }
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
                        this.deleteFolderArr(folderIds).then(res => {
                            if (res === 'delete success') {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功！!'
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
            } else if (folderIds.length == 0 && ids.length > 0) {
                this.$confirm(
                    '此操作将永久删除你选中的资源, 是否继续?',
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
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
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
            } else {
                this.$confirm(
                    '此操作将永久删除你选中的资源和文件夹（文件夹里面的资源会被移至根目录）, 是否继续?',
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
                                this.$message({
                                    type: 'success',
                                    message: '资源删除成功!'
                                })
                            }
                        })
                        this.deleteFolderArr(folderIds).then(res => {
                            if (res === 'delete success') {
                                this.$message({
                                    type: 'success',
                                    message: '文件夹删除成功!'
                                })
                            }
                        })
                        this.showList()
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.lesson-manager-wrap {
    .manager-top {
        height: 60px;
        .manager-function {
            float: left;
            padding: 10px 0;
        }
        .manager-search {
            float: right;
            padding: 10px 0;
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
    .tab-header {
        background: #f0f0f0;
    }
    .manager-header {
        line-height: 30px;
    }
    .manager-content {
        margin-top: 10px;
        margin-bottom: 30px;
        .manager-table {
            a {
                color: #606266;
                text-decoration: none;
            }
            a:hover {
                color: #309d7c;
            }
            .icon-folder {
                display: inline-block;
                background: url(/icon/files.png) no-repeat left center;
                padding-left: 25px;
            }
        }
    }
}
.lesson-edit-title {
    .container-1200;
    padding: 12px 0;
    a {
        font-weight: bold;
        color: #000;
    }
    a:hover {
        color: #309d7c;
    }
}
.manager-table {
    a {
        color: #606266;
    }
}
</style>
