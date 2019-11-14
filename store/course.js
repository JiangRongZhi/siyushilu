import http from '@/scripts/http.js'
import utils from '@/scripts/utils.js'

export const actions = {
  // 热门课程
  hotList(context, payload) {
    const data = {
      page: 1,
      limit: 5
    }
    return http({
      method: 'get',
      url: `school/tcourse/list`,
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
  // 课程列表
  getList(context, payload) {
    // console.log('list:', payload)
    const data = Object.assign({}, payload)
    let sortStr = ''
    if (payload.sort) {
      sortStr = '?' + data.sort
      delete data.sort
    }
    return http({
      method: 'get',
      url: `school/tcourse/list/${sortStr}`,
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
  // 未发布课程
  courseUnpublishList(context, data) {
    return http({
      url: 'school/tcourse/tunpublishlist',
      params: data
    })
  },

  // 已发布课程
  coursePublishList(context, data) {
    return http({
      url: 'school/tcourse/tpublishlist',
      params: data
    })
  },
  // 获取详情
  getDetail(context, id) {
    return http({
      method: 'get',
      url: `school/tcourse/info/${id}`
    })
      .then(res => {
        //console.log(res)
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
  getTcourseAllinfo(context, id) {
    return http({
      method: 'get',
      url: `school/tcourse/allinfo/${id}`
    })
      .then(res => {
        //console.log(res)
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
  // 获取已加入课程的金课,其中字段exist为1的金课为本金课课程
  getCourseLessonList(context, payload) {
    return http({
      method: 'get',
      url: `school/tcourse/lessons/${payload.id}`,
      params: payload.option
    })
      .then(res => {
        // console.log('res:', 123, res, payload)
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
  //添加课堂（已发布的课堂列表）
  getPublisLessonList(context, payload) {
    return http({
      method: 'get',
      url: `school/tcourse/otherlessons/${payload.id}`,
      params: payload.option
    })
      .then(res => {
        //console.log('res:',res)
        if (res.code === 0) {
          return res.lessonGroup
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })

  },
  // 获取已加入课程的金课
  getRealCourseLessonList(context, payload) {
    return http({
      method: 'get',
      url: `school/tcourse/reallessons/${payload.id}`,
      params: payload.option
    })
      .then(res => {
        if (res.code === 0) {
          return res.page
        } else {
          utils.errMessage(res.msg)
          return { list: [] }
        }
      })
      .catch(err => {
        console.log('err:', err)
        return { list: [] }
      })
  },
  getRealCourseListAll(context, payload) {
    return http({
      method: 'get',
      url: `school/tcourse/containlessons/${payload.id}`,
      params: payload.option
    })
      .then(res => {
        //console.log(res)
        if (res.code === 0) {
          return res.page
        } else {
          utils.errMessage(res.msg)
          return { list: [] }
        }
      })
      .catch(err => {
        console.log('err:', err)
        return { list: [] }
      })
  },
  // 删除课程中某个金课：
  delCourseLesson(context, payload) {
    return http({
      method: 'get',
      url: `school/tcourse/lesson/del/${payload.courseId}/${payload.lessonId}`
    })
      .then(res => {
        if (res.code === 0) {
          return 'del success'
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  //获取添加的课堂信息（未创建之前）
  getAddLessonList(context, ids) {
    //console.log('ids:',ids)
    return http({
      method: 'post',
      url: 'school/tlesson/batchinfo',
      data: ids
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
  // 添加课程
  addCourse(context, payload) {
    return http({
      method: 'post',
      url: 'school/tcourse/save',
      data: payload
    })
      .then(res => {
        //console.log('res:', res)
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
  // 编辑课程
  editCourse(context, payload) {
    return http({
      method: 'post',
      url: 'school/tcourse/update',
      data: payload
    })
      .then(res => {
        console.log('res:', res)
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
  // 删除课程
  deleteCourse(context, ids) {
    //console.log(id)
    return http({
      method: 'post',
      url: 'school/tcourse/delete',
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
  // 发布课程
  publishCourse(context, ids) {
    return http({
      method: 'post',
      url: 'school/tcourse/publish',
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
  },
  // 下架课程
  unpublishCourse(context, ids) {
    return http({
      method: 'post',
      url: 'school/tcourse/unpublish',
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
  //回收站课程列表
  getRecycleCourseLsit(context, name) {
    return http({
      method: 'get',
      url: `school/tcourse/recycle/list`,
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
      url: 'school/tcourse/recycle/reset',
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
  // 收藏点赞
  setLike(context, data) {
    return http({
      method: 'post',
      url: `school/tcourse/setview`,
      data
    })
      .then(res => {
        console.log('res:', res)
        if (res.code === 0) {
          return res
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  }
}
