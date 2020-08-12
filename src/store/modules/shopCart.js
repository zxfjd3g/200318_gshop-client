import { 
  reqAddToCart,
  reqCartList,
  reqCheckCartItem,
  reqDeleteCartItem  
 } from '@/api'

const state = {
  cartList: []   
}

const mutations = {
  /* 
  接收商品详情信息
  */
  RECEIVE_CART_LIST (state, cartList){
    state.cartList = cartList
  }
}

const actions = {

  async checkCartItem ({commit}, {skuId, isChecked}) {
    const result = await reqCheckCartItem(skuId, isChecked)
    if (result.code!==200) {
      throw new Error('切换购物项状态失败')
    }
  },


  /* 
  获取指定skuid的商品信息的异步action
  */
  async getCartList({commit}){
    const result=await reqCartList()
    if(result.code===200){
      const cartList = result.data
      commit('RECEIVE_CART_LIST', cartList)
    }
  },

  /* 
  添加到购物的异步action
  */
  async addToCart ({commit}, {skuId, skuNum}) {   // dispatch('addToCart', {skuId, skuNum})
    const result = await reqAddToCart(skuId, skuNum)
    // if (result.code===200) { // 添加成功
    //     // 通知组件成功了
    //     return result.data  // action函数返回的promise是成功的, value就是result.data
    //   } else { // 添加失败
    //     // 通知组件失败了
    //     throw new Error('添加购物车失败')
    // }
    if (result.code!==200) {  // 失败了
      throw new Error('添加购物车失败')  // dispatch得到的是失败promise
    }

  },

  /* 
  then()返回的promise的结果怎么确定的?
    由then指定的回调函数执行的结果来决定
    1). 失败的情况
      抛出错误: throw xxx
      返回失败的promise: return 失败promise
    2). 成功的情况
      返回一个成功的promise: return成功promise
      其它所有情况(返回一个非promise值)



  */
  addToCart2 ({commit}, {skuId, skuNum}) {   // dispatch('addToCart', {skuId, skuNum})
    return reqAddToCart(skuId, skuNum).then(result => {
      if (result.code===200) { // 添加成功
        // 通知组件成功了
        return result.data
      } else { // 添加失败
        // 通知组件失败了
        // throw new Error('添加购物车失败')
        return Promise.reject(new Error('添加购物车失败'))
      }
    })
  },

  async addToCart3 ({commit}, {skuId, skuNum, callback}) {   // dispatch('addToCart', {skuId, skuNum})
    const result = await reqAddToCart(skuId, skuNum)
    if (result.code!==200) {  // 失败了
      callback('添加购物车失败')
    } else { // 成功了
      callback()
    }
  },

  // test () {
  //   return 2
  // }
}

const getters = {

  /* 
  所有选中的数量
  */
  totalCount (state) {
    // let total = 0
    // state.cartList.forEach(item => {
    //   total += item.isChecked===1 ? item.skuNum : 0
    // })
    return state.cartList.reduce((preTotal, item) => preTotal + (item.isChecked===1 ? item.skuNum : 0), 0)
  },

  /* 
  所有选中的总价格
  */
  totalPrice (state) {
    return state.cartList.reduce((preTotal, item) => preTotal + (item.isChecked===1 ? item.skuNum*item.skuPrice : 0), 0)
  },

  /* 
  是否都选中
  */
  isAllCheck (state) {
    return state.cartList.every(item => item.isChecked===1)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
