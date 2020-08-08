## 今日任务
	1). TypeNav的交互(与用户)效果
	2). mock数据接口
	3). 使用vuex管理mock接口返回的banners与floors数据
	4). 根据mock的接口实现动态ListContainer与Floor组件
	5). 抽取一个轮播组件Carousel
	6). 自己mock一下今日推荐的接口并动态显示(自己独立完成)

## TypeNav的交互(与用户)效果
### 事件控制二三级分类列表的显示与隐藏
	设计状态数据: currentIndex: 标识哪个下标的分类项需要显示子分类列表 
	定义显示子分类的样式类名: item_on
	绑定事件监听, 更新状态数据currentIndex
		mouseenter: 在每个分类项上, currentIndex更新为对应的下标
		mouseleave: 给包含h2和分类div的父元素绑定监听, 但又不能包含<nav> ==> 需要修改页面结构
					更新currentIndex为-1

### 优化高频事件触发处理: 利用lodash进行函数节流处理
	问题: 在快速滑动时, mouseenter事件高频触发, 导致currentIndex高频更新  ===> 界面在高频更新(不必要)
	解决: 利用lodash库的throttle来进行函数节流处理

### 优化减小打包文件: 对lodash库实现按需引入 
	问题: import _ from 'lodash'  // 引入整个lodash为, 还没有使用的工具函数也被打包了
	解决: import throttle from 'lodash/throttle' // 只引入需要的工具函数 ==> 打包文件变小了

### 解决快速移出后可能显示第一个分类的子分类列表的bug
	原因: 在进入第一个分类项后0.2s才真正更新currentIndex为0
		但在0.2s内, 已经移出了整体div
	解决: 设计currentIndex有3种值
		-2: 出了整个div
		-1: 进入了整个div, 但还没有进入分类项上
		>=0: 光标在某个分类项上(只有当不为-2才更新)

### 优化减少组件对象数量: 使用编程式导航代替声明式导航
	需求: 点击某个分类项, 跳转到Search路由, 并携带categoryName & category1Id/category2Id/category3Id
	实现: 使用声明路由导航<router-link>
	问题: 每个分类都要创建一个RouterLink组件对象(非常多), 显示缓慢
	解决: 使用编程式路由导航, 不用创建RouterLink组件对象, 显示更快  
		绑定点击监听, 在回调函数中通过push()/replace()来跳转
	
### 优化事件处理效率: 利用事件委托
	问题: 每个分类项都需要绑定点击监听, 监听数量太多了, 效率不高
	解决: 利用事件委托, 绑定一个点击监听来搞定所有分类项的点击响应

### 利用标签自定义属性携带动态数据
	问题: 如何得到对应的分类项的数据
	解决: 利用标签的data自定义属性 (H5的语法)
		给a标签指定data自定义属性: <a :data-categoryName="c1.categoryName">
		在事件回调函数读取data自定义属性值: const {categoryname} = event.target.dataset

### 控制一级列表的显示与隐藏
	设计状态数据: isShowFirst
	初始值: 只有当是home路由时显示, 其它是隐藏
	什么时候更新为true: 当光标进入包含大标题和分类的div
	什么时候更新为false: 移出大的div / 点击了分类项后

### 一级列表显示隐藏的过渡效果
	给显示隐藏的元素包上一个<transition name="xxx">
	在显示/隐藏过程的类名下指定: transition样式
	在隐藏时的类名下指定: 隐藏的样式

### 优化请求执行的位置, 减少请求次数
	问题: 从首页跳转到搜索页, 还会请求三级分类列表
	原因: 在TypeNav组件的mount()中分发给异步action请求的 ==> 每个TypeNav组件对象都会发请求
	解决: 在App的mounted中去dispatch给异步action请求获取分类列表

### 合并分类query参数与搜索的关键字params参数
	问题: 
		当根据分类跳转search时, 丢了keyword的params参数
		当根据keyword跳转search时, 丢了categoryName/cateory1Id/cateory2Id/cateory3Id的query参数
	解决:
		当根据分类跳转search时, 同时携带上keyword的params参数
		当根据keyword跳转search时,携带上catgoreyName/cateory1Id/cateory2Id/cateory3Id的query参数

## mock数据接口
	问题: 当前首页只有分类的接口写好, 其它数据的接口还没有写好
	解决: 前端工程师自己mock/模拟接口数据

## 理解JSON数据
	a.结构: 名称, 数据类型  ==> 用于读取数据值
	b.value: 会显示到界面上
	c.真实接口返回的数据与mock的数据的关系: value可以变, 但结构不能变
	注意: 如果有变化 ==> 需要修改模板中读取显示的代码  ==> 真实情况是多少会有些不同, 变化越小需要修改的代码就越少

