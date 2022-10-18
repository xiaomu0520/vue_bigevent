// 封装的是具体的接口请求方法
// 注意：每个方法只负责请求一个URL地址
import request from '@/utils/request.js'

// 导出接口方法，为了能够在逻辑页面引用
export const registerApi = () => {
  // 原地是一个promise对象（内部包含原生的Ajax请求）
  // return这个promise对象到逻辑页面，去那边对promise对象提取结果
  return request({
    url: '/api/reg',
    method: 'POST',
    data: {
      username: 'xiaomu456',
      password: '111111',
      repassword: '111111'
    }
  })
}
