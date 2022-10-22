import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入需要的模块
import '@/assets/global.less'
import '@/elementUI/index.js'

// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor) // 此方法内会用Vue.component注册quillEditor名字全局组件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
