/* 
使用Vee-validate插件的模块
*/
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate) // 提供了v-validate指令

VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages, // 指定中文对应的messages对象
  attributes: { // 给校验的field属性名映射中文名称
    phone: '手机号',
    code: '验证码',
  }
})