## 使用mockjs来mock接口
	下载mockjs, 引入使用
	mockjs: 生成随机数据，拦截 Ajax 请求, 返回生成的随机数据
	定义mock json数据: 使用mockjs的随机语法
	mockServer中: 通过Mock.mock()来定义mock接口
	main.js中: 引入mockServer
	ajax请求访问:
		api/mockAjax中: 封装针对mock接口的axios封装封装
		api/index中: 定义对应的接口请求函数
		组件中: 调用接口请求函数

## 使用vuex管理mock接口返回的banners与floors数据
	state: banners / floors
	mutation: RECEIVE_BANNERS() / RECEIVE_FLOORS()
	action: getBanners() / getFloors()

## 实现静态组件的swiper效果
	下载swiper
	引入: js/css
	模板页面: 层次结构与类名
	创建一个swiper对象并配置:  必须在轮播列表显示之后创建才有效  ==> 在mounted()中 

## 问题: 为广告轮播创建的swiper对象也影响到了楼层的轮播页面
	原因: new Swiper('.swiper-container'), 类名选择器也匹配了楼层的轮播页面 ==> 也产生了轮播的效果
	解决: 使用vue的ref技术 new Swiper(this.$refs.swiper) ===> 不会再影响到其它组件的轮播页面

## ListContainer与Floor组件动态展现
	api: 
		reqBanners()
		reqFloors()
	vuex: 
		banners / floors
		getBanners() / getFloors()
	组件:
		dispatch()
		mapState()
		模板中显示

## 问题: 动态组件轮播有问题(没有轮播效果)
	原因: 创建swiper对象的时间太早(在列表显示之前)
	解决:  在列表显示之后创建swiper对象
		办法一: 使用setTimeout延迟执行  ==> 不合适(因为请求获取数据的时间不确定)
		办法二: watch + nextTick()
			watch的回调: 在数据发生改变后执行(banners有数据了)
			nextTick(callback): 这次数据改变对应界面更新已经完成
			
		理解: 更新数据 / 调用监视的回调 / 更新界面 的流程
			我们更新数据 ==> vue自动调用监视的回调(界面还没更新) ==> vue自动更新界面

		理解: nextTick()
			2个API: Vue.nextTick( callback )
					vm.$nextTick( callback )
			我们什么时候调用nextTick()? 在数据更新之后, 界面更新之前
			Vue什么时候回调callback? 在界面更新后执行

## 抽取轮播组件: Carousel
	声明接收属性: props: carouselList /autoplay
	模板: 根据接收的carouselList显示轮播列表
	创建Swiper对象: watch + nextTick()

## 问题: Listainer中的轮播没有问题, 但2个Floor的轮播不可以
	原因: 
		基础理解: 
			给组件标签传入的属性值是undefined/空数组, 组件对象会创建
			如果组件标签的v-for遍历的值是undefined/空数组, 组件对象不会创建
			watch的回调默认什么时候调用: 在监视的数据发生改变时才调用, 初始显示时不调用
		得到结果:
			banners对应的<Carsoursel>有经历数据更新的过程 ===> 调用监视回调  ==> 创建swiper对象
			floors对应的2个<Caroursel>没有经历数据更新的过程 ==> 没有调用监视回调  ==> 不会创建swiper对象
		详细过程:
			<ListContainer />
				<Carousel :carouselList="banners"/>
			banners的变化: 
				[] ===> [...]
				创建Carousel组件对象 ==> 更新组件对象 ==> 调用监视回调创建Swiper对象

			<Floor v-for="floor in floors" :key="floor.id" :floor="floor"/>
				<Carousel :carouselList="floor.carouselList"/>
			floors的变化: 
				[] ===> [{carouselList: []}, {carouselList: []}]
				不创建Carousel组件对象  ==> 创建Carousel组件对象 ==> 不会调用监视的回调
			
	解决:
		办法1: 给watch添加immediate配置, 让监视回调在初始时就会执行一次, 只有当有数据时才创建
		办法2: 如果初始时已经有数据了, 就创建一个对应的swiper对象


## 组件对象是否创建相关的情况
	a = []
	b = undefined
	<T :a="a">  会创建组件对象  属性值是多少完全不影响组件对象的创建
	<T v-for="item in a"> 不会创建  只有数组中有元素时才会创建
	<T v-if="a"> 会创建  []转换为boolean是true   只有是true才会创建, fale不创建
	<T v-if="b"> 不会创建 undefined转换为boolean是false
	<T v-show="b"> 会创建, 只是通过样式来隐藏组件对象对应的界面   无论是true/false都会创建
