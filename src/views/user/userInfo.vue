<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>基本资料</span>
    </div>
    <el-form ref="userFormRef"
    :model="userForm"
    :rules="userFormRules"
    label-width="100px">
      <el-form-item label="登录名称：" prop="username">
        <el-input v-model="userForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户名称：" prop="nickname">
        <el-input
        v-model="userForm.nickname"
        minlength="1"
        maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱：" prop="email">
        <el-input v-model="userForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitFn">提交修改</el-button>
        <el-button @click="resetFn">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { updateUserInfoAPI } from '@/api'
export default {
  name: 'UserInfo',
  data () {
    return {
      userForm: {
        username: this.$store.state.userInfo.username, // 默认显示登录名称
        nickname: '',
        email: ''
      },
      userFormRules: {
        nickname: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '昵称必须是1-10位的非空字符串', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交修改点击事件
    submitFn () {
      this.$refs.userFormRef.validate(async valid => {
        if (valid) {
          // 通过校验
          // this.userForm里面没有id，但是接口需要传id
          // 添加id
          this.userForm.id = this.$store.state.userInfo.id
          console.log(this.userForm)
          const { data: res } = await updateUserInfoAPI(this.userForm)
          if (res.code !== 0) {
            this.$message.error('更新用户信息失败！')
            console.log(res.message)
            return
          }
          this.$message.success('更新成功！')
          // 重新让vuex获取最新的用户数据
          this.$store.dispatch('getUserInfoActions')
        } else {
          // 未通过校验
          return false
        }
      })
    },
    // 重置按钮点击事件
    resetFn () {
      // this.userForm.nickname = ''
      // this.userForm.email = ''

      // el-form提供了一个重置表单（并且还能重置报错提示）
      this.$refs.userFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.clearfix:after {
    clear: both
  }
.box-card {
    width: 600px;
  }
</style>
