import Vue from 'vue'

Vue.prototype.$clone = function(data) {
  return JSON.parse(JSON.stringify(data))
}

export default {}
