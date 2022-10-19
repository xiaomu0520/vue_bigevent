// 基于axios封装，网络请求函数
import axios from 'axios'
import store from '@/store'

// axios.create()创建一个带配置项的自定义axios函数
// myAxios请求的时候，地址baseURL+URL，然后去请求后台
const myAxios = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})

// 定义请求拦截器
// api里每次调用request都会先走这个请求拦截器
myAxios.interceptors.request.use(function (config) {
  console.log(config)
  // config配置对象（要请求后台的参数都在这个对象上）
  // 在请求前会触发一次
  // 它返回给axios内源码,config配置对象(要请求后台的参数都在这个对象上)

  // 在发起请求时，统一携带请求头Authorization和token值
  // 判断，登录页面和注册页面，vuex里面无token，而且登录接口和注册接口也不需要携带token（其他页面需要）
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }

  return config
}, function (error) {
  // 请求发起前的代码，如果有异常报错，会直接进入这里
  // 返回一个拒绝状态的Promise对象(axios留在原地的Promise对象状态就位失败结果为error变量值)
  // 此函数类似catch函数()里return
  // 口诀:return非Promise对象值,会作为成功的结果,返回给下一个Promise对象(axios留在原地)
  // 口诀:return Promise对象,这个Promise的状态,返回给下一个Promise对象
  // Promise.reject(error) 原地留下一个新的Promise对象(状态为失败),它是Princess的类方法reject（）
  return Promise.reject(error)
  // 等同于
  // return new Promise((resolve, reject) => {
  //   reject(error)
  // })
})

// 导出axios自定义函数
export default myAxios
