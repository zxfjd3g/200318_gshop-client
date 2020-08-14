/* 
管理用户模块相关数据的vuex子模块
*/
import { getUserTempId } from '@/utils'
import {
  reqRegister,
  reqLogin,
  reqLogout
} from '@/api'

const state = {
  userInfo: {},
  userTempId: getUserTempId()
}
const mutations = {}
const actions = {
  async register ({commit}, userInfo) {
    const result = await reqRegister(userInfo)
    if (result.code!==200) {
      throw new Error(result.data || '注册失败了')
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