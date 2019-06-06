import axios from 'axios'
import {
  requestSuccessFn,
  requestErrorFn,
  responceSuccessFn,
  responceErrorFn
} from '@/config/interceptors/axios'

let instance = axios.create()

instance.interceptors.request.use(requestSuccessFn, requestErrorFn)

instance.interceptors.response.use(responceSuccessFn, responceErrorFn)

export default instance
