/* 
vuex最核心的管理对象(仓库)
*/
import Vue from 'vue'
import Vuex from 'vuex'

// import home from './modules/home'
// import user from './modules/user'
import modules from './modules'


Vue.use(Vuex)

const mutations = {   // 直接更新state中的数据
  test (state, data) { // 总state

  }
}
const actions = { // 触发mutation调用间接更新数据
  test2 ({commit, state}, ) {
    commit('test')
  }
}
const getters = {
  test3 (state) { // 总state
    return state.home.categoryList
  }
}

export default new Vuex.Store({
  // modules: {
  //   home,
  //   user
  // }, // vuex中包含的所有模块的对象
  // state,
  modules,
  mutations, // 总的mutations
  actions, // 总的actions
  getters, // 总的getters
})