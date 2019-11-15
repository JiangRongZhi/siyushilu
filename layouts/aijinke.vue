<template>
  <div class="app-wrap">
    <!-- <Header v-if="userInfo.userNo"></Header> -->
    <Navigator></Navigator>
    <nuxt />
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/public/Header'
import Navigator from '@/components/public/Navigator'
import Footer from '@/components/public/Footer'
export default {
  middleware: 'auth',
  components: {
    Header,
    Navigator,
    Footer
  },
  computed: {
    ...mapState('user', ['userInfo'])
  }
}
</script>
