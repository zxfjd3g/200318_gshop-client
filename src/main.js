import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import store from './store'
import './mock/mockServer'

Vue.config.productionTip = false

// 注册全局组件
Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)

new Vue({
  render: h => h(App),
  router, // 路由器
  store, // vuex的store
}).$mount('#app')
