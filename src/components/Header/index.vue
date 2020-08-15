<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="userInfo.token">
            <span>{{userInfo.nickName}}</span>
            <a href="javascript:" style="margin-left: 15px" @click="logout">退出</a>
          </p>
          <p v-else>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- 声明式路由导航/跳转 -->
        <router-link class="logo" title="尚品汇" to="/">
          <img src="./images/logo.png" alt="">
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm" @submit.prevent="toSearch">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" 
            v-model.trim="keyword"/>
          <!-- 
            有type="button": 点击的没有点击提交表单的默认行为, 不需要加.prevent
            没有type="button", 是提交按钮, 点击的默认行为是提交表单, 需要加.prevent

           -->
          <!-- <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">搜索</button> -->
          <!-- <button class="sui-btn btn-xlarge btn-danger" @click.prevent="toSearch">搜索</button> -->
          <button class="sui-btn btn-xlarge btn-danger">搜索</button>
        </form>
      </div>
    </div>
  </header>

</template>

<script>
  export default {
    name: 'Header',

    data () {
      return {
        keyword: ''
      }
    },

    computed: {
      userInfo () {
        return this.$store.state.user.userInfo
      }
    },

    mounted () {
      // 给总线绑定自定义事件监听clearKeyword
      this.$bus.$on('clearKeyword', () => {
        this.keyword = ''
      })
    },

    methods: {
      /* 
      退出登陆
      */
      logout () {
        if (confirm('确定退出吗?')) {
          this.$store.dispatch('logout').then(() => {
            this.$router.push('/login')
          }).catch(error => {
            alert(error.message)
          })
        }
      },

      toSearch_test () {
        // 编程式路由导航/跳转
        // location为字符串
        // this.$router.push(`/search?keyword2=${this.keyword.toUpperCase()}`)
        // this.$router.push(`/search/${this.keyword}?keyword2=${this.keyword.toUpperCase()}`)
        // location为对象
        const location = {
          // path: `/search/${this.keyword}?keyword2=${this.keyword.toUpperCase()}`
          // path: '/search/:keyword'
          // path: '/search',  // path与params配合使用
          name: 'search',  // params与name配合使用
          // params: {keyword: this.keyword}, // 一旦params参数是可传可不传, 就不能指定空串的值
          query: {keyword2: this.keyword.toUpperCase()}
        }
        if (this.keyword!=='') { // 只有params参数值不为空串才携带
          location.params = {keyword: this.keyword}
        }

        // 办法1: 传入回调函数参数(使用老的语法, 不会产生promise)
        // this.$router.push(location, () => {
        //   console.log('跳转成功了')
        // })
        // this.$router.push(location, undefined, () => {

        // })
        // 方法2: catch错误 (使用新的语法, 有可能返回一个失败的promise)
        // this.$router.push(location).catch((error) => {
        //   // console.log('catch到错误', error)
        // })

        

        // 如果当前是搜索路由, 使用replace跳转, 否则用push
        // if (this.$route.path.indexOf('/search')===0) {
        // if (this.$route.path.startsWith('/search')) {
        if (this.$route.name==='search') {
          this.$router.replace(location)
        } else {
          this.$router.push(location)
        }
      },

      toSearch () {

        // 准备location对象
        const location = {
          name: 'search',
          // 携带原本就有的query参数
          query: this.$route.query
        }
        // 输入了才指定params参数
        if (this.keyword!=='') {
          location.params = {keyword: this.keyword}
        }

        if (this.$route.name==='search') {
          this.$router.replace(location)
        } else {
          this.$router.push(location)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .header {
    &>.top {
      background-color: #eaeaea;
      height: 30px;
      line-height: 30px;

      .container {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .loginList {
          float: left;

          p {
            float: left;
            margin-right: 10px;

            .register {
              border-left: 1px solid #b3aeae;
              padding: 0 5px;
              margin-left: 5px;
            }
          }
        }

        .typeList {
          float: right;

          a {
            padding: 0 10px;

            &+a {
              border-left: 1px solid #b3aeae;
            }
          }

        }

      }
    }

    &>.bottom {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .logoArea {
        float: left;

        .logo {
          img {
            width: 175px;
            margin: 25px 45px;
          }
        }
      }

      .searchArea {
        float: right;
        margin-top: 35px;

        .searchForm {
          overflow: hidden;

          input {
            box-sizing: border-box;
            width: 490px;
            height: 32px;
            padding: 0px 4px;
            border: 2px solid #ea4a36;
            float: left;

            &:focus {
              outline: none;
            }
          }

          button {
            height: 32px;
            width: 68px;
            background-color: #ea4a36;
            border: none;
            color: #fff;
            float: left;
            cursor: pointer;

            &:focus {
              outline: none;
            }
          }
        }
      }
    }
  }
</style>