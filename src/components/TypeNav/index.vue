<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="hideFirst" @mouseenter="showFirst">
        <h2 class="all">全部商品分类</h2>
        <transition name="move">
          <div class="sort" v-show="isShowFirst">
            <div class="all-sort-list2" @click="toSearch">
              <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                :class="{item_on: index===currentIndex}" @mouseenter="showSubCategorys(index)">
                <h3>
                  <a href="javascript:" :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                  <!-- <a href="javascript:" @click="$router.push(`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`)">{{c1.categoryName}}</a> -->
                  <!-- <router-link :to="`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`">{{c1.categoryName}}</router-link> -->
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <a href="javascript:" :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                        <!-- <a href="javascript:" @click="$router.push(`/search?categoryName=${c2.categoryName}&category2Id=${c2.categoryId}`)">{{c2.categoryName}}</a> -->
                        <!-- <router-link :to="`/search?categoryName=${c2.categoryName}&category2Id=${c2.categoryId}`">{{c2.categoryName}}</router-link> -->
                      </dt>
                      <dd>
                        <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                          <a href="javascript:" :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                          <!-- <a href="javascript:" @click="$router.push(`/search?categoryName=${c3.categoryName}&category3Id=${c3.categoryId}`)">{{c3.categoryName}}</a> -->
                          <!-- <router-link :to="`/search?categoryName=${c3.categoryName}&category3Id=${c3.categoryId}`">{{c3.categoryName}}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>

      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
  // import _ from 'lodash' // 引入整个lodash ===> 打包整个lodash
  import throttle from 'lodash/throttle' // 按需引入(只引入需要的函数) ==> 只打包引入使用的 ==> 减少了1.4M
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'TypeNav',

    data() {
      return {
        currentIndex: -2,
        isShowFirst: this.$route.path === '/' // 首页才显示
      }
    },

    computed: {

      categoryList2() {
        return this.$store.state.home.categoryList
      },

      // ...{
      //   categoryList () {
      //     return this.$store.state.categoryList
      //   },
      // },

      // ...mapState(['home.categoryList'])  // 不可以
      ...mapState({
        // categoryList: 'home.categoryList' // 不可以
        // 用来指定计算属性值的回调函数, state是总状态
        categoryList: state => state.home.categoryList,
      })
    },

    mounted() {
      // 通过dispatch来触发对应的action调用  ==> 从后台获取分类列表到vuex中
      // this.$store.dispatch('getCategoryList')
    },

    methods: {

      /* 
      离开大div时, 隐藏一级列表(有可能)
      */
      hideFirst() {
        this.currentIndex = -2

        // 如果当前不是首页, 需要隐藏
        if (this.$route.path !== '/') {
          this.isShowFirst = false
        }
      },

      /* 
      进入大div时显示一级列表
      */
      showFirst() {
        this.currentIndex = -1
        this.isShowFirst = true
      },


      /* 
      显示指定下标对应的子分类列表
      使用lodash的throttle工具函数进行函数节流处理 ==> 减少更新
      */
      // showSubCategorys: _.throttle(function (index) { 
      showSubCategorys: throttle(function (index) {
        // 如果已经移出了整个div, 不需要更新
        if (this.currentIndex === -2) return
        console.log(index)
        this.currentIndex = index
      }, 200),

      /* 
      跳转到Search路由
      */
      toSearch(event) {

        const dataset = event.target.dataset // 得到包含所有data处定义属性的对象
        console.log(dataset)
        const {
          categoryname,
          category1id,
          category2id,
          category3id
        } = dataset
        // 如果categoryname没值, 点击的不是分类项, 直接结束
        if (!categoryname) return

        // 准备query参数对象
        const query = {
          categoryName: categoryname
        }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }

        // 准备location对象
        const location = {
          name: 'search',
          query,
          // 携带当前已有params参数
          params: this.$route.params
        }

        // 如果当前是搜索路由, 使用replace跳转, 否则用push
        if (this.$route.name==='search') {
          this.$router.replace(location)
        } else {
          this.$router.push(location)
        }

        // 隐藏一级列表
        this.hideFirst()
      }
    }
  }
</script>

<style lang="less" scoped>
  .type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }

      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #fafafa;
        z-index: 999;
        &.move-enter-active, &.move-leave-active { /* 显示的过渡 */
          transition: all .5s
        }
        &.move-enter, &.move-leave-to {
          opacity: 0;
          height: 0;
        }
        .all-sort-list2 {
          .item {
            h3 {
              line-height: 30px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;

              a {
                color: #333;
              }
            }

            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              _height: 200px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;

              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;

                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;

                  &.fore {
                    border-top: 0;
                  }

                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }

                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;

                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }

            &.item_on {
              background: #ccc;

              .item-list {
                display: block;
              }
            }
          }
        }
      }
    }
  }
</style>