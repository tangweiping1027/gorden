window.$dataType = function(params) {
  if (params === null) {
    return 'Null'
  } else if (params === undefined) {
    return 'Undefined'
  } else {
    return Object.prototype.toString.call(params).slice(8, -1)
  }
}

window.$isArray = function(params) {
  return window.$dataType(params) == 'Array'
}
window.$isObject = function(params) {
  return window.$dataType(params) == 'Object'
}
window.$isFunction = function(params) {
  return window.$dataType(params) == 'Function'
}
window.$isNull = function(params) {
  return window.$dataType(params) == 'Null'
}
window.$isUndefined = function(params) {
  return window.$dataType(params) == 'Undefined'
}

window.$clone = function(params) {
  return JSON.parse(JSON.stringify(params))
}

window.$isEmpty = function(params) {
  if (window.$isObject(params)) {
    return Object.keys(params).length == 0
  } else if (window.$isArray(params)) {
    return params.length == 0
  } else if (
    window.$isNull(params) ||
    window.$isUndefined(params) ||
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
