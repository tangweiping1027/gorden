import Vue from 'vue'

Vue.prototype.$clone = function(data) {
  return JSON.parse(JSON.stringify(data))
}

Vue.prototype.$wipeRepet = function(origin, value) {
  // 只能去除 [{},{}]
  let obj = {}
  origin.forEach(item => {
    obj[item.value] = item
  })
  return Object.values(obj)
}

// 删除 确认 函数
/**
 * 删除 确认 函数
 * url  arr 需要删除的项集合， key 主键ID
 */
Vue.prototype.$delete = function(url, arr, key) {
  let vm = this
  let params = {}

  if (!vm.$isString(url) || !vm.$isArray(arr) || !vm.$isString(key)) {
    console.warn('返回的需要删除的url：' + url)
    console.warn('返回的处理数据：' + arr)
    console.warn('返回的主键ID：' + key)
    return Promise.reject()
  }
  if (vm.$editMsg(arr, false)) {
    return Promise.reject()
  }
  params[key + 's'] = arr.map(item => item[key])
  return vm
    .$confirm('此操作将删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    .then(() => {
      return vm.$api[url](params)
    })
    .catch(() => {
      vm.$message({
        type: 'info',
        message: '已取消删除'
      })
      return Promise.reject()
    })
}

/**
 * options = [{
   value: 'transportTypeName',
   label: '运输方式',
   maxLen: 40, //最大字符串长度, 默认为100字符
   type: 'number', //qq, phone, user, url, email, number 或者['number',1] 0整数，1位小数，2,两位小数 默认为2位小数，discount折扣数（0.2,0.33）
   opt: [{
     condition: '!value',
     msg: '这个不能为空'
   }]
 }]
 */
Vue.prototype.$formValidate = options => {
  let obj = {}
  for (let index = 0; index < options.length; index++) {
    const item = options[index]
    item.maxLen = item.maxLen ? item.maxLen : 100 //默认字符长度为100
    item.label = item.label ? item.label : ''
    item.required = item.required == false ? item.required : true
    item.must = item.must == false ? item.must : true
    let trigger = item.select == 'undefined' ? 'blur' : 'change'
    if (!item.required) {
      continue
    }
    obj[item.value] = [
      {
        required: item.must,
        trigger,
        validator: (rule, value, callback) => {
          let str = ''
          str += `if(value=='' || value == undefined || value == null) {
              callback(new Error('${item.label}不能为空'))
            }`
          if ($dataType(item.opt) === 'Array' && item.opt.length) {
            // 是否存在opt
            for (let index = 0, len = item.opt.length; index < len; index++) {
              const el = item.opt[index]
              str += `else if (${el.condition}) {
                callback(new Error('${el.msg}'))
              }`
            }
          }
          if ($dataType(value) == 'Array') {
            // 值为数组
            console.log(value)
            if (!value.length) {
              str += `else if (true) {
                callback(new Error('${item.label}不能为空'))
              }`
            }
          } else if ($dataType(value) == 'Object') {
            if (!Object.keys.length) {
              str += `else if (true) {
                callback(new Error('${item.label}不能为空'))
              }`
            }
          } else {
            if (item.type && item.type == 'email') {
              // email 验证
              str += `else if (!specialExp(value,'email')) {
                  callback(new Error('输入的邮箱格式不正确'))
                }`
            } else if (item.type && item.type == 'phone') {
              // phone 验证
              str += `else if (!specialExp(value,'phone')) {
                  callback(new Error('输入的电话号码格式有误'))
                }`
            } else if (item.type && item.type == 'qq') {
              // qq 验证
              str += `else if (!specialExp(value,'qq')) {
                  callback(new Error('输入的qq号码格式有误'))
                }`
            } else if (item.type && item.type == 'url') {
              // url 验证
              str += `else if (!specialExp(value,'url')) {
                  callback(new Error('输入的url格式有误'))
                }`
            } else if (item.type && item.type == 'user') {
              // user 验证
              str += `else if (!specialExp(value,'user')) {
                  callback(new Error('输入的用户名格式有误'))
                }`
            } else if (item.type && item.type == 'fax') {
              // user 验证
              str += `else if (!specialExp(value,'fax')) {
                  callback(new Error('输入的用户名格式有误'))
                }`
            } else if (item.type && item.type == 'user') {
              // user 验证
              str += `else if (!specialExp(value,'user')) {
                  callback(new Error('输入的用户名格式有误'))
                }`
            } else if (item.type == 'discount') {
              str += `else if (!specialExp(value,'discount')) {
                      callback(new Error('${item.label}必须为1或者1-2位小数'))
                    }`
            } else if (
              item.type &&
              (item.type == 'number' || $dataType(item.type) == 'Array')
            ) {
              // 数字验证
              if (
                $dataType(item.type) == 'Array' &&
                item.type[1] == 'undefined'
              ) {
                item.type[1] == 2
              }
              if ($dataType(item.type) == 'Array') {
                if (item.type[1]) {
                  str += `else if (!specialExp(value,'number',${
                    item.type[1]
                  })) {
                      callback(new Error('${item.label}必须为${
                    item.type[1]
                  }有效小数'))
                    }`
                } else {
                  str += `else if (!specialExp(value,'number',${
                    item.type[1]
                  })) {
                      callback(new Error('${item.label}必须为有效整数'))
                    }`
                }
              } else {
                str += `else if (!specialExp(value,'number',2)) {
                    callback(new Error('${item.label}必须为有效2位小数数字'))
                  }`
              }
            } else {
              // 特殊字符验证
              str += `else if (specialExp(value,'special')) {
                  callback(new Error('${item.label}不能为特殊字符'))
              }`
            }
          }

          str += `else if (value.length > ${item.maxLen}) {
                  callback(new Error('${item.label}字符不能超过${item.maxLen}'))
                }else {
                  callback()
                }` // 字符长度验证
          new Function(`value`, 'callback', 'specialExp', str)(
            value,
            callback,
            specialExp
          )
        }
      }
    ]
  }
  return obj
}

