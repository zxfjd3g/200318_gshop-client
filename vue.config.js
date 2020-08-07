// vue.config.js
module.exports = {
  lintOnSave: false, // 关闭ESLint的规则检查

  devServer: {
    proxy: {
      '/api': { // 只对请求路由以/api开头的请求进行代理转发
        target: 'http://182.92.128.115', // 转发的目标url
        changeOrigin: true // 支持跨域
        // pathRewrite: {‘^/api’: ‘’}   // 后台接口本身就有/api
      }
    }
  },
}