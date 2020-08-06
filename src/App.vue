<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- 
      1. 通过读取请求的路由路径来判断
      2. 
     -->
    <!-- <Footer v-if="$route.path!=='/login' && $route.path!=='/register'"></Footer> -->
    <Footer v-if="!$route.meta.isHideFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',

  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less" scoped>

</style>
