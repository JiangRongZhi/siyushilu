import http from '@/scripts/http.js'
import utils from '@/scripts/utils.js'

export const actions = {
  // 课程列表
  getCourseCollectionList(context, name) {
    let url = 'student/source/courseList'
    if (name) {
      url = 'student/source/courseList?name=' + name
    }
    return http({
      method: 'get',
      url: url
    })
      .then(res => {
        console.log('res:', res)
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

  //课堂列表
  getLessonCollectionList(context, name) {
    let url = 'student/source/lessonList'
    if (name) {
      url = 'student/source/lessonList?name=' + name
    }
    return http({
      method: 'get',
      url: url
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
  //文件夹中的课堂列表
  getFolderLessonList(context, id) {
    //console.log('id:' + id)
    return http({
      method: 'get',
      url: `student/source/dirlessonlist/${id}`,
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
  //回收站课堂列表
  getRecycleClessonLsit(context, payload) {
    return http({
      method: 'get',
      url: `student/source/hsz/lesson/list`,
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
  //新建课堂文件夹
  addFolder(context, payload) {
    const data = {
      dirName: payload.dirName
    }
    return http({
      method: 'post',
      url: 'student/source/dir/lesson/save',
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
      url: 'student/source/dir/update',
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
  //删除文件夹
  deleteFolder(context, ids) {
    return http({
      method: 'post',
      url: 'student/source/dir/delete',
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
  //删除课堂资源
  deleteLessonArr(context, ids) {
    return http({
      method: 'post',
      url: 'student/source/recycle/lesson',
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
  //删除课程资源
  deleteCourse(context, ids) {
    console.log(ids)
    return http({
      method: 'post',
      url: 'student/source/recycle/course',
      data: ids
    })
      .then(res => {
        console.log('res:', res)
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
  //移动资源至文件夹
  moveLesson(context, moveData) {
    const data = {
      newDirId: moveData.id,
      moveList: moveData.ids
    }
    //console.log(data)
    return http({
      method: 'post',
      url: 'student/source/dir/move',
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
  //移动资源至根目录
  moveLessonRoot(context, ids) {
    return http({
      method: 'post',
      url: 'student/source/restore/lesson',
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
  //恢复课堂资源
  recoverLesson(context, ids) {
    return http({
      method: 'post',
      url: 'student/source/restore/lesson',
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
  //回收站课程列表
  getRecycleCourseLsit(context, name) {
    return http({
      method: 'get',
      url: `student/source/hsz/course/list`,
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
  //恢复课程资源
  recoverCourse(context, ids) {
    return http({
      method: 'post',
      url: 'student/source/restore/course',
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
}
