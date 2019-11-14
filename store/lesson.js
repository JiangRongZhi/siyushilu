import http from '@/scripts/http.js'
import utils from '@/scripts/utils.js'

export const actions = {
  // 热门金课库
  hotList(context, payload) {
    const data = {
      page: 1,
      limit: 5
    }
    return http({
      method: 'get',
      url: `school/tlesson/hot`,
      params: data
    })
      .then(res => {
        // console.log('res:', res)
        if (res.code === 0) {
          return res
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  // 热门金课库
  showRecommentList(context, id) {
    const data = {
      page: 1,
      limit: 5
    }
    return http({
      method: 'get',
      url: `school/tlesson/recommend/${id}`,
      params: data
    })
      .then(res => {
        // console.log('res:', res)
        if (res.code === 0) {
          return res
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  // 金课列表
  getList(context, payload) {
    // console.log('list:', payload)
    const data = Object.assign({}, payload)
    let sortStr = ''
    if (payload.sort) {
      sortStr = '?' + data.sort
      delete data.sort
    }
    // console.log('data:', data)
    return http({
      method: 'get',
      url: `school/tlesson/list${sortStr}`,
      params: data
    })
      .then(res => {
        // console.log('res:', res)
        if (res.code === 0) {
          return res.page
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  // 金课详情
  getDetail(context, id) {
    return http({
      url: `school/tlesson/info/${id}`
    })
      .then(res => {
        //console.log('res:', res)
        if (res.code === 0) {
          const result = res.tLesson
          result.subtitles = res.subtitleList
          result.translang = res.translang
          return result
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  //获取文件夹详情
  getFolderDetail(context, id) {
    return http({
      url: `lesson/dir/info/${id}`
    })
      .then(res => {
        //console.log('res:', res.list)
        if (res.code === 0) {
          return res.list
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  // 金课详情
  getSubtitleTransDetail(context, payload) {
    return http({
      url: `school/tlesson/subtitle/${payload.lessonId}/${payload.code}`
    })
      .then(res => {
        // console.log('res:', res)
        if (res.code === 0) {
          const result = res.subtitleList
          return result
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  // 金课年度列表
  getYearList(context, payload) {
    return http({
      url: 'school/tschoolyear/yearlist'
    })
      .then(res => {
        // console.log('res:', res)
        if (res.code === 0) {
          return res.list
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  // 我的未发布金课
  mineUnpublishList(context, payload) {
    const timestamp = (new Date()).valueOf();
    //console.log(timestamp)
    return http({
      url: 'school/tlesson/unpublishedlesson?t=' + timestamp
    })
      .then(res => {
        //console.log(res)
        if (res.code === 0) {
          return res.list
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  //搜索课堂
  serachMineUnpublishList(context, name) {
    //console.log("name:", name)
    const timestamp = (new Date()).valueOf();
    return http({
      url: 'school/tlesson/unpublishedlesson?name=' + name + '&t=' + timestamp,
    })
      .then(res => {
        console.log(res)
        if (res.code === 0) {
          return res.list
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  searchMinePublishList(context, name) {
    const timestamp = (new Date()).valueOf();
    //console.log(timestamp)
    return http({
      url: '/school/tlesson/publishedlesson?name=' + name + '&t=' + timestamp,
    })
      .then(res => {
        //console.log(res)
        if (res.code === 0) {
          return res.list
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },

  // 我的已发布金课
  minePublishList(context, payload) {
    const timestamp = (new Date()).valueOf();
    return http({
      url: 'school/tlesson/publishedlesson?t=' + timestamp
    })
      .then(res => {
        // console.log('res:', res)
        if (res.code === 0) {
          return res.list
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  // 新建金课
  addLesson(context, payload) {
    const ids = []
    payload.classList.forEach((val, index) => {
      ids.push(val[1])
    })
    const ids2 = []
    ids2.push(payload.transLangList)
    const data = {
      name: payload.name,
      courseName: payload.courseName,
      chapter: payload.chapter,
      section: payload.section,
      keyPoint: payload.point,
      keyPointDetail: payload.keyPointDetail,
      coverImage: payload.coverImage,
      videoUrl: payload.videoUrl,
      docUrl: payload.docUrl,
      professionId: payload.professionId,
      professionName: payload.professionName,
      isPublished: payload.isPublished,
      transLangList: ids2,
      defaultLangcode: payload.defaultLangcode,
      classlist: ids,
      schoolOpened: payload.schoolOpened
    }
    //console.log(data)
    return http({
      method: 'post',
      url: 'school/tlesson/save',
      data
    })
      .then(res => {
        console.log('res:', res)
        if (res.code === 0) {
          return 'add success'
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  // 修改金课
  editLesson(context, payload) {
    const ids = []
    payload.classList.forEach((val, index) => {
      ids.push(val[1])
    })
    const data = {
      id: payload.id,
      name: payload.name,
      chapter: payload.chapter,
      section: payload.section,
      keyPoint: payload.point,
      keyPointDetail: payload.keyPointDetail,
      coverImage: payload.coverImage,
      videoUrl: payload.videoUrl,
      docUrl: payload.docUrl,
      professionId: payload.professionId,
      professionName: payload.professionName,
      isPublished: payload.isPublished,
      classlist: ids,
      schoolOpened: payload.schoolOpened
    }
    return http({
      method: 'post',
      url: 'school/tlesson/update',
      data: data
    })
      .then(res => {
        if (res.code === 0) {
          return 'edit success'
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  // 发布课程
  publishLesson(context, ids) {
    //console.log(ids)
    if (ids.length == 0) {
      utils.errMessage('请选择你要发布的课程！')
    } else {
      return http({
        method: 'post',
        url: 'school/tlesson/publish',
        data: ids
      })
        .then(res => {
          // console.log('res:', res)
          if (res.code === 0) {
            return 'publish success'
          } else {
            utils.errMessage(res.msg)
          }
        })
        .catch(err => {
          console.log('err:', err)
        })

    }

  },
  // 下架课程
  unpublishLesson(context, ids) {
    return http({
      method: 'post',
      url: 'school/tlesson/unpublish',
      data: ids
    })
      .then(res => {
        // console.log('res:', res)
        if (res.code === 0) {
          return 'unpublish success'
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },

  //删除课程
  deleteLessonArr(context, ids) {
    return http({
      method: 'post',
      url: 'school/tlesson/delete',
      data: ids
    })
      .then(res => {
        //console.log('res:', res)
        if (res.code === 0) {
          return 'delete success'
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  //删除文件夹
  deleteFolder(context, id) {
    return http({
      method: 'post',
      url: 'lesson/dir/delete',
      data: [id]
    })
      .then(res => {
        if (res.code === 0) {
          return 'delete success'
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  //批量删除文件夹
  deleteFolderArr(context, ids) {
    return http({
      method: 'post',
      url: 'lesson/dir/delete',
      data: ids
    })
      .then(res => {
        if (res.code === 0) {
          return 'delete success'
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  //创建文件夹
  addFolder(context, folderData) {
    let url = 'lesson/dir/unpublished/save'
    const data = {
      dirName: folderData.dirName
    }
    if (folderData.type === 'published') {
      url = 'lesson/dir/published/save'
    }
    return http({
      method: 'post',
      url: url,
      data: data
    })
      .then(res => {
        //console.log('res:', res)
        if (res.code === 0) {
          return 'add Folder success'
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  //更新文件夹
  upFolder(context, upData) {
    const data = {
      id: upData.id,
      dirName: upData.name
    }
    return http({
      method: 'post',
      url: 'lesson/dir/update',
      data: data
    })
      .then(res => {
        //console.log('res:', res)
        if (res.code === 0) {
          return 'success'
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  //移动金课
  moveLesson(context, moveData) {
    const data = {
      newDirId: moveData.id,
      moveList: moveData.ids
    }
    //console.log(data)
    return http({
      method: 'post',
      url: 'lesson/dir/move',
      data: data
    })
      .then(res => {
        //console.log('res:', res)
        if (res.code === 0) {
          return 'success'
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })

  },
  //移动至根目录
  moveLessonRoot(context, ids) {
    return http({
      method: 'post',
      url: 'school/tlesson/resetroot',
      data: ids
    })
      .then(res => {
        if (res.code === 0) {
          return 'success'
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  //回收站课堂列表
  getRecycleClessonLsit(context, payload) {
    return http({
      method: 'get',
      url: `school/tlesson/recycle/list`,
    })
      .then(res => {
        //console.log('res:', res)
        if (res.code === 0) {
          return res.list
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  //恢复课堂资源
  recoverLesson(context, ids) {
    return http({
      method: 'post',
      url: 'school/tlesson/recycle/reset',
      data: ids
    })
      .then(res => {
        if (res.code === 0) {
          return 'success'
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },

  // 获取字幕
  getSubtitle(context, id) {
    return http({
      url: `school/tlessonsubtitle/listbylid/${id}`
    })
      .then(res => {
        // console.log('res:', res)
        if (res.code === 0) {
          return res.list
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  //获取字幕语言列表
  getTransLang(context, payload) {
    return http({
      url: `lesson/translang/list`
    })
      .then(res => {
        if (res.code === 0) {
          return res.page
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })

  },
  // 收藏点赞
  setLike(context, data) {
    return http({
      method: 'post',
      url: `school/tlesson/setview`,
      data
    })
      .then(res => {
        // console.log('res:', res)
        if (res.code === 0) {
          return res
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  //获取班级列表
  getClasslist() {
    return http({
      url: 'school/tteacher/classlist'
    })
      .then(res => {
        //console.log('res:', res)
        if (res.code === 0) {
          return res.list
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  // 获取专业列表
  getProList() {
    return http({
      url: 'school/tprofession/prolist'
    })
      .then(res => {
        // console.log('res:', res)
        if (res.code === 0) {
          return res.list
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  // 修改字幕
  updateSubtitle(context, data) {
    return http({
      method: 'post',
      url: `school/tlessonsubtitle/update`,
      data
    })
      .then(res => {
        // console.log('res:', res)
        if (res.code === 0) {
          return res
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  //获取头部logo
  getHeaderLogo(context, payload) {
    return http({
      url: `api/service/weblogo`
    })
      .then(res => {
        console.log(res)
        console.log(res.log.logoUrl)
        if (res.code === 0) {
          return res.log
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })

  }
}
