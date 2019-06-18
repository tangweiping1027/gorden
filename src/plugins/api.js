import API_CONFIG from 'Service/api'
import axios from './axios'
import _pick from 'lodash/pick'
import _assign from 'lodash/assign'
import _isEmpty from 'lodash/isEmpty'
import { assert } from 'Utils/tools'
import {
  API_DEFAULT_CONFIG,
  CONST_PORT_CONFIG,
  AJAX_MOCK_BASEURL
} from 'Config'
const { strict } = API_DEFAULT_CONFIG

class MakeApi {
  constructor(options) {
    this.api = {}
    this.apiBuilder(options)
  }

  apiBuilder({
    sep = '/',
    config = {},
    mock = false,
    debug = false,
    mockBaseURL
  }) {
    Object.keys(config).map(namespace => {
      this._apiSingleBuilder({
        namespace,
        mock,
        mockBaseURL,
        sep,
        debug,
        config: config[namespace]
      })
    })
  }
  _apiSingleBuilder({
    namespace,
    mock = false,
    sep = '/',
    debug,
    config = {}
  }) {
    config.forEach(api => {
      let {
        name,
        desc,
        params,
        method,
        path,
        mock,
        type,
        showSuccess,
        singleLoading,
        mockPath
      } = api

      const isMock = process.env.NODE_ENV === 'production' ? false : mock
      const url = isMock ? mockPath : path
      let baseURL = isMock && AJAX_MOCK_BASEURL
      debug && assert(name, `${url}: 接口名字不能为空`)
      url.indexOf('/') === 0 ||
        url.replace(/^[a-zA-Z0-9]/, function(chars) {
          return `/${chars}`
        })
      Object.defineProperty(this.api, `${namespace}${sep}${name}`, {
        value(outerParams, outerOtions) {
          // 处理参数
          let _data = $isEmpty(outerParams)
            ? params
            : strict
            ? _pick(_assign({}, params, outerParams), Object.keys(params))
            : _assign({}, params, outerParams)
          // isMock || (baseURL = API_CONFIG[namespace.toUpperCase()+ '_URL'])
          if (!isMock) {
            baseURL = CONST_PORT_CONFIG[namespace.toUpperCase() + '_URL']
          } else {
            type = 'mock'
          }
          const _options = {
            url,
            desc,
            baseURL,
            isMock,
            showSuccess,
            singleLoading,
            method
          }
          return axios(
            _normoalize(_assign({}, _options, outerOtions), _data, type)
          )
        }
      })
    })
  }
}

function _normoalize(options, data, type) {
  // 这里可以做大小写转换，也可以做其他类型 RESTFUl 的兼容
  if (options.method === 'POST') {
    // formdata处理
    if (type === 'formdata') {
      options.headers = {
        'Content-Type': 'multipart/form-data'
      }
      let formData = new FormData()
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key]
          if (Object.prototype.toString.call(element) === '[object Object]') {
            if (element.raw) {
              formData.append(key, element.raw)
            }
          } else if (
            Object.prototype.toString.call(element) === '[object Array]'
          ) {
            element.forEach(el => {
              if (Object.prototype.toString.call(el) === '[object Object]') {
                //对象是二进制文件
                if (el.raw) {
                  formData.append(key, el.raw)
                  //是对象不是2进止 是数组
                } else {
                  formData.append(key, JSON.stringify(element))
                }
              }
            })
            continue
          } else {
            formData.append(key, element)
          }
        }
      }
      return options
    } else {
      options.data = data
    }
  } else if (options.method === 'GET') {
    options.params = data
  }
  return options
}

export default new MakeApi({
  config: API_CONFIG,
  ...API_DEFAULT_CONFIG
})['api']
