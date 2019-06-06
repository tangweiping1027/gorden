var path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
module.exports = {
  chainWebpack: config => {
    // 别名
    config.resolve.alias.set('Views', resolve('src/views'))
    config.resolve.alias.set('Components', resolve('src/components'))
  }
}
