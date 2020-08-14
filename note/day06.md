## 今日任务
	1). 加入购物车
	2). AddCartSuccess(添加购物车成功)路由组件
	3). ShopCart(购物车)路由组件
		1). 动态显示购物车列表
		2). 勾选/不勾选某个商品 / 改变某个购物项商品的勾选状态
		3). 全选或全不选
		4). 修改商品数量
		5). 删除某个商品
		6). 删除所有选中商品

## 加入购物车
	api: reqAddToCart()
	vuex: addToCart()
	component:
		收集数据
		dispatch()
		如果成功了, 跳转到成功的路由
		如果失败了, 提示

## 如何实现: dispatch异步action完成(成功/失败)后, 再去做某些操作(提示/跳转)
	方式一: 使用回调函数数据  (可以不写)
		component:
			dispatch('addToCart', {callback: this.callback}) 
			callback(errorMsg) {// 根据errorMsg是否有值来做相应处理}
		action:
			发异步ajax请求
			如果成功了, 执行callback()
			如果失败了, 执行callback('错误提示文本')
	方式二: 利用dispatch()的返回值是promise
		async函数执行的返回是promise, promise的结果由什么决定?
			函数体执行抛出了异常  ==> 失败, reason就是抛出的异常
			函数体执行返回一个失败的promise ==> 失败, reason就是返回的promise的reason
			函数体执行返回一个成功的promise ==> 成功, value就是返回的promise的value
			函数体执行返回其它任意值 ==> 成功, value就是返回的值
		dispatch()的返回值是promise, 就是异步action执行返回的promise
			component:
				const promise = dispatch('addToCart', {})
				如果promise是成功的, 做成功的处理    await后面
				如果promise是失败的, 做失败的处理    try...catch
			action:
				发异步ajax请
				请求操作失败抛出错误  ===> 请求操作失败时action的promise是失败的, 请求操作成功action的promise是成功的

## AddCartSuccess路由组件
	使用本地的iconfont
	跳转路由携带数据:
		query/params参数: 刷新数据还在, 不能携带对象数据
		vuex: 在跳转前保存到vuex的state中: 可以传递任意类型的数据, 刷新数据不在了
		sessionStorage与localStorage: 可以利用它们携带基本或对象类型数据, 刷新数据还存在

## sessionStorage与localStorage的区别
	相同点:
		都是window上的属性对象
		保存的数据刷新都存在
		语法: setItem(key, value)/getItem(key)/removeItem(key)/clear()  key是标识名称, value是json字符串
		都纯浏览器端的存储, 请求时不会自动携带(区别于cookie)
	不同点:
		localStorage: 数据保存在浏览器管理的本地文件中, 刷新或关闭浏览器, 数据依然还在
		sessionStorage: 数据保存在浏览器的运行内存中, 刷新浏览器数据还在, 但关闭浏览器数据不在(浏览器关闭后可能在后台运行)

## 显示购物车数据
	api: reqShopCart()
	vuex: shopCart.js:
		state: cartList
		mutations:RECEIVE_CART_LIST()
		actions: getCartList()
		getters: totalCount / totalPrice / isAllChecked
	component:
		dispatch()
		mapState()
		模板
	问题: 请求获取不到购物列表数据
	疑问: 服务器端如何识别不同的浏览器
	解决: 通过用户临时ID的请求头标识

## 用户临时ID
	作用: 用来标识某个浏览器客户端的唯一标识字符串  'b2f79046-7ee6-4dbf-88d0-725b1045460b'
	特点:
		不同的浏览器访问产生的值肯定不一样, 同一个浏览器多次产生也不样
		浏览器端生成, 并保存在浏览器端, 每次请求都会通过请求头来携带给服务器端
		服务器端保存购物车数据时是以它为标识保存
	创建:
		使用uuid/uuidjs工具库生成
		import { v4 as uuidv4 } from 'uuid';
		uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
	保存:
		localStorage: 以USER_TEMP_ID_KEY为key保存  ==> 关闭浏览/电脑后再打开数据依然存在
		vuex的state中: 保存到user模块中的userTempId状态中  ==> 不用多次从localStorage中读取
	使用:
		每个请求自动携带userTempId的请求头: 在请求拦截器中实现

## 勾选/不勾选某个商品 / 改变某个购物项商品的勾选状态
	api: reqCheckCartItem (skuId, isChecked)
		skuId: 商品的ID
		isChecked: 商品选中状态, '0'代表不选中, '1'代表选中
	vuex: checkCartItem({commit}, {skuId, isChecked})
	component:
		在change事件回调中, 分发触发checkCartItem action调用  ===> 发请求
		如果失败了, 提示
		如果成功了, 重新获取购物车数据显示

## 全选或全选
	api: 没有对应的接口, 得使用reqCheckCartItem(skuId, isChecked)
	vuex: checkAllCartItems(context, data)
		1). 需要对所有购物项与checked不一致的购物项发送请求
		2). 针对每个需要发请求的item去触发checkCartItem()调用  ===> 调用dispatch()
		3). context对象的结构:
		  {
		    state,      // 等同于 `store.state`，若在模块中则为局部状态
		    getters,    // 等同于 `store.getters`
		    commit,     // 等同于 `store.commit`
		    dispatch,   // 等同于 `store.dispatch`
		  }
		4). 执行多个请求的异步操作, 只有当都成功时, 整体异步action才成功, 否则失败
		  const promise = Promise.all([p1, p2, p3])
	component:
		对应setter方法中, 分发触发checkAllCartItems action调用  ===> 发请求
		如果失败了, 提示
		如果成功了, 重新获取购物车数据显示

## 修改商品数量
	api: reqAddToCart(skuId, skuNum)
		skuId: 商品ID
		skuNum: 商品数量, 正数代表增加, 负数代表减少
	vuex: 
		addToCart({commit}, {skuId, skuNum})
	component: 
		绑定click与change事件
		在vue中和原生DOM中的input输入框
            input事件: 输入改变时触发
            change事件: 失去焦点改变才触发
		在change事件调用多输入了一个$event参数
		在事件回调函数分异步action发更新数量的请求
		对数量要进行判断限制

## 删除某个商品 (独立完成)
## 删除所有选中商品(独立完成)

## 输入框的几个事件处理
	4个事件监听
		input事件: 输入改变时触发
		keyup事件: 按键起来时触发
	    change事件: 失去焦点且有改变时触发
		blur事件: 失去焦点时触发
	3种输入方式:
		键盘单字符输入
		通过 CTRL + C 粘贴输入
		通过 鼠标右键粘贴输入
    @input="validInput": 
      	三种方式都能监听, 输入非法字符不会有输入变化, 粘贴时已自动去掉非法字符
    @keyup="validInput" 
      	不能监视鼠标右键方式, 输入非法字符显示后再自动删除, 粘贴时显示后再自动删除非法字符
	通过正则限制输入
		目标: 将输入框中的开头的n个0或者n个非数字替换为空串
		正则: /^0+|\D+0*/g : 匹配 开头的1+个0 或者 任意位置的1+个非数字及后面0+个0
			\D 代表非数字 
			+ 代表个数>=1
			* 代表个数>=0
			? 代表0/1个
			| 或者
			g 找出所有匹配的
		测试文本: -0a011a0110  替换后变为 11110