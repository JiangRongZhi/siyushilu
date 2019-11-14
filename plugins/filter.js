import Vue from 'vue'
import utils from '@/scripts/utils.js'

export default () => {
  // 全局注册过滤器

  // 格式化时间
  Vue.filter('filterDate', function(value, format) {
    format = format || 'yyyy-MM-dd'
    return utils.formatDate(new Date(value), format)
  })
  // 格式化搜索字符串
  Vue.filter('filterSearch', function(value, searchText) {
    return utils.searchHighLight(value, searchText)
  })
}
