<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini">添加分类</el-button>
      </div>
      <!-- 分类数据表格 -->
      <el-table :data="cateList" style="width: 100%" border stripe>
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="cate_name" label="分类名称"></el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" size="mini">修改</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getArtCateListAPI } from '@/api'
export default {
  name: 'ArtCate',
  data () {
    return {
      // 文章分类数组
      cateList: [
        // 老李的账号有数据：lidongxu   888888
        { id: 1, cate_name: '历史', cate_alias: 'lishi' },
        { id: 2, cate_name: '娱乐', cate_alias: 'yule' }
      ]
    }
  },
  created () {
    // 获取文章分类列表
    this.getArtCateFn()
  },
  methods: {
    // 获取文章分类列表
    async getArtCateFn () {
      const { data: res } = await getArtCateListAPI()
      if (res.code !== 0) return console.log(res.message)
      console.log(res)
      this.cateList = res.data.data
      console.log(this.cateList)
    }
  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
