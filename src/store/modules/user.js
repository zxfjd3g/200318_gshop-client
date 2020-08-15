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
  },

  RESET_USER_INFO (state) {
    state.userInfo = {}
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
  },

  /* 
    退出登陆
    logout(): 请求登出的接口成功后, 清除前台用户的信息数据
			state中的userInfo
			localStorage中的userInfo
    */
  async logout ({commit}) {
    const result = await reqLogout()
    if (result.code==200) {
      // 通过commit触发mutation调用 ==> 清除state中的userInfo
      commit('RESET_USER_INFO')
      // commit('RECEIVE_USER_INFO', {})
      // 删除local中保存的userInfo
      removeUserInfo()
    } else {
      throw new Error(result.message || '退出登陆失败')
    }
  },
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}