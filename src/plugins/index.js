import Ajax from './axios'
import $ from "./$";

export default {
  install: Vue => {
    Vue.prototype.$ajax = Ajax
    Vue.prototype.$ = $
  }
}
