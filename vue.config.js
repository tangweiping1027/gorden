var path = require('path')

const configureWebpack =
  process.env.NODE_ENV === 'production'
    ? {
        externals: {
          vue: 'Vue',
          vuex: 'Vuex',
          'vue-router': 'VueRouter',
          'element-ui': 'ELEMENT',
          axios: 'axios',
          // 'fabric': 'fabric',
          'vue-lazyload': 'VueLazyload',
          clipboard: 'ClipboardJS',
          UE: 'UE'
        }
      }
    : {
        externals: {
          UE: 'UE'
        }
      }
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
module.exports = {
  configureWebpack,
  chainWebpack: config => {
    // 别名
    config.resolve.alias.set('Views', resolve('src/views'))
    config.resolve.alias.set('Components', resolve('src/components'))
    config.resolve.alias.set('Utils', resolve('src/utils'))
    config.resolve.alias.set('Plugins', resolve('src/plugins'))
    config.resolve.alias.set('Router', resolve('src/router'))
    config.resolve.alias.set('Service', resolve('src/service'))
    config.resolve.alias.set('Config', resolve('src/config'))
  }
  // devServer: {
  //   open: true,
  //   quiet: true
  // }
}
