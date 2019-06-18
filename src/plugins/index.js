import Ajax from './axios'
import $ from './$'
import api from './api'

export default {
  install: Vue => {
    Vue.prototype.$ajax = Ajax
    Vue.prototype.$ = $
    Vue.prototype.$api = api
  }
}
