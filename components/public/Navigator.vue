<template>
  <div class="navigator-wrap">
    <div class="container-1200">
      <el-image class="site-logo" src="/image/logo.png" alt="site logo" />
      <el-menu
        class="navigator-menu"
        :default-active="menuActive"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="index">首页</el-menu-item>
        <el-menu-item index="lesson">课堂资源库</el-menu-item>
        <el-menu-item index="course">课程资源库</el-menu-item>
        <el-menu-item index="mine-lesson-manager" v-if="usertype == 1">我的资源</el-menu-item>
        <el-menu-item index="mine-collection-lesson" v-if="usertype == 2">我的资源</el-menu-item>
      </el-menu>

      <div v-if="menuActives == 'lesson' || menuActives == 'course'" class="navigator-input">
        <el-input v-model="navSearchText" placeholder="请输入搜索内容" @keyup.enter.native="handleSearch">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch" />
        </el-input>
      </div>

      <div v-if="userInfo.userNo" class="user-info">
        <el-dropdown @command="handleCommand">
          <div class="user-info-dropdown">
            <el-image
              v-if="sex == 2 && usertype == 1"
              src="/image/avatar/teacher-female-2.png"
              class="user-avatar"
            ></el-image>
            <el-image
              v-if="sex == 1  && usertype == 1"
              src="/image/avatar/teacher-male-2.png"
              class="user-avatar"
            ></el-image>
            <el-image v-if="usertype == 2" src="/image/avatar/student2.png" class="user-avatar"></el-image>
            {{ userInfo.username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user" command="ucenter">我的主页</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-else class="user-info">
        <el-button plain @click="loginVisible = true">登录</el-button>
        <el-dialog :title="fromtitle" :visible.sync="loginVisible" width="30%">
          <Login @cancel="loginVisible = false" v-if="!forgetChecked"></Login>
          <nuxt-link :to="{path:'/forget'}" class="btn-forget">忘记密码？</nuxt-link>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Login from '@/components/public/Login.vue'
export default {
    components: {
        Login
    },
    data() {
        return {
            fromtitle: '用户登录',
            loginChecked: true,
            forgetChecked: false,
            resetChecked: false,
            menuActive: 'index',
            menuActives: '',
            navSearchText: '',
            loginVisible: false,
            usertype: null,
            sex: null
        }
    },

    computed: {
        ...mapState('user', ['userInfo'])
    },
    mounted() {
        // this.$router.beforeEach((to, from, next) => {
        //     console.log(to,from)
        // })

        // get user info
        this.getUserInfoAction()
        // 首次进入
        this.updateMenuActive(this.$router.currentRoute.name)
        // 切换路径后
        this.$router.afterEach(to => {
            // console.log('to:', to)
            this.updateMenuActive(to.name)
            this.checkLogin()
        })

        // console.log("------userINfo:"+this.$store.state.user)
    },
    methods: {
        ...mapMutations('user', ['logout']),
        ...mapActions('user', ['getUserInfo','updateToken']),
        //忘记密码
        // 检测登录
        checkLogin() {
            const routeName = this.$route.name
            const userId = this.userInfo.userId
            const query = this.$route.query
            const noLogin = query.login === 'no'
            // 首页带loign=no
            if (userId === '' && routeName === 'index' && noLogin) {
                this.loginVisible = true
            }
            if (userId === '' && routeName === 'forget') {
            }
            // 非首页跳转首页
            if (
                userId === '' &&
                routeName !== 'index' &&
                routeName !== 'forget'
            ) {
                return this.$router.push({ path: '/?login=no' })
            }
        },
        getUserInfoAction() {
            const query = this.$route.query
            //console.log(query.token)
            if(query.token){
                this.updateToken(query.token)
            }
            this.getUserInfo().then(res => {
                if (res === 'noLogin') {
                    this.checkLogin()
                } else {
                    this.sex = this.userInfo.sex
                    this.usertype = this.userInfo.type
                    //console.log("sex-usertype:"+this.sex+"-"+this.usertype)
                    //console.log(this.$route)
                }
            })
        },
        updateMenuActive(name) {
            const query = this.$route.query
            if (query.from) {
                this.menuActive = query.from
            } else {
                this.menuActive = name
                this.menuActives = name
            }
        },
        handleSelect(e) {
            this.$router.push({ name: e })
        },
        handleSearch() {
            // console.log(this.menuActive, this.navSearchText)
            this.$router.push({
                path: '/' + this.menuActive + '/search',
                query: { word: this.navSearchText, from: this.menuActive }
            })
        },
        handleUcenter() {
            this.$router.push({
                path: '/stat/ucenter'
            })
        },
        handleCommand(e) {
            switch (e) {
                case 'logout':
                    this.logout()
                    location.reload()
                    break
                case 'ucenter':
                    this.handleUcenter()
                    break
                default:
                    console.log(e)
            }
        }
    }
}
</script>

<style lang="less">
.navigator-wrap {
    height: 88px;
    // background-color: @color-bgc-white;
    border-bottom: 1px solid @color-border-gray;
    .site-logo {
        display: inline;
        float: left;
        margin-top: 20px;
        margin-left: 10px;
        height: 50px;
        width: 190px;
        vertical-align: top;
    }
    .navigator-menu {
        display: inline-block;
        margin-left: 52px;
        .trp;
    }
    .el-menu.el-menu--horizontal {
        border-bottom: none;
        .el-menu-item {
            height: 88px;
            line-height: 88px;
            font-size: 20px;
            color: #303133;
            padding: 0;
            margin: 0 20px;
        }
        .el-menu-item.is-active {
            border-bottom: 5px solid @color-bgc-primary;
        }
    }
}

.navigator-input {
    display: inline-block;
    vertical-align: top;
    margin-top: 25px;
    margin-left: 20px;
}
.user-info {
    float: right;
    margin-top: 20px;
    .btn-forget {
        float: right;
        color: #606266;
        text-decoration: none;
    }
    .user-info-dropdown {
        line-height: 50px;
        font-weight: bold;
        .user-avatar {
            margin-right: 5px;
            vertical-align: top;
        }
    }
}
</style>
