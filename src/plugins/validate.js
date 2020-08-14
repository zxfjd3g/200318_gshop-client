/* 
使用Vee-validate插件的模块
*/
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate) // 提供了v-validate指令

VeeValidate.Validator.localize('zh_CN', {
  messages: { // 指定中文对应的messages对象
    ...zh_CN.messages,
    is: field => `${field}必须与密码一致`
  }, 
  attributes: { // 给校验的field属性名映射中文名称
    phone: '手机号',
    code: '验证码',
  }
})

// 自定义检验规则
VeeValidate.Validator.extend('agree', {
  validate: value => { // 用于检验的函数, 函数返回true代表通过, 否则没通过  value需要检验的值
    return value
  },
  getMessage: field => field + '必须同意'  // 返回错误提示消息
})