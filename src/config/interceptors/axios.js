import axios from 'axios'
import storage from 'Utils/storage'
let CancelToken = axios.CancelToken
let pending = []
let removePending = config => {
  for (const p in pending) {
    if (pending.hasOwnProperty(p)) {
      const item = pending[p]
      if (!config) {
        item.f()
        pending.splice(p, 1)
      } else {
        if (item.u === config.url + '&' + config.method) {
          item.f()
          pending.splice(p, 1)
        }
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
  config.headers.token = storage.get('login')
  return config
}
export const requestErrorFn = function(error) {
  // 请求失败拦截
  return Promise.reject(error)
}
export const responceSuccessFn = function(responce) {
  let resData = responce.data
  let { code, msg, status } = resData
  switch (code) {
    case 0:
      break

    default:
      break
  }
  // 返回成功拦截
  removePending(responce.config)
  return responce.data
}
export const responceErrorFn = function(error) {
  // 返回失败拦截
  return Promise.reject(error)
}
