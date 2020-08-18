## 今日任务
	支付
	路由组件懒加载
	图片懒加载

## 支付
	动态获取支付信息: 金额 + 二维码图片url (qrcode工具包)
	显示二维码图片: 利用element-ui
		实现element-ui的按需引入打包
		2种UI组件
		  标签组件  ==> 写对应的标签产生对应的界面效果   <el-pagination>
		  函数/对象组件  ==> 执行函数或调用对象的方法出现对应的效果
		理解对话框:   MessageBox() ==> MessageBox.alert() / MessageBox.confirm()
		  this.$msgbox(): 通用的显示对话框的函数
		  this.$alert(): $msgbox的包装函数, 专门用来显示alert框
		  this.$confirm(): $msgbox的包装函数, 专门用来显示confirm框
		
	确信框显示后
		点击确定:
			提示成功
			跳转到成功界面
			清除定时器
		点击取消
			提示出错
			清除定时器
	轮询订单状态: 每隔1s发请求获取订单的状态
		如果已支付
			跳转到成功界面
			提示成功
			关闭确定框
			清除定时器
			分发删除所有选中的购物车商品的异步action
		如果未支付: 继续
		请求失败: 
			提示请求出错
			清除定时器

## 路由组件懒加载
	理解: 
		当打包构建应用时，JS包会变得非常大，影响页面加载(尤其是首页)。
		如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问时才加载对应组件，这样就更加高效了
	编码: 
		Home = () => import('@/pages/Home') // 通过动态引入路由组件实现对其进行单独打包
	分析: 
		import(modulePath): 动态import引入模块, 被引入的模块会被单独打包
		组件配置的是一个函数, 函数中通过import动态加载模块并返回
		初始时函数不会执行, 第一次访问才会执行, 也就是说只有一次请求对应的路由路径才会请求加载单独打包的js

## 图片懒加载
	理解:
		还没有加载得到目标图片时, 先显示loading图片
		在<img>进入可视范围才加载请求目标图片
	编码:
		使用vue-lazyload实现
		下载: npm install -S vue-lazyload
		import VueLazyload from 'vue-lazyload'
		// 配置vue的插件
		Vue.use(VueLazyload, { // 内部自定义一个指令: lazy
				loading,  // 配置loading图片
		})
		<img v-lazy="goods.defaultImg" />