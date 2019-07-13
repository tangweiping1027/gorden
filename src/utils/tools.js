import Vue from 'vue'
Vue.prototype.$dataType = function(params) {
  if (params === null) {
    return 'Null'
  } else if (params === undefined) {
    return 'Undefined'
  } else {
    return Object.prototype.toString.call(params).slice(8, -1)
  }
}

Vue.prototype.$isArray = function(params) {
  return this.$dataType(params) == 'Array'
}
Vue.prototype.$isObject = function(params) {
  return this.$dataType(params) == 'Object'
}
Vue.prototype.$isFunction = function(params) {
  return this.$dataType(params) == 'Function'
}
Vue.prototype.$isNull = function(params) {
  return this.$dataType(params) == 'Null'
}
Vue.prototype.$isUndefined = function(params) {
  return this.$dataType(params) == 'Undefined'
}

Vue.prototype.$clone = function(params) {
  return JSON.parse(JSON.stringify(params))
}

Vue.prototype.$isEmpty = function(params) {
  if (this.$isObject(params)) {
    return Object.keys(params).length == 0
  } else if (this.$isArray(params)) {
    return params.length == 0
  } else if (
    this.$isNull(params) ||
    this.$isUndefined(params) ||
    params == '' ||
    params != params
  ) {
    return true
  } else {
    return false
  }
}

function $apiFormat(name, desc, showSuccess = true, mock = false) {
  let formatPath = function(name) {
    let str = name.replace(/[A-Z]/g, function(word) {
      return '/' + word.toLowerCase()
    })
    let reg = /^\//g
    if (!reg.test(str)) {
      str = '/' + str
    }
    return str
  }
  return {
    name,
    desc,
    method: 'POST',
    showSuccess,
    mock,
    path: formatPath(name),
    mockPath: formatPath(name),
    params: {}
  }
}

export function assert(condition, msg) {
  if (!condition) throw new Error(`[Apior] ${msg}`)
}
