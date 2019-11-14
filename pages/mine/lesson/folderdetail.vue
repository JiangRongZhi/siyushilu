<template>
  <div class="lesson-edit-wrap">
    <MineTop active="lesson"></MineTop>
    <div class="lesson-edit-title">
      <el-breadcrumb separator="|">
        <el-breadcrumb-item>
          <a href="javascript:;" @click="handleBack" class="goback">返回上一级</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="leftActive=='unpublished'">未发布</el-breadcrumb-item>
        <el-breadcrumb-item v-else>已发布</el-breadcrumb-item>
        <el-breadcrumb-item>{{ navName }}</el-breadcrumb-item>
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
                <el-button class="el-icon-document-copy" size="mini" @click="handleMove">移动</el-button>
                <el-button
                  class="tr-row-button el-icon-delete"
                  size="mini"
                  @click="handleDeleteAll"
                >删除</el-button>

                <!-- <el-button
                    v-if="leftActive === 'published'"
                    size="mini"
                    @click="handleUnpublish"
                >下架金课</el-button>-->
              </template>
              <template slot-scope="scope">
                <div class="tr-row">
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
            <a href="javascript:;" class="btn-cheack" @click="createFolder2"></a>
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
            lessonData: [],
            leftActive: '',
            multipleSelection: [],
            folderID: '',
            navName: '',
            dialogs: false,
            newfolder: false,
            active: '',
            folderData: {
                dirName: ''
            },
            moveData: {
                ids: []
            }
        }
    },
    mounted() {
        const query = this.$route.query
        if (query.id) {
            this.folderID = query.id
            this.leftActive = query.leftActive
            this.navName = query.name
            this.showList()
        }
    },
    methods: {
        ...mapActions('lesson', [
            'getFolderDetail',
            'deleteLesson',
            'publishLesson',
            'mineUnpublishList',
            'minePublishList',
            'moveLesson',
            'addFolder',
            'moveLessonRoot',
            'deleteLessonArr',
            'deleteFolderArr'
        ]),
        showList() {
            this.getFolderDetail(this.folderID).then(res => {
                this.lessonList = res
            })
        },
        // 编辑金课按钮
        handleEdit(e) {
            // console.log(e)
            this.$router.push({
                path: '/mine/lesson/edit',
                query: {
                    id: e
                }
            })
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
        //移动金课按钮
        handleMove() {
            this.multipleSelection.map(val => {
                this.moveData.ids.push(val.id)
            })
            if (this.moveData.ids.length > 0) {
                if (this.leftActive === 'unpublished') {
                    this.mineUnpublishList().then(res => {
                        this.lessonData = res
                    })
                } else if (this.leftActive === 'published') {
                    this.minePublishList().then(res => {
                        this.lessonData = res
                    })
                }
                this.dialogs = true
            } else {
                utils.errMessage('请选择你要移动的课程！')
            }
        },
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
        handleClose(done) {
            this.newfolder = false
            this.folderData.dirName = ''
            this.$confirm('确认关闭？')
                .then(_ => {
                    done()
                })
                .catch(_ => {})
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
                    if (this.leftActive === 'unpublished') {
                        this.mineUnpublishList().then(res => {
                            this.lessonData = res
                        })
                    } else if (this.leftActive === 'published') {
                        this.minePublishList().then(res => {
                            this.lessonData = res
                        })
                    }
                    this.newfolder = false
                }
            })
        },
        closeNewFolder() {
            this.newfolder = false
            this.folderData.dirName = ''
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

<style lang="less">
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
    button:hover {
        border: 1px solid #309d7c;
        background-color: #ddf3f0;
        color: #309d7c;
    }
}
.el-checkbox__inner:hover {
    border: 1px solid #309d7c;
    background-color: #ddf3f0;
    color: #309d7c;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #309d7c;
    border-color: #309d7c;
}
.el-table .descending .sort-caret.descending {
    border-top-color: #309d7c;
}
.el-table .ascending .sort-caret.ascending {
    border-bottom-color: #309d7c;
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
</style>
