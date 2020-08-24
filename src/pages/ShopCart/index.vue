<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <!-- 

          cartPrice: 3400
          id: 4683
          imgUrl: "http://182.92.128.115:8080/group1/M00/00/0D/rBFUDF7G-SCAAq31AAFdgoifvoA470.jpg"
          isChecked: 1
          skuId: 120
          skuName: "小米10--22"
          skuNum: 1
          skuPrice: 3400
          userId: "8998b27d-f291-4de7-b586-617c95f6c27f"
         -->
        <ul class="cart-list" v-for="item in cartList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked===1" 
              @change="checkCartItem(item)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="updateSkuNum(item, -1)">-</a>
            <!-- 
              <button @click="test"></button>
              <button @click="test(1, $event)"></button>
              <button @click="($event) => {test(1, $event)}"></button> // 在外层包了一个函数, 形参是$event 
            -->
            <input autocomplete="off" type="text" class="itxt" 
              :value="item.skuNum" @change="updateSkuNum(item, $event.target.value-item.skuNum, $event)"
              @input="validInput">
            <a href="javascript:void(0)" class="plus" @click="updateSkuNum(item, 1)">+</a>
          </li>
          <li class="cart-list-con6" @click='test(1)'>
            <span class="sum">{{item.skuPrice * item.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartItem(item.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="allCheck">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:" @click="deleteCheckedCartItems">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalCount}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import debounce from 'lodash/debounce'
  export default {
    name: 'ShopCart',

    computed: {
      cartList () {
        return this.$store.state.shopCart.cartList
      },

      allCheck: {
        get () {
          return this.isAllCheck
        },

        async set (value) { // 点击改变了全选状态
          try {
            await this.$store.dispatch('checkAllCartItems', value)
            // 重新获取购物车列表显示
            this.$store.dispatch('getCartList')
          } catch (error) {
            alert(error.message)
          }
        }
      },

      ...mapGetters(['totalCount', 'totalPrice', 'isAllCheck'])
    },

    mounted () {
      this.$store.dispatch('getCartList')
    },

    methods: {

      /* 
      检查输入的合法性, 并及时自动处理
      */
    // 目标: 将输入框中的开头的n个0或者n个非数字替换为空串
		// 正则: /^0+|\D+0*/g : 匹配 开头的1+个0 或者 任意位置的1+个非数字及后面0+个0
		// 	\D 代表非数字   \d 代表数字
		// 	+ 代表个数>=1
		// 	* 代表个数>=0
		// 	| 或者
		// 	g 找出所有匹配的
		// 测试文本: -0a011a0110  替换后变为 11110
      validInput (event) {
        const value = event.target.value
        event.target.value = value.replace(/^0+|\D+0*/g, '')
      },

      /* 
      更新购物项商品的数量
      changeNum: 改变的数量
      */
      updateSkuNum:  debounce(async function (item, changeNum, event) {

        const {skuId, skuNum} = item

        // 只有当目标数量大于0时, 才处理, 否则不处理
        const targetNum = skuNum + changeNum
        if (targetNum>0) {
          console.log('---1', item.skuNum, changeNum)
          // item.skuNum += changeNum
          this.$store.commit('CHANGE_SKU_NUM', {item, changeNum})
          console.log('---2', item.skuNum, changeNum)
          try {
            // 分发一个异步action
            await this.$store.dispatch('addToCart', {skuId, skuNum: changeNum})
            // 异步请求操作成功了
            // this.$store.dispatch('getCartList')
          } catch (error) { // 异步请求操作失败了
            this.$store.commit('CHANGE_SKU_NUM', {item, changeNum: -changeNum})
            alert(error.message)
          }
        } else {
          if (event) {
            // 将输入更新为原本的值
            event.target.value = item.skuNum
          }
        }
      }, 500),

      /* 
      删除所有选中的购物项
      */
      async deleteCheckedCartItems () {
        if (window.confirm(`确定删除吗?`)) {
          try {
            // 分发一个异步action
            await this.$store.dispatch('deleteCheckedCartItems')
            // 异步请求操作成功了
            this.$store.dispatch('getCartList')
          } catch (error) { // 异步请求操作失败了
            alert(error.message)
          }
        }
      },

      /* 
      删除指定购物项
      */
      async deleteCartItem (skuId) {
        try {
          // 分发给action发送请求
          await this.$store.dispatch('deleteCartItem', skuId)
          // 重新获取购物车列表显示
          this.$store.dispatch('getCartList')
        } catch (error) {
          alert(error.message)
        }
      },

      async checkCartItem (item) {
        // 准备数据
        const skuId = item.skuId
        const isChecked = item.isChecked === 1 ? 0 : 1
        try {
          // 分发给action发送请求
          await this.$store.dispatch('checkCartItem', {skuId, isChecked})
          // 重新获取购物车列表显示
          this.$store.dispatch('getCartList')
        } catch (error) {
          alert(error.message)
        }

      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 5%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 35%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 15%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 5%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 15%;

          }

          .cart-list-con5 {
            width: 15%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 15%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 15%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>