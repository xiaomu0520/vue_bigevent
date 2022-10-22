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

// 前端：
// 前提：通过input[type=file]让用户选择文件，通过事件对象.target.files拿到用户选择的“文件对象”
// 预览：img标签的src属性的值：
// 情况一：给src属性赋予base64字符串（图片数据）转成base64字符串
// 文件转成图片base64字符串：new FileReader()

// 情况二：把文件转成图片链接的地址：URL.createObjURL(文件)
// 注意：它的地址只能在前端使用

// 需求：把用户选择的文件发给后台保存到服务器上
// 情况一：文件转成图片base64字符串，传递给后台
// 情况二：用new FormData()表单数据直接装文件本身，直接传递给后台