function specialExp(val, type, numType) {
  if (type && type == 'special') {
    // 特殊字符类型
    // eslint-disable-next-line
    return /[~@#$%^&*()_\+=<>:{}|/\\[\]~#￥%&*（）——\+={}|《》：【】]/im.test(
      val
    ) //特殊字符验证
  } else if (type == 'email') {
    // email 类型
    // eslint-disable-next-line
    return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
      val
    ) //邮箱验证
  } else if (type == 'number') {
    // 数字类型
    if (numType == '0') {
      console.log(val)
      return /^(0|[1-9]\d*)$/.test(Number(val)) //整数或者0
    } else {
      // eslint-disable-next-line\
      return new RegExp(
        `^(([1-9]{1}\\d*)|0)(\\.\\d{1,${Number(numType)}})?$`
      ).test(Number(val)) //正数并且限制2位以内的小数
    }
  } else if (type == 'discount') {
    // 折扣
    return /(^0\.[1-9]{1,2}$)|(^0\.[0-9]{1}[1-9]{1}$)|(^1{1}$)|(^1{1}\.0{2}$)|(^1{1}\.0{1}$)/.test(
      val
    )
  } else if (type == 'phone') {
    // 手机号类型
    return Object.values(GLOBAL.$const['OTHER/phoneExp']).some(item =>
      item.test(val)
    )
    // return /^1[34578]\d{9}$/.test(val)
  } else if (type == 'qq') {
    // qq类型
    // eslint-disable-next-line
    return /^[1-9][0-9]{4,10}$/.test(val)
  } else if (type == 'url') {
    // eslint-disable-next-line
    return /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/.test(
      val
    )
  } else if (type == 'user') {
    return /^[a-zA-Z0-9_\-\u4E00-\u9FA5]{4,16}$/.test(val)
  } else if (type == 'fax') {
    return /^(\d{3,4}-)?\d{7,8}$/.test(val)
  }
}

export default {}
