import axios from 'axios'
import merge from 'lodash/merge'
import utils from '@/scripts/utils.js'
import config from '@/scripts/config.js'

// axios基础配置
const http = axios.create({
  baseURL: config.baseUrl,
  // 请求超时时间10秒
  timeout: 10000,
  // 允许携带cookie
  crossDomain: true,
  withCredentials: true
})

// 请求拦截器
http.interceptors.request.use(
  config => {
    // 数据查询请携带时间戳: t=1562489095751
    if (config.params) {
      config.params.t = new Date().getTime()
    } else {
      config.params = {
        t: new Date().getTime()
      }
    }
    // 每次发送请求之前判断vuex中是否存在token
    if (process.client) {
      // console.log('this is client')
      let token = null
      const Cookie = require('js-cookie')
      token = Cookie.get('token')
      if (token) {
        config.headers.token = token
      }
    }
    // console.log('token:', token)
    // console.log('config', config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      const data = response.data
      data.loginCode = data.code // 登录状态吗笨处理法
      if (data.code === 401) {
        data.code = 0
      }
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    const res = error.response || {}
    if (res.status) {
      switch (res.status) {
        // // 401: 未登录
        // // 未登录则跳转登录页面，并携带当前页面的路径
        // // 在登录成功后返回当前页面，这一步需要在登录页操作。
        // case 401:
        //   router.replace({
        //     path: '/login',
        //     query: {
        //       redirect: router.currentRoute.fullPath
        //     }
        //   })
        //   break
        // // 403 token过期
        // // 登录过期对用户进行提示
        // // 清除本地token和清空vuex中token对象
        // // 跳转登录页面
        // case 403:
        //   utils.errMessage('登录过期，请重新登录')
        //   // // 清除token
        //   // localStorage.removeItem('token')
        //   // store.commit('loginSuccess', null)
        //   // // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        //   // setTimeout(() => {
        //   //   router.replace({
        //   //     path: '/login',
        //   //     query: {
        //   //       redirect: router.currentRoute.fullPath
        //   //     }
        //   //   })
        //   // }, 1000)
        //   break
        // 404请求不存在
        case 404:
          utils.errMessage('网络请求不存在')
          break
        // 其他错误，直接抛出错误提示
        default:
          utils.errMessage(res.data.message)
      }
      return Promise.reject(res)
    }
  }
)

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = actionName => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return (
    (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY
      ? '/proxyApi/'
      : config.baseUrl) + actionName
  )
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
  const defaults = {
    t: new Date().getTime()
  }
  return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
  const defaults = {
    t: new Date().getTime()
  }
  data = openDefultdata ? merge(defaults, data) : data
  // axios库好像默认依赖qs不过最好手动写依赖库
  const qs = require('qs')
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}


http.hasToken = () =>{
  const Cookie = require('js-cookie')
  const token = Cookie.get('token')
  if(token){
    return true
  }else{
    return false
  }
}
export default http
