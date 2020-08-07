## 描述项目
	1). 这是一个关于哪方面的项目
	2). 有哪些功能模块, 你负责哪些
	3). 技术栈是什么?
	4). 开发方式的特点?

## 技术选型
	1). 前台数据处理/交互/组件化
	2). 前后台交互
	3). 模块化
	4). 项目构建/工程化
	5). css预编译器
	6). 其它

## 接口相关
	1). 接口理解
	2). 接口文档
	3). 对/调/测接口 / 联调
	4). 前后台分离
	5). mock数据/接口

## 使用脚手架创建项目并运行
	1). 使用vue-cli3/4
	2). 开发环境运行
			命令: npm run dev/serve
				1.在内存中打包生成内存中的打包文件
				2.启动服务器运行内存中的打包文件
	3). 生产环境打包运行
			命令1: npm run build
				1.在内存中打包生成内存中的打包文件
				2.生成本地打包文件
			命令2: serve dist
				1.将本地的打包文件加载到内存中
				2.启动服务器运行内存中的打包文件

## 项目源码目录(主要说src下的)
	|- api
	|- components
	|- pages
	|- router
	|- store
	|- mock
	|- utils
	|- App.vue
	|- main.js

## 一些配置
	1). 关闭eslint配置: vue.config.js   lintOnSave: false/'warning'
	2). @路径提示: jsconfig.json

## git版本控制的基本操作(一个分支master)
	1). 创建本地仓库(代码在本地仓库中)
	    创建.gitignore文本, 并配置好
	    git init
	    git add .
	    git commit -m "init app"
	
	2). 创建远程仓库
	    New Repo
	    指定仓库名
	    创建		
	
	3). 将本地仓库的代码推送到远程仓库
	    git remote add origin url (在本地记录远程仓库的地址)
	    git push -u origin master
	
	4). 如果本地代码有修改, 要提交到本地仓库, 推送到仓库
	    git add .
	    git commit -m "xxx"
	    git push
	
	    git config --global credential.helper store (记住用户和密码)
	
	5). 如果远程代码有修改, 要拉取到本地仓库
	    git pull
	
	6). 将远程仓库的代码clone到本地(生成仓库)
	    git clone url

## 多分支操作
	1). 创建本地开发分支, 并推送到远程
	    git checkout -b dev
	    git push -u origin dev
	
	2). 创建本地个人分支(不用推送到远程)
	    git checkout -b xfzhang
	
	3). 在个人分支上开发, 合并到dev分支并推送
	    git add .
	    git commit -m "xxx"
	    git checkout dev
	    git merge xfzhang
	    git push
	
	4). 根据远程dev分支创建本地dev分支
	    git pull  (如果分支是在clone后创建的才需要执行)
	    git checkout -b dev origin/dev
	
	5). 将dev分支合并到master
	    git checkout master
	    git merge dev
	    git push

## 引入vue-router
	1). 下载vue-router
	2). 确定整体界面布局结构:
		上: Header
		中: router-view
		下: Footer
	3). 定义一级路由组件: Home/Search/Register/Login (要有基本结构)
	4). 创建路由器, 配置路由, 配置路由器
	5). 组件中路由相关的2个对象 (面试问题)
		$router: 路由器对象, 包含一些用于路由跳转的方法: push()/replace()/back()
		$route: 当前路由信息对象, 包含当前路由相关数据的对象: path/name/query/params/meta

## Header组件
	声明式路由导航/跳转: <router-link :to="{name,path,params:{},query:{}}" replace>
	编程式路由导航/跳转: this.$router.push(location)/replace(location)
	阻止表单提交的默认行为: .prevent
	type="button": 点击不提交表单, 不用prevent


## Footer组件
	如何控制footer的显示/隐藏?
		1). 通过读取请求的路由路径来判断
      	2). 利用路由的meta

## 路由跳转参数问题:
    1). 2种参数
		/search/aa?categoryName=phone&category1Id=2
        params参数: aa  注册路由时一定要带 '/search/:keyword'
        query参数: categoryName=phone&category1Id=2
    2). push(location)的2种语法
        字符串: push(path) // path可以带参数(params或者query)数据
        对象: push({}) // 也可以带参数
    3). push({}) 携带参数的问题:
        一旦有params参数, 必须有name配置, query参数没有此限制
        this.$router.push({
            name: 'search', 
            // path: '/search/keyword',
            params: {keyword},
            query: {keyword2: keyword.toUpperCase()}
        })
    4). 如何实现params参数可传可不传?
        配置路由路径的params部分时用?: path: '/search/:keyword?'
        只有params参数有值时, 才指定params配置(不要携带一个值为空串的params参数)
    5). 当编程式跳转到当前路由且参数数据不变, 就会出警告错误:
        错误: 
            Avoided redundant navigation to current location  ==> 重复跳转路由
        原因: 
            vue-router3.1.0之后, 引入了push()的promise的语法, 如果没有通过参数指定回调函数就返回一个promise来指定成功/失败的回调, 且内部会判断如果要跳转的路径和参数都没有变化, 会抛出一个失败的promise
        解决:
            办法1: 在每次push时指定回调函数或catch错误
            办法2: 重写VueRouter原型上的push方法 (比较好)
                1). 如果没有指定回调函数, 需要调用原本的push()后catch()来处理错误的promise
                2). 如果传入了回调函数, 本身就没问题, 直接调用原本的push()就可以
    6). 将路由参数映射成props传递给路由组件对象
        路由: props: route => ({keyword3: route.params.keyword, keyword4: route.query.keyword2})
        组件读取: 接收props属性必须声明
            props: ['keyword3', 'keyword4']
            {{keyword3}} / this.keyword3

    路由相关面试问题?
        区别路由相关的2个对象:  $route 和 $router
        路由跳转/导航的2种方式: 声明式 和 编程式 
        路由跳转时携带的参数的2种类型: params 和 query
        路由跳转时location的2种类型: 字符串 和 对象
        路由跳转的params配置与path配置能不能一起使用?  不能, params只能与name配合
        问题: 编程式跳转到当前路由且参数数据不变, 就会出警告错误
            设计一个开发的经历: 前面做的vue没有这个问题, 后面做的项目就有这个问题
