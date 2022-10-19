<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src="../../assets/images/logo.png" alt="" />
      <!-- 右侧的菜单 -->
      <el-menu
        class="el-menu-top"
        mode="horizontal"
        background-color="#23262E"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <img src="../../assets/images/logo.png" alt="" class="avatar" />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"><i class="el-icon-s-operation"></i>基本资料</el-menu-item>
          <el-menu-item index="1-2"><i class="el-icon-camera"></i>更换头像</el-menu-item>
          <el-menu-item index="1-3"><i class="el-icon-key"></i>重置密码</el-menu-item>
        </el-submenu>
        <el-menu-item index="2" @click="quitFn"><i class="el-icon-switch-button"></i>退出</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <!-- 侧边栏的用户信息 -->
        <div class="user-box">
            <img :src="user_pic" alt="" v-if="user_pic" />
            <img src="../../assets/images/logo.png" alt="" v-else />
            <span>欢迎 {{ nickname || username }}</span>
        </div>
        <!-- 侧边栏的导航菜单 -->
        <!--
          el-menu:导航菜单
          default-active：当前激活菜单的 index （el-submenu/el-menu-item的index的值），对应的菜单就激活样式
          @open：展开指定的 sub-menu
          @close：收起指定的 sub-menu
          active-text-color：激活时的文字颜色，哪项index的值和default-active一致，就会被设置动态文字颜色
          router:设置上（默认设置为true），就当你点击某行菜单的时候，以index的值作为路由切换
          子标签：
          如果有嵌套，先写el-submenu（里面嵌套template#title的设置当前展示内容，子用el-menu-item显示）
          如果无嵌套，直接写el-menu-item
         -->
        <el-menu
          default-active="/home"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          router>
          <template v-for="item in menus">
            <el-menu-item v-if="!item.children" :index="item.indexPath" :key="item.indexPath">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </el-menu-item>
            <el-submenu v-else :index="item.indexPath" :key="item.indexPath">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item v-for="obj, index in item.children" :index="obj.indexPath" :key="index">
                <i :class="obj.icon"></i>
                <span>{{ obj.title }}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <el-main>
          Main.vue后台主页
          <router-view></router-view>
        </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>© www.itheima.com - 黑马程序员</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
// 经验：在组件标签上绑定的所有事件（包括原生事件的名字click，input等等）
// 都是自定义事件，都需要组件内$emit来触发才行
// 万一组件内不支持这个原生事件名字
// 解决：@事件名.native="methods里方法名"
// .native给组件内根标签，绑定这个原生的事件
import { mapGetters } from 'vuex'
import { getMenusListAPI } from '@/api'
export default {
  name: 'my-layout',
  data () {
    return {
      menus: [] // 侧边栏的数据
    }
  },
  computed: {
    // 将vuex里面的getters数据映射到这里
    ...mapGetters(['username', 'nickname', 'user_pic'])
  },
  methods: {
    quitFn () {
      // 为了体验更好，加个确认提示框
      // 2.强制跳转到登录页面
      this.$confirm('是否确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 1.清除vuex,清除token同时清除用户信息
        this.$store.commit('updateToken', '')
        this.$store.commit('updateUserInfo', {})
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    // 请求侧边栏数据
    async getMenusListFn () {
      const res = await getMenusListAPI()
      console.log(res)
      this.menus = res.data.data
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  created () {
    // 请求侧边栏数据
    this.getMenusListFn()
  }
}
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #F2F2F2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}
// 左侧边栏用户信息区域
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}
</style>
