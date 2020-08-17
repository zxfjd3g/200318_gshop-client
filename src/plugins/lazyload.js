import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/images/loading.gif'

Vue.use(VueLazyload, {
  loading,  // 配置loading图片
}) // 内部定义了一个全局指令lazy