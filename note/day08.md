## 订单与支付相关路由流程
	定义所有相关的路由组件==> 注册  ==> 通过声明式/编程式路由跳转关联
	什么时候需要定义子路由(二级)?  如果在一个大的路由界面上又有局部界面的切换显示

## 路由导航(跳转)守卫
	路由导航(跳转)守卫是什么?
		vue-router提供的能监控(监视和控制)路由跳转的相关语法功能
	
	分类:  (应用开发中基本都是用前置守卫)
		全局守卫
			前置: 监视任意路由跳转, 在准备跳转到目标路由时回调
				router.beforeEach((to, from, next) => {})
					to: 目标路由对象
					from: 当前路由对象  对应的就$route
					next: 控制路由跳转的函数
					  不执行: 不放行, 不会跳转到目标路由
					  next(): 放行, 请求的路由组件才能显示
					  next(path): 强制跳转到指定路由去
			后置: 监视任意路由跳转, 在已经跳转到目标路由时才调用
		路由守卫
			前置: 监视是跳转到当前路由, 当准备跳转时回调
				beforeEnter: (to, from, next) => { }
		组件守卫
			前置: 与路由前置守卫功能类似
				beforeRouteEnter (to, from, next) {},
					next((component) => {}) // 指定回调函数在组件对象创建之后执行
			更新: beforeRouteUpdate (to, from, next) 
			离开: beforeRouteLeave (to, from, next)

## 导航守卫相关功能
	a.只有登陆了, 才能查看交易/支付/个人中心界面
	b.只有没有登陆, 才能查看登陆界面
	c.只有携带的skuNum以及sessionStorage中有skuInfo数据, 才能查看添加购物车成功的界面
	d.只能从购物车界面, 才能跳转到交易界面
	e.只能从交易界面, 才能跳转到支付界面
	f.只有从支付界面, 才能跳转到支付成功的界面

## 我的订单列表
	api: reqOrders(page, limit)
	component: 
		如何直接能得到包含所有接口请求函数的对象? Vue.prototype.$API = API  ==> this.$API.reqOrder()
		将异步获取指定页码显示的代码封装成方法: getOrders(page=1)
		初始显示后动态显示第一页列表: 在mounted()中调用getOrders()
		分页组件Pagination绑定当前页码改变的监听: @currentChange="getOrders"
		列表中的某些列只显示一行: v-if="index===0"
		统一控制多个标签: <template v-if="index===0">包含多个标签
		使用一些的列占用多行的高度: :rowspan="list.length"