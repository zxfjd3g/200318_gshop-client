<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- 
      1. 通过读取请求的路由路径来判断
      2. 利用路由的meta
     -->
    <!-- <Footer v-if="$route.path!=='/login' && $route.path!=='/register'"></Footer> -->
    <Footer v-if="!$route.meta.isHideFooter"></Footer>
  </div>
</template>

<script>
// import router from './router'
import Header from './components/Header'
import Footer from './components/Footer'
import {reqCategoryList} from '@/api'

export default {
  name: 'App',

  async mounted () {
    /* reqCategoryList().then(result => {
      console.log('result', result)
    }) */
    // const result = await reqCategoryList()
    // console.log('result', result)
  },

  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less" scoped>

</style>
