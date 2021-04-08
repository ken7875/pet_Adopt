import en from './locales/en.js'
import tw from './locales/tw.js'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '寵物領養網站',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { property: 'og:url', content: 'https://nuxt-pet-adopt.herokuapp.com/' },
      { hid: 'description', name: 'description', content: '寵物領養查詢查詢' }
    ],
    link: [
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { href: 'https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap' },
      { rel: 'stylesheet', href: 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css', integrity: 'sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p', crossorigin: 'anonymous' }
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],
  loading: '@/components/loading',
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: [
      '~assets/css/all.scss'
    ]
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'nuxt-i18n'
  ],
  proxy: {
    '/api': {
      target: 'https://data.coa.gov.tw/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    prefix: '/apiService/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL',
    credentials: true
  },
  i18n: {
    locales: ['en', 'zh-tw'],
    defaultLocale: 'zh-tw',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en,
        'zh-tw': tw
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
