# 1. 说明
	vee-validate是专门用来做表单验证的vue插件
	我们当前用的是2.x的版本, 最新的3.x版本使用比较麻烦
	github地址: https://github.com/logaretm/vee-validate
	内置校验规则: https://github.com/logaretm/vee-validate/tree/v2/src/rules
	中文messages: https://github.com/logaretm/vee-validate/blob/v2/locale/zh_CN.js

# 2. 使用
## 1). 引入
    下载: npm install -S vee-validate@2.2.15   
    引入插件:
        import Vue from 'vue'
        import VeeValidate from 'vee-validate'
        
        Vue.use(VeeValidate)

## 2). 基本使用
     <input v-model="mobile" name="phone" v-validate="{required: true,regex: /^1\d{10}$/}" 
          :class="{invalid: errors.has('phone')}">
     <span class="error-msg">{{ errors.first('phone') }}</span>
     
     const success = await this.$validator.validateAll() // 对所有表单项进行验证
     
     问题: 提示文本默认都是英文的

## 3). 提示文本信息本地化
	import VeeValidate from 'vee-validate'
    import zh_CN from 'vee-validate/dist/locale/zh_CN' // 引入中文message
    
	VeeValidate.Validator.localize('zh_CN', {
	  messages: {
	    ...zh_CN.messages,
	    is: (field) => `${field}必须与密码相同`  // 修改内置规则的message
	  },
	  attributes: { // 给校验的field属性名映射中文名称
	    phone: '手机号',
	    code: '验证码',
	  }
	})

## 4). 自定义验证规则
    VeeValidate.Validator.extend('agree', {
	  validate: value => {
	    return value
	  },
	  getMessage: field => field + '必须同意'
	})

