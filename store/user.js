import http from '@/scripts/http.js'
import utils from '@/scripts/utils.js'
import { RASCoder } from '@/scripts/rsa-coder.js'

const defaultUserInfo = {
  userId: '',
  userNo: '',
  username: '',
  sex: null,
  mobile: '',
  status: null,
  createUserId: '',
  createTime: '',
  type: null
}
export const state = () => ({
  userInfo: defaultUserInfo
})

export const actions = {
  // 获取验证码（以抛弃）
  getCaptcha(context, uuid) {
    return http({
      url: `/captcha.jpg?uuid=${uuid}`
    })
      .then(res => {
        console.log('res:', res)
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  // 登录
  login(context, payload) {
    payload.password = RASCoder(payload.passwd)
    return http({
      method: 'post',
      url: 'sys/login',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      data: {
        ...payload,
        passwd: ''
      }
    })
      .then(res => {
        // console.log('res:', res)
        if (res.code === 0) {
          context.commit('setToken', {
            token: res.token,
            expire: res.expire
          })
          context.dispatch('getUserInfo')
          return 'success'
        } else {
          utils.errMessage(res.msg)
          return 'refresh-verify'
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  // 客户端获取用户信息
  getUserInfo(context, payload) {
    //console.log('getUserInfo', payload)


    // debugger
    const hasToken = http.hasToken()
    //console.log("hasToken:"+hasToken)
    if (!hasToken) {
      context.commit('logout')
      return 'noLogin'
    }

    // debugger
    return http({
      url: '/sys/user/info'
    })
      .then(res => {
        // console.log('res:', res)
        if (res && res.loginCode === 0) {
          context.commit('setUserInfo', res.user)
        } else if (res.loginCode === 401) {
          // console.log('token 过期')
          context.commit('logout')
          return 'noLogin'
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  // 服务端获取用户信息
  getUserInfoOnServer(context, payload) {
    //console.log('getUserInfoOnServer', payload)
    if (payload.token) {
      return http({
        url: '/sys/user/info',
        headers: {
          token: payload.token
        }
      })
        .then(res => {
          // console.log('yes', res)
          if (res.code === 0) {
            context.commit('setUserInfo', res.user)
          }
          return 1
        })
        .catch(() => {
          // console.log('nono')
          return 0
        })
    }
  },
  // 客户端获取用户信息
  getUserDetail(context, payload) {
    // debugger
    return http({
      url: '/sys/user/detail'
    })
      .then(res => {
        // console.log('res:', res)
        if (res && res.code === 0) {
          return res
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  //更新用户信息(老师)
  updateUserInfo(context, payload) {
    let cids = []
    let i = 0
    for (let i in payload.teacherClassList) {
      let ls = payload.teacherClassList[i]
      cids[i++] = ls[ls.length - 1]

    }
    const data = {
      tid: payload.tid,
      name: payload.name,
      email: payload.email,
      birth: payload.date1,
      lesson: payload.lesson,
      professionName: payload.professionName,
      mphone: payload.mphone,
      sex: payload.sex,
      classList: cids
    }
    //console.log("classList",data.classList)
    return http({
      method: 'post',
      url: 'sys/user/teacher/update',
      data
    })
      .then(res => {
        if (res && res.code === 0) {
          return res
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  //更新用户信息（学生）
  updateStudentInfo(context, payload) {
    const data = {
      id: payload.id,
      sex: payload.sex,
      mphone: payload.mphone,
      email: payload.email,
      professionName: payload.professionName,
      birth: payload.date1
    }
    return http({
      method: 'post',
      url: '/sys/user/student/update',
      data
    })
      .then(res => {
        if (res && res.code === 0) {
          return res
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  //获取用户email
  getEmail(context, formData) {
    const data = {
      userNo: formData.userNo,
      captcha: formData.captcha,
      uuid: formData.uuid
    }
    //console.log(username)
    return http({
      method: 'post',
      url: 'forget/email',
      data
    })
      .then(res => {
        if (res && res.code === 0) {
          return res
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  //获取用户Email验证码
  getEmailCode(context, key) {
    const data = {
      key: key
    }
    return http({
      method: 'post',
      url: 'forget/sendemail',
      data
    })
      .then(res => {
        if (res && res.code === 0) {
          return res
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  //验证邮箱验证码
  checkEmailCode(context, data) {
    return http({
      method: 'post',
      url: 'forget/checkEmailCode',
      data
    })
      .then(res => {
        if (res && res.code === 0) {
          return res
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  resetPassword2(context, payload) {
    const data = {
      key: payload.key,
      newPassword: RASCoder(payload.newpassword1)
    }
    //console.log(data)
    return http({
      method: 'post',
      url: 'forget/resetPass',
      data
    })
      .then(res => {
        if (res && res.code === 0) {
          return res
        } else {
          utils.errMessage(res.msg)
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  //重置密码
  resetPassword(context, payload) {
    const data = {
      password: RASCoder(payload.password),
      newPassword: RASCoder(payload.newpassword1)
    }
    //console.log(data)
    return http({
      method: 'post',
      url: 'sys/user/password',
      data
    })
      .then(res => {
        if (res && res.code === 0) {
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


export const mutations = {
  // 存储token 写入cookie
  setToken(state, data) {
    // expires: some days from now
    const Cookie = process.client ? require('js-cookie') : undefined
    Cookie.set('token', data.token, { expires: data.expire / 3600 / 24 })
  },
  // 退出
  logout(context, payload) {
    const Cookie = process.client ? require('js-cookie') : undefined
    Cookie.remove('token')
    state.userInfo = defaultUserInfo
  },
  // 存储用户信息
  setUserInfo(state, data) {
    state.userInfo = data
  }
}
