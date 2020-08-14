## 今日任务
	注册
	登陆
	自动登陆
	退出登陆

## 注册登陆的组件界面

## 相关API
	reqRegister(userInfo)
	reqLogin(mobile, password)
	reqLogout()

## vuex
	user.js
	state: userInfo
	mutations: 
		RECEIVE_USER_INFO ()
		RESET_USER_INFO ()
	actions:
		register(): 请求注册的接口, 完成后不用更新state, 只需要将请求的结果通知给组件
		login(): 请求登陆接口成功后, 保存返回的用户信息	
			通过commit触发mutation调用 ==> 保存信息到state
			保存localStorage中  ===> 从而可以实现自动登陆的功能
		logout(): 请求登出的接口成功后, 清除前台用户的信息数据
			state中的userInfo
			localStorage中的userInfo
	getters: 

## 区别token与userTempId
	userTmepId
		未登陆用户(浏览器)的标识数据(字符串)
		浏览器端创建, 并保存在浏览器端
		每次请求都会通过请求头携带: userTempId: uuid字符串
	token
		已登陆用户的标识数据(字符串)
		请求登陆成功时, 服务器端创建并返回的, 保存在浏览器端
		每次请求(登陆后)都会通过请求头携带: token: 字符串(加密后的值, 里面包含了用户id和失效时间的信息)
	在购物车中应用的细节:
		在登陆前, 后台通过userTmepId来保存对应的购物车数据
		在登陆后, 后台通过token对应的用户来保存对应的购物车数据
		细节: 登陆后再退出登陆, 前面未登陆添加的购物车数据就看不到了?
			登陆后发获取购物车数据请求, 同时携带userTempId和token, 后台会将userTempId对应购物车数据转移到token对应的用户下, 退出登陆后, 根据userTempId不再能得到以前的购物车数据

## Register组件
	实现一次性图形验证码的动态显示与点击更新显示
		<img src="/api/user/passport/code"> // 浏览器发的http请求没有跨域, 但代理服务转发请求返回的图片
	前台表单校验
	收集用户输入: v-model
	分发注册的异步action
	如果成功了跳转到登陆页面
	如果失败了, 提示并重新显示验证码

## 注册/登陆的前台表单校验
	使用vee-validate: npm install -S vee-validate@2.2.15  没用3.x新版本, 用起来比较麻烦
	目标: 根据我们文档和已经实现的注册的表单校验来实现登陆表单校验

## Login组件
	前台表单校验
	收集用户输入数据
	点击回调中分发给登陆的异步action发请求
	如果成功了, 跳转到首页
	如果失败了, 提示

## 自动登陆
	方式一: 登陆请求成功后保存返回的用户所有信息(token及用户名等)到local中
			初始化时就自动读取local中保存的用户信息实现自动登陆  ===> 不需要额外发请求
	方式二:登陆请求成功后只保存token到local中
			初始化时就需要从local中读取出token, 并发请求获取用户信息实现自动登陆 ==>需要额外发请求
	注意: 我们的后台没有一个根据token来获取用户信息的接口 ==> 只能用方式一

## 退出登陆
	发送退出登陆的请求
	如果失败了提示
	如果成功了, 清除数据, 自动跳转到登陆页面
