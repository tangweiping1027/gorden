import axios from 'axios'

let CancelToken = axios.CancelToken
let pending = []
let removePending = config => {
  for (const p in pending) {
    if (pending.hasOwnProperty(p)) {
      const item = pending[p]
      if (item.u === config.url + '&' + config.method) {
        item.f()
        pending.splice(p, 1)
      }
    }
  }
}

export const requestSuccessFn = function(config) {
  removePending(config)
  config.cancelToken = new CancelToken(c => {
    pending.push({
      u: config.url + '&' + config.method,
      f: c
    })
  })
  // 请求成功拦截
  console.log(config)
  return config
}
export const requestErrorFn = function(error) {
  // 请求失败拦截
  return Promise.reject(error)
}
export const responceSuccessFn = function(responce) {
  console.log(responce)
  // 返回成功拦截
  removePending(responce.config)
  return responce.data
}
export const responceErrorFn = function(error) {
  console.log(error)
  // 返回失败拦截
  return Promise.reject(error)
}
