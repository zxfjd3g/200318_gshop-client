/* 
管理首页模块相关数据的vuex子模块
*/
import { 
  reqCategoryList,
  reqFloors,
  reqBanners
} from '@/api'

const state = {
  categoryList: [],  // 3级分类列表
  banners: [], // 广告位轮播数据的数组
  floors: [], // 所有楼层数据的数组
}

const mutations = {
  /* 
  接收保存分类列表
  */
  RECEIVE_CATEGORY_LIST (state, categoryList) { // state就是当前模块管理的state对象
    state.categoryList = categoryList.splice(0, 15)
  },

  /* 
  接收广告轮播列表
  */
  RECEIVE_BANNERS(state, banners) {
    state.banners = banners
  },

  /* 
  接收楼层列表
  */
  RECEIVE_FLOORS(state, floors) {
    state.floors = floors
  },
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
  },
  
  //异步获取广告位轮播数据
  async getBanners({ commit }) {
    const result = await reqBanners();
    if (result.code === 200) {
      commit('RECEIVE_BANNERS', result.data)
    }
  },

  //异步获取所有楼层数据
  async getFloors({ commit }) {
    const result = await reqFloors();
    if (result.code === 200) {
      commit('RECEIVE_FLOORS', result.data)
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