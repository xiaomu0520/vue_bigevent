import Vue from 'vue'
import VueRouter from 'vue-router'

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

export default router
