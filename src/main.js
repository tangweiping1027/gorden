import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'Components'
import { router } from './router'
import plugins from './plugins'

Vue.use(ElementUI)
Vue.use(plugins)
Vue.config.productionTip = false
Vue.prototype.glob = window

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
