import { reqTradeInfo, reqPayInfo } from '@/api'

const state = {
  tradeInfo: {}, // 交易信息   
  payInfo: {}, // 支付信息   
}

const mutations = {
  /* 
  接收交易信息
  */
  RECEIVE_TRADE_INFO (state, tradeInfo){
    state.tradeInfo = tradeInfo
  },
  /* 
  接收支付信息
  */
  RECEIVE_PAY_INFO (state, payInfo){
    state.payInfo = payInfo
  }
}

const actions = {
  /* 
  获取交易信息
  */
  async getTradeInfo({commit}){
    const result=await reqTradeInfo()
    if(result.code===200){
      const tradeInfo = result.data
      commit('RECEIVE_TRADE_INFO', tradeInfo)
    }
  },
  /* 
  获取支付信息
  */
  async getPayInfo({commit}, orderId){
    const result=await reqPayInfo(orderId)
    if(result.code===200){
      const payInfo = result.data
      commit('RECEIVE_PAY_INFO', payInfo)
    }
  },
}

const getters = { }

export default {
  state,
  actions,
  mutations,
  getters
}
