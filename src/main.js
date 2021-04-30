import { createApp } from 'vue'
import App from './App.vue'

/* 引入路由 */
import router from './router'

/* 引入公共样式 */
import '@/styles/common.css'

/** px2rem */
import 'lib-flexible/flexible.js'

import 'vant/lib/index.css'

/* 用于低版本浏览器兼容问题 es6语法兼容 */
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

const Vue = createApp(App)
Vue.use(router)

Vue.mount('#app')
