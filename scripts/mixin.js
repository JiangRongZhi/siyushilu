import { mapMutations } from 'vuex'
export const hasToken = {
  methods: {
    ...mapMutations('user', ['setToken'])
  },
  mounted() {
    const query = this.$route.query
    if (query && query.token) {
      this.setToken({
        token: query.token,
        expire: 3600 * 24
      })
    }
  }
}
