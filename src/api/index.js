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

/**
 * 注册接口
 * @param {*} param0 { username, password, repassword }
 * @returns Promise对象
 */
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
/**
 * 获取用户信息
 * @returns Promise对象
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/my/userinfo',
    method: 'GET'
  })
}
/**
 * 获取侧边栏数据
 * @returns Promise对象
 */
export const getMenusListAPI = () => {
  return request({
    url: '/my/menus',
    method: 'GET'
  })
}
/**
 * 更新基本资料信息
 * @param {*} param0 {{ id, username, nickname, user_pic }}
 * @returns Promise对象
 */
export const updateUserInfoAPI = ({ id, email, username, nickname, user_pic }) => {
  return request({
    url: '/my/userinfo',
    method: 'PUT',
    data: {
      id,
      email,
      username,
      nickname,
      user_pic
    }
  })
}
/**
 * 更新用户头像
 * @param {*} avatar 头像base64字符串
 * @returns Promise对象
 */
export const updateUserAvatarAPI = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'PATCH',
    data: {
      avatar // 头像base64字符串
    }
  })
}
/**
 * 更新用户密码
 * @param {*} param0 { old_pwd：旧密码, new_pwd：新密码, re_pwd：确认新密码 }
 * @returns Promise对象
 */
export const updatePwdAPI = ({ old_pwd, new_pwd, re_pwd }) => {
  return request({
    url: '/my/updatepwd',
    method: 'PATCH',
    data: {
      old_pwd,
      new_pwd,
      re_pwd
    }
  })
}
/**
 * 获取文章分类
 * @returns Promise对象
 */
export const getArtCateListAPI = () => {
  return request({
    url: '/my/cate/list'
  })
}
/**
 * 增加文章分类
 * @param {*} param0 { cate_name：分类名, cate_alias：分类别名 }
 * @returns Promise对象
 */
export const saveArtCateAPI = ({ cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/add',
    method: 'POST',
    data: {
      cate_name,
      cate_alias
    }
  })
}
/**
 * 更新文章分类
 * @param {*} param0 { id：文章分类id, cate_name：分类名, cate_alias：分类别名 }
 * @returns Promise对象
 */
export const updateArtCateAPI = ({ id, cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/info',
    method: 'PUT',
    data: {
      id,
      cate_name,
      cate_alias
    }
  })
}
/**
 * 删除文章分类
 * @param {*} id 文章分类id
 * @returns Promise对象
 */
export const delArtCateAPI = (id) => {
  return request({
    url: '/my/cate/del',
    method: 'delete',
    params: {
      id
    }
  })
}
/**
 * 发布文章
 * @param {*} fd FormData表单数据
 * @returns Promise对象
 */
export const uploadArticleAPI = (fd) => {
  return request({
    url: '/my/article/add',
    method: 'POST',
    data: fd
    // {} 如果是一个普通对象，axios会把它转成JSON字符串在请求体里交给后台
    // 这个接口问题要求请求体里是一个FormData类型（表单数据对象）携带文件给后台
  })
}
/**
 * 获取文章列表
 * @param {*} param0 { pagenum：当前页码, pagesize：当前页需要的数据条数, cate_id：文章分类id, state：文章状态 }
 * @returns Promise对象
 */
export const getArtListAPI = ({ pagenum, pagesize, cate_id, state }) => {
  return request({
    url: '/my/article/list',
    method: 'GET',
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}
/**
 * 获取文章详情
 * @param {*} id 文章的id
 * @returns Promise对象
 */
export const getArtDetailAPI = (id) => {
  return request({
    url: '/my/article/info',
    method: 'GET',
    params: {
      id
    }
  })
}
