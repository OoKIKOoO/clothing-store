import {request} from "./request"

// 把首页的网络请求全部封装在一个js里，方便维护管理
export function getHomeMultidata() {
  // request({}) 返回的是一个promise
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}