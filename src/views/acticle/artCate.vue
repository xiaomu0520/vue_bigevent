<template>
  <div>
    <!-- 预览文章分类 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addCateShowDialogBtnFn">添加分类</el-button>
      </div>
      <!-- 分类数据表格 -->
      <el-table :data="cateList" style="width: 100%" border stripe>
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="cate_name" label="分类名称"></el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
        <el-table-column label="操作">
          <!-- scoped对象：{ row：行对象} -->
          <template v-slot="scoped">
            <el-button type="primary" size="mini" @click="updateCateBtnFn(scoped.row)">修改</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加文章分类对话框
      el-dialog  对话框组件
      title：左上角标题
      visible：控制对话框是否显示（右侧Vue变量为true显示，为false隐藏）
      visible.sync：组件内检测到对话框关闭（点击蒙层，按ESC，按右上角x），他会回传一个false给右侧的Vue变量
      before-close：对话框关闭前的回调，可以在内部用done()关闭对话框

      扩展知识点：.sync是Vue2.3版本新增
      复习：v-model如何给子组件实现双向数据绑定（父Vue变量要传给子组件，子组件传出的值也要自动绑定要父组件Vue变量）
      v-model本质：给所在的标签绑定value='Vue变量' @input='val => Vue变量 = val'
      <标签 v-model="Vue变量"></标签>
      运行时如下
      <标签 :value='Vue变量' @input='val => Vue变量 = val'></标签>
      Vue2里面标签上v-model只能用一次，Vue3里可以用多次

      .sync本质：给所在标签绑定:props属性名="Vue变量" @update:props属性名="val => Vue变量 = val"
      <标签 :visible.sync="Vue变量名"></标签>
      运行时如下
      <标签 :visible="Vue变量名" @update:visible="val => Vue变量 = val"></标签>
      子组件内子传父的时候 this.$emit('update:visible',值)
     -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      @close="dialogCloseFn">
      <!-- 添加的表单 -->
      <el-form :model="addForm" :rules="addRules" ref="addRef" label-width="80px">
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="addForm.cate_name" minlength="1" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="addForm.cate_alias" minlength="1" maxlength="15"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 经验：如果用同一个按钮，想要做状态的区分
// 1.定义一个标记变量isEdit（true编辑，false新增），还要定义本次要编辑的数据唯一id值，editId
// 2.同一个事件方法中，在点击修改的时候，isEdit改为true，editId保存要修改的数据id
// 3.在点击新增按钮的时候，isEdit改为false，editId置空
// 4.在点击保存按钮时（确定按钮时），就可以用isEdit变量区分了
import { getArtCateListAPI, saveArtCateAPI, updateArtCateAPI } from '@/api'
export default {
  name: 'ArtCate',
  data () {
    return {
      // 文章分类数组
      cateList: [],
      dialogVisible: false, // 控制弹框的显示隐藏变量
      addForm: { // 添加表单的数据对象
        cate_name: '',
        cate_alias: ''
      },
      addRules: { // 添加表单的验证规则对象
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
        ]
      },
      isEdit: false, // true为编辑状态，false为新增状态
      editId: '' // 保存正在要编辑的数据id值
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
      this.cateList = res.data
      console.log(this.cateList)
    },
    // 添加分类按钮点击事件，让对话框显示
    addCateShowDialogBtnFn () {
      this.isEdit = false // 变回新增的状态标记
      this.editId = ''
      this.dialogVisible = true
    },
    // 对话框，关闭时的回调
    dialogCloseFn () {
      this.$refs.addRef.resetFields()
      // this.addForm.cate_name = ''
      // this.addForm.cate_alias = ''
    },
    // 对话框确定点击事件，确定后对话框消失，调用保存文章类别接口
    confirmFn () {
      this.$refs.addRef.validate(async valid => {
        if (valid) {
          // 通过校验
          if (this.isEdit) {
            // 要修改
            // this.addForm.id = this.editId // 把要编辑的文章分类id添加到对象上
            // updateArtCateAPI(this.addForm)
            // 或者
            const { data: res } = await updateArtCateAPI({ id: this.editId, ...this.addForm })
            if (res.code !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
            this.dialogVisible = false
          } else {
            // 要新增
            const { data: res } = await saveArtCateAPI(this.addForm)
            if (res.code !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
            this.dialogVisible = false
          }
          // 重新获取文章列表
          this.getArtCateFn()
        } else {
          return false
        }
      })
    },
    // 修改分类按钮点击事件（先做数据回显）
    updateCateBtnFn (obj) {
      this.isEdit = true
      this.editId = obj.id
      this.dialogVisible = true
      // obj的值：{id：文章分类id，cate_name：文章分类名，cate_alias：文章分类别名}
      console.log(obj)

      // 让el-dialog第一次挂载el-form时，先用addForm空字符串初始值绑定到内部，后续用作resetFields重置
      // 所以让真实DOM先创建并在内部绑定好复制好的初始值

      // 接着我们真实DOM更新号绑定好了，再给数据回显
      // 注意：给v-model对象赋值知识影响当前显示的值，不会影响resetFields赋值的值
      this.$nextTick(() => {
        // 数据回显（数据回填）
        this.addForm.cate_name = obj.cate_name
        this.addForm.cate_alias = obj.cate_alias
      })
    }
  }
}

// 小bug：（el-form和el-dialog和数据回显，同时用，有bug）
// 复现：第一次打开网页，先点击修改，在点击新增，发现输入框有值
// 原因：点击修改后，关闭对话框的时候，置空失效了
// 具体分析：dialogCloseFn函数的resetFields()有问题
// 线索：dialog的内容是懒渲染的，即在第一次被打开之前，传入默认的slot不会被渲染到DOM上
// 线索：vue数据改变（先执行同步所有）再去更新DOM（异步代码）
// 无问题：第一次打开网页，先点击新增按钮->dialog出现->el-form组件第一次挂载（关联的addForm对象的属性值为空字符串）
// el-form组件内绑定里初始值，所有后续调用resetFields的时候，他可以用空字符串初始值来重置
// 有问题:第一次打开网页，先点击修改按钮->虽然dialog变量为true了，但是同步代码把addForm对象里赋值了（默认值）
// ->DOM更新异步-> dialog出现->el-form组件第一次挂载（使用addForm内置做回显然后第一次el-form内绑定了初始值（有值）
// ->以后做重置，他就用绑定的带值的做重置

// 解决：让数据回显慢点执行$nextTick()

</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
