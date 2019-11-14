import Vue from 'vue'
import VueCookie from 'vue-cookie'
import http from '@/scripts/http'
import echarts from 'echarts'

Vue.use(VueCookie)
Vue.prototype.$http = http // ajax请求方法
Vue.prototype.$echarts = echarts
