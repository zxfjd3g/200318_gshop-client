/* 
管理用户模块相关数据的vuex子模块
*/
import { getUserTempId, saveUserInfo, getUserInfo, removeUserInfo } from '@/utils'
import {
  reqRegister,
  reqLogin,
  reqLogout
} from '@/api'

const state = {
  userInfo: getUserInfo(),
  userTempId: getUserTempId()
}
const mutations = {
  RECEIVE_USER_INFO (state, userInfo) {
    state.userInfo = userInfo
  }
}
const actions = {
  /* 
  注册的异步action
  */
  async register ({commit}, userInfo) {
    const result = await reqRegister(userInfo)
    if (result.code!==200) {
      throw new Error(result.data || '注册失败了')
    }
  },

  /* 
  登陆的异步action
  */
  async login ({commit}, {mobile, password}) {
    const result = await reqLogin(mobile, password)
    if (result.code===200) {
      const userInfo = result.data
      // 保存到state
      commit('RECEIVE_USER_INFO', userInfo)
      // 保存到local中
      saveUserInfo(userInfo)
    } else {
      throw new Error(result.message || '登陆失败了')
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