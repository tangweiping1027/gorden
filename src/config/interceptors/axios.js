export const requestSuccessFn = function(config) {
  console.log(config)
  return config
}
export const requestErrorFn = function(error) {
  return Promise.reject(error)
}
export const responceSuccessFn = function(responce) {
  return responce
}
export const responceErrorFn = function(error) {
  return Promise.reject(error)
}
