import tPage from './src'

tPage.install = function(Vue) {
  Vue.component(tPage.name, tPage)
}

export default tPage
