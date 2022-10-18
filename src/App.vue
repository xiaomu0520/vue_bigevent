<template>
  <div>
    <el-button>123</el-button>
  </div>
</template>

<script>
import { registerApi } from '@/api/index.js'
export default {
  async created () {
    const res = await registerApi()
    console.log(res)
  }
}
</script>

<style scoped>

</style>
