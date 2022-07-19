import axios from 'axios'

export function request(config) {
  // 1. 创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66/',
    timeout: 5000
  })

  // 2. axios的拦截器
  // 请求拦截器
  instance.interceptors.request.use(config => {

    return config
  }, err => {
    console.log(err);
  })
  // 响应拦截器
  instance.interceptors.response.use(result => {

    return result
  }, err => {
    console.log(err);
  })

  // 3. 发送网络请求
  return instance(config)
}