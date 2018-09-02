import axios from 'axios'
import NProgress from 'nprogress'
import config from 'config'

// 配置 axios，并生成实例
const instance = axios.create({
  baseURL: config.SERVER_URL
})

// 拦截器配置
instance.interceptors.request.use(configData => { // 请求拦截
  NProgress.start()
  // configData 中包含：url、method等信息
  return configData
}, error => {
  NProgress.done()
  return Promise.reject(error)
})

instance.interceptors.requestError.use(configData => { // 请求失败拦截
  NProgress.start()
  // configData 中包含：url、method等信息
  return configData
}, error => {
  NProgress.done()
  return Promise.reject(error)
})

instance.interceptors.response.use(res => { // 响应拦截
  NProgress.done()
  // transform data.code to number:转换字符串的code值为数字
  res.data.code = +res.data.code
  return res
}, error => {
  NProgress.done()
  return Promise.reject(error)
})

instance.interceptors.responseError.use(configData => { // 响应失败拦截
  NProgress.start()
  // configData 中包含：url、method等信息
  return configData
}, error => {
  NProgress.done()
  return Promise.reject(error)
})

export default instance
