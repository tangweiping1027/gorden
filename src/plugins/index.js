import Ajax from './axios'

export default {
  install: Vue => {
    Vue.prototype.$ajax = Ajax
  }
}
