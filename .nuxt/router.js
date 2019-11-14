import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _622d46ef = () => interopDefault(import('../pages/course/index.vue' /* webpackChunkName: "pages/course/index" */))
const _6f57aa41 = () => interopDefault(import('../pages/forget/index.vue' /* webpackChunkName: "pages/forget/index" */))
const _15c713cc = () => interopDefault(import('../pages/lesson/index.vue' /* webpackChunkName: "pages/lesson/index" */))
const _302a6628 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _4b212ed8 = () => interopDefault(import('../pages/personal/index.vue' /* webpackChunkName: "pages/personal/index" */))
const _7bcea684 = () => interopDefault(import('../pages/course/detail.vue' /* webpackChunkName: "pages/course/detail" */))
const _e18b1f4a = () => interopDefault(import('../pages/course/search.vue' /* webpackChunkName: "pages/course/search" */))
const _3b6e7547 = () => interopDefault(import('../pages/lesson/detail.vue' /* webpackChunkName: "pages/lesson/detail" */))
const _1f9d6600 = () => interopDefault(import('../pages/lesson/edit.vue' /* webpackChunkName: "pages/lesson/edit" */))
const _4eda3f1e = () => interopDefault(import('../pages/lesson/search.vue' /* webpackChunkName: "pages/lesson/search" */))
const _5302fe67 = () => interopDefault(import('../pages/mobile/course.vue' /* webpackChunkName: "pages/mobile/course" */))
const _c0ca4466 = () => interopDefault(import('../pages/mobile/login.vue' /* webpackChunkName: "pages/mobile/login" */))
const _3b77e62d = () => interopDefault(import('../pages/mobile/player.vue' /* webpackChunkName: "pages/mobile/player" */))
const _5163bd4d = () => interopDefault(import('../pages/stat/stuStatistics.vue' /* webpackChunkName: "pages/stat/stuStatistics" */))
const _534a28e0 = () => interopDefault(import('../pages/stat/ucenter.vue' /* webpackChunkName: "pages/stat/ucenter" */))
const _7cb201ad = () => interopDefault(import('../pages/stat/ucenter_bak.vue' /* webpackChunkName: "pages/stat/ucenter_bak" */))
const _5de8c184 = () => interopDefault(import('../pages/mine/collection/cdetail.vue' /* webpackChunkName: "pages/mine/collection/cdetail" */))
const _7cb90a7e = () => interopDefault(import('../pages/mine/collection/course.vue' /* webpackChunkName: "pages/mine/collection/course" */))
const _cf4509e4 = () => interopDefault(import('../pages/mine/collection/course_bak.vue' /* webpackChunkName: "pages/mine/collection/course_bak" */))
const _4e85b065 = () => interopDefault(import('../pages/mine/collection/folderdetail.vue' /* webpackChunkName: "pages/mine/collection/folderdetail" */))
const _27491d44 = () => interopDefault(import('../pages/mine/collection/lesson.vue' /* webpackChunkName: "pages/mine/collection/lesson" */))
const _67be3046 = () => interopDefault(import('../pages/mine/collection/recycle.vue' /* webpackChunkName: "pages/mine/collection/recycle" */))
const _c57b0a90 = () => interopDefault(import('../pages/mine/collection/recyclecourse.vue' /* webpackChunkName: "pages/mine/collection/recyclecourse" */))
const _652c464c = () => interopDefault(import('../pages/mine/course/detail.vue' /* webpackChunkName: "pages/mine/course/detail" */))
const _4a639653 = () => interopDefault(import('../pages/mine/course/edit.vue' /* webpackChunkName: "pages/mine/course/edit" */))
const _5efacf74 = () => interopDefault(import('../pages/mine/course/manager.vue' /* webpackChunkName: "pages/mine/course/manager" */))
const _a335614c = () => interopDefault(import('../pages/mine/course/recycle.vue' /* webpackChunkName: "pages/mine/course/recycle" */))
const _5c970d06 = () => interopDefault(import('../pages/mine/lesson/addlesson.vue' /* webpackChunkName: "pages/mine/lesson/addlesson" */))
const _e5eca8c6 = () => interopDefault(import('../pages/mine/lesson/detail.vue' /* webpackChunkName: "pages/mine/lesson/detail" */))
const _0e1e39d6 = () => interopDefault(import('../pages/mine/lesson/edit.vue' /* webpackChunkName: "pages/mine/lesson/edit" */))
const _aab840ea = () => interopDefault(import('../pages/mine/lesson/folderdetail.vue' /* webpackChunkName: "pages/mine/lesson/folderdetail" */))
const _d9564dde = () => interopDefault(import('../pages/mine/lesson/manager.vue' /* webpackChunkName: "pages/mine/lesson/manager" */))
const _3a814e12 = () => interopDefault(import('../pages/mine/lesson/recycle.vue' /* webpackChunkName: "pages/mine/lesson/recycle" */))
const _bf151518 = () => interopDefault(import('../pages/mine/lesson/search.vue' /* webpackChunkName: "pages/mine/lesson/search" */))
const _250aee64 = () => interopDefault(import('../pages/stat/teacher/classStatistics.vue' /* webpackChunkName: "pages/stat/teacher/classStatistics" */))
const _5e01f30a = () => interopDefault(import('../pages/stat/teacher/statistics.vue' /* webpackChunkName: "pages/stat/teacher/statistics" */))
const _6ebbaf0e = () => interopDefault(import('../pages/stat/teacher/teacherStatistics.vue' /* webpackChunkName: "pages/stat/teacher/teacherStatistics" */))
const _6682c311 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/course",
      component: _622d46ef,
      name: "course"
    }, {
      path: "/forget",
      component: _6f57aa41,
      name: "forget"
    }, {
      path: "/lesson",
      component: _15c713cc,
      name: "lesson"
    }, {
      path: "/login",
      component: _302a6628,
      name: "login"
    }, {
      path: "/personal",
      component: _4b212ed8,
      name: "personal"
    }, {
      path: "/course/detail",
      component: _7bcea684,
      name: "course-detail"
    }, {
      path: "/course/search",
      component: _e18b1f4a,
      name: "course-search"
    }, {
      path: "/lesson/detail",
      component: _3b6e7547,
      name: "lesson-detail"
    }, {
      path: "/lesson/edit",
      component: _1f9d6600,
      name: "lesson-edit"
    }, {
      path: "/lesson/search",
      component: _4eda3f1e,
      name: "lesson-search"
    }, {
      path: "/mobile/course",
      component: _5302fe67,
      name: "mobile-course"
    }, {
      path: "/mobile/login",
      component: _c0ca4466,
      name: "mobile-login"
    }, {
      path: "/mobile/player",
      component: _3b77e62d,
      name: "mobile-player"
    }, {
      path: "/stat/stuStatistics",
      component: _5163bd4d,
      name: "stat-stuStatistics"
    }, {
      path: "/stat/ucenter",
      component: _534a28e0,
      name: "stat-ucenter"
    }, {
      path: "/stat/ucenter_bak",
      component: _7cb201ad,
      name: "stat-ucenter_bak"
    }, {
      path: "/mine/collection/cdetail",
      component: _5de8c184,
      name: "mine-collection-cdetail"
    }, {
      path: "/mine/collection/course",
      component: _7cb90a7e,
      name: "mine-collection-course"
    }, {
      path: "/mine/collection/course_bak",
      component: _cf4509e4,
      name: "mine-collection-course_bak"
    }, {
      path: "/mine/collection/folderdetail",
      component: _4e85b065,
      name: "mine-collection-folderdetail"
    }, {
      path: "/mine/collection/lesson",
      component: _27491d44,
      name: "mine-collection-lesson"
    }, {
      path: "/mine/collection/recycle",
      component: _67be3046,
      name: "mine-collection-recycle"
    }, {
      path: "/mine/collection/recyclecourse",
      component: _c57b0a90,
      name: "mine-collection-recyclecourse"
    }, {
      path: "/mine/course/detail",
      component: _652c464c,
      name: "mine-course-detail"
    }, {
      path: "/mine/course/edit",
      component: _4a639653,
      name: "mine-course-edit"
    }, {
      path: "/mine/course/manager",
      component: _5efacf74,
      name: "mine-course-manager"
    }, {
      path: "/mine/course/recycle",
      component: _a335614c,
      name: "mine-course-recycle"
    }, {
      path: "/mine/lesson/addlesson",
      component: _5c970d06,
      name: "mine-lesson-addlesson"
    }, {
      path: "/mine/lesson/detail",
      component: _e5eca8c6,
      name: "mine-lesson-detail"
    }, {
      path: "/mine/lesson/edit",
      component: _0e1e39d6,
      name: "mine-lesson-edit"
    }, {
      path: "/mine/lesson/folderdetail",
      component: _aab840ea,
      name: "mine-lesson-folderdetail"
    }, {
      path: "/mine/lesson/manager",
      component: _d9564dde,
      name: "mine-lesson-manager"
    }, {
      path: "/mine/lesson/recycle",
      component: _3a814e12,
      name: "mine-lesson-recycle"
    }, {
      path: "/mine/lesson/search",
      component: _bf151518,
      name: "mine-lesson-search"
    }, {
      path: "/stat/teacher/classStatistics",
      component: _250aee64,
      name: "stat-teacher-classStatistics"
    }, {
      path: "/stat/teacher/statistics",
      component: _5e01f30a,
      name: "stat-teacher-statistics"
    }, {
      path: "/stat/teacher/teacherStatistics",
      component: _6ebbaf0e,
      name: "stat-teacher-teacherStatistics"
    }, {
      path: "/",
      component: _6682c311,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
