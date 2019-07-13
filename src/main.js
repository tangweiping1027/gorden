import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/index.scss'
import 'Components'
import { router } from './router'
import plugins from './plugins'
import utils from './utils'
import VueDND from 'awe-dnd'
import yutoo from '@yutoo/yutoo'
import myNpmUtils from 'my-npm-utils'

myNpmUtils(Vue)
Vue.use(yutoo)
Vue.use(VueDND)
Vue.use(ElementUI)
Vue.use(plugins)
Vue.use(utils)
Vue.config.productionTip = false
Vue.prototype.glob = window

// 全局 event bus 用来发布订阅
GLOBAL.vbus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
