## 今日任务
    1). Home组件及其子组件(静态)
    2). 后台接口与使用postman测试接口
    3). ajax与后台进行交互
    4). 使用vuex管理组件状态数据
    5). TypeNavx组件动态展现
    6). TypeNav的交互(与用户)效果

## Home组件及其子组件(静态)
    1). TypeNav: 3级分类导航
    2). ListContainer: 包含轮播列表的容器
    3). TodayRecommend: 今日推荐
    4). Rank: 排行
    5). Like: 猜你喜欢
    6). Floor: 楼层
    7). Brand: 品牌
    注意: 图片

## 后台接口与使用postman测试接口
    1). 启动 ===> 选择登陆==> cancel ===> 进入主界面
    2). 输入url/参数进行请求测试
    3). 注意post请求体参数需要指定为json格式(后台只支持json格式, 不支持urlencoding)
    4). 保存测试接口 ==> 后面可以反复使用

## ajax与后台进行交互
    1). 下载依赖包: npm install -S axios nprogress
    2). axios的二次封装(axios本身就是对XHR原生ajax的封装)     面试必说
        1.配置通用的基础路径和超时
            const intance = axios.create({baseURL, timeout})  // intance是一个能发ajax请求的函数
            向外暴露的必须是instance
        2.显示请求进度条
            显示: 在请求拦截器回调中执行: NProgress.start()
            隐藏: 在请求完成后的成功或失败回调中执行: NProgress.done()
        3.成功返回的数据不再是response, 而直接是响应体数据response.data
            在响应拦截器成功回调中: return response.data
        4.统一处理请求错误, 具体请求也可以选择处理或不处理
            在响应拦截器失败的回调中: 提法错误信息, 抛出error或返回失败的promise

    3). 接口请求函数模块
        包含项目中所有接口对应的ajax请求函数
        函数的返回值是promise, 函数内部调用ajax模块发请求
        需要掌握一个技能: 根据接口文档, 定义接口请求函数
    
    4). 测试调用接口请求函数获取数据
        出404错误
            axios配置请求地址: /api/product/getBaseCategoryList
            发请求所在的基础url: http://localhost:8080
            http://localhost:8080/api/product/getBaseCategoryList(没有处理, 就404)
            后台接口的地址: http://182.92.128.115/api/product/getBaseCategoryList(没有处理)
        解决办法1: 使用CORS解决ajax请求跨域
            给axios指定正确的地址: baseURL: http://182.92.128.115/api
            这样ajax请求就跨域了: 服务器返回特别的响应头
                Access-Control-Allow-Origin: http://localhost:8080
                Access-Control-Allow-Credentials: true
        解决办法2: 使用代理服务器   开发中用得比较多
            配置代理服务器: 
                devServer: {
                  proxy: {
                    '/api': { // 只对请求路由以/api开头的请求进行代理转发
                      target: 'http://182.92.128.115', // 转发的目标url
                      changeOrigin: true // 支持跨域
                    }
                  }
                },
            baseURL: baseURL: '/api'

## 使用vuex管理组件状态数据
    vuex用来做什么?
        vuex用来管理多个组件共享的状态数据
        从后台动态获取数据
    vuex的基本使用
        store相关: index / state / mutations / actions / getters 
        注册store: vm中注册store  ==> 组件中通过$store得到store对象
        组件:  通过$store来读取或更新vuex管理的state数据
              也可以通过mapState() / mapGetters() / mapMutations() / mapActions()
    vuex的多模块编程的必要性
        vuex单模块问题: 需要的管理状态数据比较多, 那对应的mutations/actions模块就会变得比较大
            如果添加新的数据管理, 需要修改现在文件(不断向其添加内容) 
        vuex多模块编程: 对各个功能模块的数据分别进行管理, 这样更加具有扩展性
        什么时候需要用vuex多模块编程?  需要vuex管理的数据比较多时使用
    多模块编程的总state结构:
        {
            home:{
                categoryList: [], // 分类列表
                xxx: {},
                yyy: 'atguigu'
            }
            user: {
                userInfo: {}
            }
        }
    针对三级分类使用vuex管理
        api: reqCategoryList
        vuex: home.js中编写
            异步action: 
                调用接口请求函数发异步ajax请求
                请求成功后, 取出数据, 提交给mutation保存
            mutation: 
                根据接收的数据参数更新当前模块的state中的状态数据
            state: {categoryList, ...}
        组件:
            分发异步action请求获取数据到state: 数据从接口===> vuex的state
            读取vuex的state中的数据到组件的计算属性: 数据从vuex的state ===> 组件的计算属性
            在模板中动态显示: 插值 / 指令

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
	解决: import throttle from 'lodash/throttle' // 只引入需要的工具函数 ==> 打包文件变小了1.4M

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
		如何标识3分分类? 通过不同的属性名
	
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
		当根据keyword跳转search时,携带上categoryName/cateory1Id/cateory2Id/cateory3Id的query参数