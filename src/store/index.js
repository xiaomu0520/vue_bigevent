import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getUserInfoAPI } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '', // 保存token字符串
    userInfo: {} // 保存用户信息（id,username,nickname,email,user_pic）
  },
  getters: {
  },
  mutations: {
    // 保存token
    updateToken (state, val) {
      state.token = val
    },
    // 保存用户信息
    updateUserInfo (state, val) {
      state.userInfo = val
    }
  },
  actions: {
    // 请求用户信息
    async getUserInfoActions (store) {
      const res = await getUserInfoAPI()
      // console.log(res)
      // 保存用户信息
      store.commit('updateUserInfo', res.data.data)
    }
  },
  modules: {
  },
  plugins: [
    createPersistedState() // 注入持久化插件
  ]
})
