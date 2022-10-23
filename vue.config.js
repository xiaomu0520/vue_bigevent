const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: './'
  // 影响打包时，index.html引入其他资源的前缀地址
  // ./可以让开发环境和生产环境都可以正常使用
  // 为了严谨一些
  // 开发环境：'/'
  // 生产环境：'./'
  // 问题：可以让脚手架环境，自己来决定用哪个值？
  // node里有个内置的环境变量：process.env.NODE_ENV
  // process.env.NODE_ENV他会根据你敲击的命令，来使用不同的值
  // 解决：如果你敲击的是npm run serve，process.env.NODE_ENV的值就是development字符串
  // 如果你敲击的是npm run build，process.env.NODE_ENV的值就是production字符串

  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
})
