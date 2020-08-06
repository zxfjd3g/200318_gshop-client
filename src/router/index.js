/* 
路由器对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

// 声明使用
Vue.use(VueRouter)

export default new VueRouter({ // 配置对象
  mode: 'history', // 没有#
  // 项目中的多个路由配置
  routes
})