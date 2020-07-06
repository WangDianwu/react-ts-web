import axios from 'axios'
import NProgress from 'nprogress'

const request = axios.create({
  // baseURL: '',
  timeout: 1000
})

const JSON_HEADER = 'application/json;charset=UTF-8'
const FILE_HEADER = 'multipart/form-data'
let IS_FILE = false
// 请求头拦截
request.interceptors.request.use((config:any) => {
  NProgress.start()
  config.headers['Content-Type'] = IS_FILE ? FILE_HEADER : JSON_HEADER
  config.headers.token = window.sessionStorage.getItem('token')
  return config
})

request.interceptors.response.use((config: any) => {
  NProgress.done()
  return config
})

export const post = function (ops: any) {
  IS_FILE = false
  return request({
    method: 'post',
    ...ops
  })
}
export const get = function (ops: any) {
  IS_FILE = false
  return request({
    method: 'get',
    ...ops
  })
}
export const upload = function (ops: any) {
  IS_FILE = true
  return request({
    method: 'post',
    ...ops
  })
}
// export default request
