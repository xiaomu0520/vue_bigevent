import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', // 先默认打开直接看到布局页面开发
    component: () => import('@/views/layout'),
    redirect: '/home', // 会导致路由规则数组再次匹配
    children: [
      {
        // 左侧侧边栏导航，点击会切换路由地址，路由地址靠数据请求回来铺设上去的
        // 所以你的路由规则要配合它保持一致
        path: 'home',
        component: () => import('@/views/home')
      }
    ]
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

const whiteList = ['/login', '/reg'] // 白名单（无需登录就可以访问的路由地址）

// 全局前置路由守卫
// 知识点1：浏览器第一次打开项目页面，会触发一次全局前置路由守卫
// 知识点2：判断：有token就证明登录了，没有就是没登录
// 知识点3：next()如果强制切换路由地址，会再次走路由守卫再次去匹配路由表
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    // 登录了
    if (token && !store.state.userInfo.username) {
      // 现在需要有本地的token值，才能去请求
      store.dispatch('getUserInfoActions')
    }
    next()
  } else {
    // 数组.includes(值)，作用：判断值是否在数组里面出现过
    if (whiteList.includes(to.path)) {
      // 未登录，访问可以访问的路由地址，则放行(路由前置全局守卫不再触发了，而是匹配路由表，让组件挂载)
      next()
    } else {
      // 未登录，就next()跳转到登录页面
      next('/login')
    }
  }
})

export default router

// 退出登录，重新登录，只走相关组件代码（异步切换DOM，不会导致所有代码重新执行，app.vue不走）
// 效果不对，你换个账号它得重新登录请求数据才对
// 解决：
// 1.可以在登录页面，登录成功后，在发送请求去拿用户数据
// 2.可以在全局前置路由守卫中，（写路由跳转的时候，判断+获取）
