import Vue from 'vue'

Vue.prototype.$clone = function(data) {
  return JSON.parse(JSON.stringify(data))
}

Vue.prototype.$wipeRepet = function(origin, value) {
  // 只能去除 [{},{}]
  let obj = {}
  console.log(origin)
  origin.forEach(item => {
    obj[item.value] = item
  })
  return Object.values(obj)
}

export default {}
