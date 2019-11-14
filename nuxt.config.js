import path from 'path'
import pkg from './package'

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    // title: pkg.name,
    title: '丝路师语',
    // title: path.resolve(__dirname, './assets/styles/variables.less'),
    meta: [
      { charset: 'utf-8' },
      // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/style/normalize.css' }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css', 'assets/styles/global.less'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // '@/plugins/element-ui'
    {
      src: '@/plugins/element-ui'
    },
    // global filter
    {
      src: '@/plugins/filter'
    },
    // qr-code
    {
      src: '@/plugins/qr-code',
      ssr: false
    },
    // quill-edidor
    {
      src: '@/plugins/quill-editor',
      ssr: false
    },
    // a-sourse
    {
      src: '@/plugins/a-sourse'
    },
    // main
    {
      src: '@/plugins/main'
    }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/style-resources-module.git
    '@nuxtjs/style-resources'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    vendor: ['jsencrypt'],
    transpile: [/^element-ui/],

    styleResources: {
      less: ['./assets/styles/variables.less','./assets/styles/main.less']
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  },

  server: {
    port: 8080,
    host: '0.0.0.0'
  }
}
