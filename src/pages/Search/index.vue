<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="options.categoryName" @click="deleteCategory">{{options.categoryName}}<i>×</i></li>
            <li class="with-x" v-if="options.keyword" @click="deleteKeyword">{{options.keyword}}<i>×</i></li>
            <li class="with-x" v-if="options.trademark" @click="deleteTrademark">{{options.trademark}}<i>×</i></li>
            <li class="with-x" v-for="(prop, index) in options.props" :key="prop" @click="deleteProp(index)">{{prop}}<i>×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector :addProp="addProp" @addProp="addProp" @setTrademark="setTrademark"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- order: '1:desc', // 排序条件  1: 综合,2: 价格 asc: 升序,desc: 降序   1:desc -->
                <li :class="{active: isActive('1')}"><!-- options.order.startsWith('1') -->
                  <a href="javascript:" @click="setOrder('1')">
                    综合
                    <i class="iconfont" v-if="isActive('1')" 
                      :class="iconClass"></i>
                  </a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li :class="{active: isActive('2')}">
                  <a href="javascript:" @click="setOrder('2')">
                    价格
                     <i class="iconfont" v-if="isActive('2')" 
                      :class="iconClass"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in productList.goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="`/detail/${good.id}`">{{good.title}}</router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination 
            :currentPage="options.pageNo" 
            :total="productList.total" 
            :pageSize="options.pageSize"
            :showPageNo="3"
            @currentChange="handleCurrentChange"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import SearchSelector from './SearchSelector/SearchSelector'
  export default {
    name: 'Search',

    data () {
      return {
        options: { // 包含所有用于搜索请求的可选参数属性的对象
          category1Id: '', // 第1级分类ID
          category2Id: '', // 第2级分类ID
          category3Id: '', // 第3级分类ID
          categoryName: '',  // 分类名称
          keyword: '',  // 搜索关键字
          pageNo: 1, // 当前页码
          pageSize: 10, // 每页数量
          trademark: '', // 品牌条件   品牌ID:品牌名称,  4:小米
          props: [], // 多个属性条件    属性id:属性值:属性名 "2:6.65-6.74英寸:屏幕尺寸"
          order: '1:desc', // 排序条件  1: 综合,2: 价格 asc: 升序,desc: 降序   1:desc
        }
      }
    },


    created () {
      this.updateByParams(this.$route)
    },

    watch: {
      $route (to, from) { // 参数发生了变化
        this.updateByParams(to)
      }
    },

    computed: {
      ...mapState({
        productList: state => state.search.productList
      }),

      // 计算icon类名
      iconClass () {
        return this.options.order.split(':')[1]==='desc' ? 'icondown' : 'iconup'
      }
      
    },

    methods: {

      /* 
      是否选中
      */
      isActive (orderFlag) {
        return this.options.order.startsWith(orderFlag)
      },

      /* 
      设置排序条件
      */
      setOrder (orderFlag) { // '1' / '2'    1:desc
        // 得到原本的order中的orderFlag, orderType
        const [flag, type] = this.options.order.split(':')  // ['1', 'desc']
        let orderType
        // 点击的是当前排序项
        if (orderFlag===flag) {
          orderType = type==='desc' ? 'asc' : 'desc'
        } else { // 不是当前排序项
          orderType = 'desc'
        }

        // 更新order
        this.options.order = `${orderFlag}:${orderType}`
        this.getProductList()
      },

      /* 
      删除品牌条件
      */
      deleteTrademark () {
        this.options.trademark = ''
        this.getProductList()
      },

      /* 
      设置指定品牌
      */
      setTrademark (trademark) {  // 品牌ID:品牌名称
        if (this.options.trademark===trademark) return
        this.options.trademark = trademark
        this.getProductList()
      },

      /* 
      删除一个属性条件
      */
      deleteProp (index) {
        this.options.props.splice(index, 1)
        this.getProductList()
      },

      /* 
      添加一个属性条件
      */
      addProp (prop) {  // "属性ID:属性值:属性名"
        // 如果props中已经有了, 直接结束
        if (this.options.props.indexOf(prop)!==-1) return
        // 向props中添加prop
        this.options.props.push(prop)
        // 重新请求
        this.getProductList()
      },

      /* 
      删除分类条件 
      */
      deleteCategory () {
        // 清除分类相关数据
        this.options.categoryName = ''
        this.options.category1Id = ''
        this.options.category2Id = ''
        this.options.category3Id = ''

        // 重新请求获取数据显示  ==> 问题: 路径上的参数没有变化
        // this.getProductList(1)

        // 重新跳转到当前Search, 不带query参数, 带params参数
        // this.$router.push({
        this.$router.replace({
          name: 'search',
          params: this.$route.params
        })
      },

      /* 
      删除关键字条件
      */
      deleteKeyword () {
        // 清除keyword
        this.options.keyword = ''
        // 重新请求获取数据显示
        // this.getProductList(1)

        // 重新跳转到当前Search, 不带params参数, 带query参数
        // this.$router.push({
        this.$router.replace({
          name: 'search',
          query: this.$route.query
        })

        // 通知Header清除输入的关键字
        this.$bus.$emit('clearKeyword')
      },

      /* 
      根据最新的参数更新显示
      */
      updateByParams (route) {
        // 读取参数, 请求获取列表
        const {keyword} = route.params
        const {categoryName, category1Id, category2Id, category3Id} = this.$route.query
        // 更新options
        this.options = {
          ...this.options,
          keyword,
          categoryName,
          category1Id, 
          category2Id, 
          category3Id
        }
        this.getProductList()
      },

      /* 
      异步获取指定页码的商品列表显示
      */
      getProductList (page=1) {
        // 更新pageNo
        this.options.pageNo = page
        // 请求获取数据
        this.$store.dispatch('getProductList', this.options)
      },

      /* 
      处理分页页码改变的监听回调
      */
      handleCurrentChange (page) {
        this.getProductList(page)
      }
    },

    components: {
      SearchSelector
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>