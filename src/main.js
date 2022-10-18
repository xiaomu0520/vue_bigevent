import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入需要的模块
import '@/assets/global.less'
import '@/elementUI/index.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
