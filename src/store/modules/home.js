/* 
管理首页模块相关数据的vuex子模块
*/
import { 
  reqCategoryList
} from '@/api'

const state = {
  categoryList: [],  // 3级分类列表
  // ...
}

const mutations = {
  /* 
  接收保存分类列表
  */
  RECEIVE_CATEGORY_LIST (state, categoryList) { // state就是当前模块管理的state对象
    state.categoryList = categoryList
  }
}

const actions = {
  /* 
  获取3级分类列表的异步action
  */
  async getCategoryList ({commit}) {
    // 1. 发送异步ajax请求
    const result = await reqCategoryList()
    // 2. 请求成功后, 读取数据, 
    if (result.code===200) {
      const categoryList = result.data
      // 3. commit给mutation来接收保存数据 
      commit('RECEIVE_CATEGORY_LIST', categoryList)
    }
  } 
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}