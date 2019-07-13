// 不同业务模块对应的端口配置
export const CONST_PORT_CONFIG = {
  WAREHOUSE_URL: 'http://192.168.0.98:7089',
  EMAIL_URL: 'http://192.168.0.98:7087',
  LOGIN_URL: 'http://192.168.0.98:7081'
}

// mock基本url
export const AJAX_MOCK_BASEURL =
  'https://dsn.apizza.net/mock/e26e944bd798cee485a8995090fbe611'

// OSS配置
export const OSS_CONFIG = {
  // 簽名地址
  signUrl: CONST_PORT_CONFIG.PRODUCT_URL + '/img/get/oss/signature'
}

// api 默认配置
export const API_DEFAULT_CONFIG = {
  strict: false,
  mockBaseURL: '',
  mock: false,
  debug: false,
  sep: '/'
}
