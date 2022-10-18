// 封装的是具体的接口请求方法
// 注意：每个方法只负责请求一个URL地址
import request from '@/utils/request.js'

// 导出接口方法，为了能够在逻辑页面引用

// registerApi(this.form)等当于
// registerApi({ // 表单数据对象
//   username: '',
//   password: '',
//   repassword: ''
// })
export const registerAPI = ({ username, password, repassword }) => {
  // 原地是一个promise对象（内部包含原生的Ajax请求）
  // return这个promise对象到逻辑页面，去那边对promise对象提取结果
  return request({
    url: '/api/reg',
    method: 'POST',
    // axios传参params，data
    // params的对象参数名和值，axios源码会把参数和值，拼接在url?后面给后台，（query查询字符串）
    // data的对象参数名和值，axios源码会把参数和值，拼接在请求体里（body参数）
    data: {
      username: username,
      password: password,
      repassword: repassword
    }
  })
}
/**
 * 登录接口
 * @param {*} param0 {username：用户名，password：密码}
 * @returns Promise对象
 */
export const loginAPI = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data: {
      username: username,
      password: password
    }
  })
}
