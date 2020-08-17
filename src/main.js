import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import store from './store'
import './mock/mockServer'
import './plugins/validate'
import './plugins/elements'
import './plugins/lazyload'
import * as API from '@/api'

Vue.prototype.$API = API // 将包含所有接口请求函数的对象保存到Vue原型对象

Vue.config.productionTip = false

// 注册全局组件
// Vue.component('TypeNav', TypeNav)
Vue.component(TypeNav.name, TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination', Pagination)

// 创建一个vm作为总线对象挂到Vue原型对象上
// Vue.prototype.$bus = new Vue()

new Vue({
  beforeCreate () {
    // 将当前vm作为总线对象挂到Vue原型对象上
    Vue.prototype.$bus = this
  },
  
  render: h => h(App),
  router, // 路由器
  store, // vuex的store
}).$mount('#app')
