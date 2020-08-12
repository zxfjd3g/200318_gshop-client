## 今日任务
	1). 自定义分页组件
	2). Detail静态路由组件
	3). Detail组件的动态显示
	4). ImageList组件
	5). Zoom组件

## 自定义分页组件
	直接使用已定义好的组件
		<Pagination 
	      :currentPage="options.pageNo"
	      :pageSize="options.pageSize"
	      :total="productList.total"
	      :showPageNo="5"
	      @currentChange="getProductList"
	    />
	封装一个高复用的组件: Pagination      应该面试时交流
		静态模板与样式  ===> 静态组件
		设计props: 从父组件接收的可变数据
			currentPage: 当前页码
			total: 总数量
			pageSize: 每页数量
			showPageNo: 连续页码数 (一般是奇数)
		
		设计data: 组件内部的可变数据
			myCurrentPage: 组件内部维护的当前页码
		
		设计computed: 根据props或data数据计算产生的数据
			totalPages: 总页数
				依赖数据: total / pageSize   19 / 2  10
				算法: Math.ceil(total/pageSize)
			start/end: 连续页码的开妈页码与结束页码
				依赖数据: myCurrentPage / showPageNo / totalPages
				算法:
					start的最小值是1
					end的最大值是totalPages
					从start到end的数量<=showPageNo
						start = myCurrentPage - Math.floor(showPageNo/2)
						if (start<1)  start = 1
						end = start + showPageNo -1
						if (end>totalPages) {
							end = totalPages
							start = end - showPageNo + 1
							if (start<1) start = 1
						}
						
						
		
		模板页面根据props/data/computed动态显示
			v-for/v-if/disabled
			v-for与v-if优先级问题    面试问

		v-for与v-if的优先级   面试题
	      v-for的优先级高, 先执行, 每个遍历都会执行v-if
	      1). 将v-if判断的处理放在v-for父标签上: 只需要判断一次(原本是每个遍历的元素都会判断)  ==> 适用于判断与元素无关的情况
	      2). 最好使用计算属性来去掉v-if  ===> 减少遍历的次数 ==> 适用于根据元素数据来判断的情况

		当用户操作时更新数据  ==> 更新界面
			当当前组件更新数据后, 有可能需要通知父组件(使用什么技术? 自定义事件/函数props)
			当父组件的数据更新后, 有可能需要通知子组件
					父组件主动调用子组件的方法修改 ===> 当前不用(后面会用的)
					子组件主动监视父组件的变化  ===> 当前比较合适

## 双向数据绑定 面试题
	数据绑定:
		数据劫持: 通过definedProperty给data中所有层次属性加getter/setter  -->observer
		订阅与发布: dep与watcher
	双向(v-model="xxx"):
		input事件监听: 将最新输入的数据保存到data中   this.xxx = event.target.value   // 数据代理

	数组响应式处理: 重写数组一系列更新元素的方法(调用原生方法 ==> 更新界面)

## 模板的数据来源
	data
	props
	computed: data/props/state/getters


## Detail静态路由组件
	定义Detail静态组件
	注册路由
	从Search跳转Detail组件: router-link/push()
	问题: 路由跳转后, 滚动条没有停留在最上面(0,0)
		scrollBehavior (to, from, savedPosition) {
	    	// return 期望滚动到哪个的位置
	    	return { x: 0, y: 0 }
	  	}

## Detail组件的动态显示
	api: getDetailInfo()
	vuex: detail.js: state/mutations/actions/getters
	component: dispatch()/mapState()/mapGetters()/模板

## 错误: "TypeError: Cannot read property 'category1Name' of undefined"
	说明: 在undefined上读取了category1Name属性
	原因:  data/state中的数据初始值是一个空对象/空数组, 如果模板中直接写一个三层(a.b.c)表达式
	解决1: 想办法不让detailInfo.categoryView的结果是undefined, 利用getters
	解决2: 利用v-if来判断, 只有当有数据才解析显示,  ==> 不能使用v-show

	imageList[currentIndex].imgUrl    a.b.c  v-if="a.b"  v-show="a.b"

## 销售属性列表功能 (大家自己做)
	功能: 
		二层嵌套列表 
		点击某一项就选中对应的项
	数据: 
		detailInfo中的spuSaleAttrList属性
		isChecked属性为'1'时代表是当前的

	功能: 动态显示 / 交互
	数据结构

## ImageList组件
	使用swiper显示小图片轮播列表:
		slidesPerView: 5,  // 一次显示5页
      	slidesPerGroup: 5, // 每次翻动多少(5)页
	使用currentIndex标识当前图片下标, 点击时更新它
	
## Zoom组件
	根据传入的imgUrl和bigUrl来动态显示中图和大图
	放大镜效果的布局:
		左侧:
			<img>: 显示中图
			event的<div>: 用来绑定mousemove事件, 尺寸与<img>一样
			mask的<div>: 遮罩, 尺寸是<img>的1/4
		右侧:
			big的<div>: 包含<img>, 尺寸与左侧<img>一样
			<img>: 显示大图, 尺寸是左侧<img>的4倍  ==> 右侧只能看到大图的1/4部分
	放大镜的事件处理
		绑定什么事件监听?
			mousemove
		给谁绑定?
			左侧的event <div>
		回调函数中做什么?
			计算left与top值:
				依赖数据: 事件的offsetX/offsetY, mask <div>的宽度maskWidth
				算法:
					left = offsetX - maskWidth/2
					top = offsetY - maskWidth/2
					left和top必须在[0, maskWidth]区间内
	
			指定mask <div>的坐标值(left, top)
				maskDiv.style.left = left + 'px'
				maskDiv.style.top = top + 'px'
			指定大图 <img>的坐标值(left, top)
				bigImg.style.left = -2 * left + 'px'
				bigImg.style.top = -2 * top + 'px'
## 编码分析
	ImageList
		读取vuex getters中的数据
		swiper
			slidesPerView: 5
			slidesPerGroup: 5
		currentIndex = 0
		点击某个小图更新Detail组件currentImageIndex(子向父通信)
	
	Zoom
		props: imgUrl / bigUrl
		放大镜效果
			mousemove
	
	Detail
		skuImageList
		currentImageIndex = 0
		skuImageList[currentImageIndex].imgUrl    v-if="skuImageList[currentImageIndex]"
		<Zoom :imgUrl="skuImageList[currentImageIndex].imgUrl" v-if="skuImageList[currentImageIndex]"/>