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
	3). 生产环境打包运行

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
	声明式路由导航/跳转
	编程式路由导航/跳转
	阻止表单提交的默认行为: .prevent
	type="button": 点击不提交表单, 不用prevent


## Footer组件
	如何控制footer的显示/隐藏?
		1). 通过读取请求的路由路径来判断
      	2). 利用路由的meta

## 路由跳转与参数相关问题
	2种路由跳转:
		声明式: <router-link to="/xxx" replace>
		编程式: this.$router.push(location)/replace(location)
	location的2种类型值
		字符串: push(path字符串)  '/home/2?name=tom'   将参数拼接到path中
		对象:
	2种参数
		params参数:
			路由路径: /search/:keyword
			携带: /search/abc
			读取: $route.params.keyword
		query参数:
			路由路径: /search
			携带: /search?keyword2=cba
			读取: $route.query.keyword2

## 路由跳转与传参相关问题
	1).跳转路由的2种基本方式
        声明式: <router-link to="">
        编程式: this.$router.push()/replace()
	
	2).跳转路由携带参数的2种方式
        params参数
        query参数
	
	3).面试问题1: 
		描述: 编程式路由跳转到当前路由(参数不变), 会抛出NavigationDuplicated的警告错误
	    解决1: 在跳转时指定成功或失败的回调函数, 通过catch处理错误
		解决2: 修正Vue原型上的push和replace方法 (优秀)
	
	4).面试问题2: 如何指定params参数可传可不传?
		path: '/search/:keyword?'
	
	5).面试问题3: 指定params参数时可不可以用path和params配置的组合?
		不可以用path和params配置的组合, 只能用name和params配置的组合
		query配置可以与path或name进行组合使用
	
	6).面试问题4: 如果指定name与params配置, 但params中数据是一个"", 无法跳转
	    解决1: 不指定params
		解决2: 指定params参数值为undefined
	
	7).面试问题5: 路由组件能不能传递props数据?
	    可以: 可以将query或且params参数映射/转换成props传递给路由组件对象
		实现: props: (route)=>({keyword1:route.params.keyword, keyword2: route.query.keyword })