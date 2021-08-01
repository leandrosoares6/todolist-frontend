import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    titleTemplate: '%s - todolist-frontend-updated',
    title: 'todolist-frontend-updated',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Nunito&display=swap' }
    ]
  },

  css: [
  ],

  loading: { color: '#ffb300' },
  pageTransition: 'jump',
  plugins: [
    'plugins/date-filter.js',
    'plugins/truncate-filter.js'
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify'
  ],

  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: 'http://localhost:8080/',
    proxyHeaders: false,
    credentials: false,
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss']
  }
}
