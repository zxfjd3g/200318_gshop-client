/* 
管理首页模块相关数据的vuex子模块
*/

const state = {
  categoryList: [],
  // ...
}
const mutations = {
  RECEIVE_CATEGORY_LIST (state, categoryList) { // state就是当前模块管理的state对象
    state.categoryList = categoryList
  }
}
const actions = {}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}