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