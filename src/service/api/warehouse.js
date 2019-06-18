export default [
  $apiFormat('ebayReturnReasonList', '退换货请求列表-退货原因列表')
]

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
