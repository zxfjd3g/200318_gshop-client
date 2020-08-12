/* 
管理用户模块相关数据的vuex子模块
*/
import { getUserTempId } from '@/utils'

const state = {
  userInfo: {},
  userTemplId: getUserTempId()
}
const mutations = {}
const actions = {}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}