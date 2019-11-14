import { Message } from 'element-ui'

// 错误提示
const errMessage = function(msg) {
  Message({
    type: 'error',
    showClose: true,
    message: msg
  })
}

// 成功提示
const successMessage = function(msg) {
  Message({
    type: 'success',
    showClose: true,
    message: msg
  })
}

// 获取uuid
const getUUID = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16)
  })
}

// 格式化时间
const formatDate = function(date, format) {
  const args = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (const i in args) {
    const n = args[i]
    if (new RegExp('(' + i + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? n : ('00' + n).substr(('' + n).length)
      )
    }
  }
  return format
}

// 搜索匹配高量
const searchHighLight = function(str='', searchText, template) {
  template = template || '<span class="search-text">' + searchText + '</span>'
  const reg = new RegExp(searchText, 'g')
  const result = str.replace(reg, template)
  // console.log(str, searchText, template, reg, result)
  return result
}

/**
*判断是否是数字
*
**/
function isRealNum(val) {
  // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，
  if (val === "" || val ==null) {
    return false
　}
  if (!isNaN(val)) {
    //对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
    //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
    return true
  } else {
    return false
  }
}


// export
export default {
  errMessage,
  successMessage,
  getUUID,
  formatDate,
  searchHighLight,
  isRealNum
}
