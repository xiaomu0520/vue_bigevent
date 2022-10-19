import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // redirect: '/login'
    component: () => import('@/views/layout')
    // 先默认打开直接看到布局页面开发
  },
  {
    path: '/reg',
    component: () => import('@/views/register/RegisterIndex.vue')
    // webpack提供import函数来路由懒加载导入组件
    // 路由懒加载，就是页面路由路径切换到/reg，才去加载对应的组件代码
    // 好处：让首页加载文件体积更小，打开更快
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  }
]

const router = new VueRouter({
  routes
})
// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    // 现在需要有本地的token值，才能去请求
    store.dispatch('getUserInfoActions')
  }

  next()
})

export default router

// 退出登录，重新登录，只走相关组件代码（异步切换DOM，不会导致所有代码重新执行，app.vue不走）
// 效果不对，你换个账号它得重新登录请求数据才对
// 解决：
// 1.可以在登录页面，登录成功后，在发送请求去拿用户数据
// 2.可以在全局前置路由守卫中，（写路由跳转的时候，判断+获取）
