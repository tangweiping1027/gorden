export const requestSuccessFn = function(config) {
  // 请求成功拦截
  console.log(config)
  return config
}
export const requestErrorFn = function(error) {
  // 请求失败拦截
  return Promise.reject(error)
}
export const responceSuccessFn = function(responce) {
  // 返回成功拦截
  return responce.data
}
export const responceErrorFn = function(error) {
  console.log(error)
  // 返回失败拦截
  return Promise.reject(error)
}
