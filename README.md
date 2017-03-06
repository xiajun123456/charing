# charing
使用npm+grunt 搭建前后台分离的项目.及使用angular.js的简单架构.
##源代码下载
	程序代码已经上传到github有需要的同学，自行下载。 https://github.com/xiajun123456/compen	
可以通过git clone https://github.com/xiajun123456/compen 下载到本地
##环境需求
	node.js 在官网上面下载
	bower npm install bower -g
	grunt npm install grunt -g
	ruby 安装后注意将镜像源换到国内
	sass gem install sass
	compass gem install compass 
##启动服务
	npm install 安装依赖库
	bower install 安装前端框架
	npm run proxy 连接后台开发启动
	grunt serve/npm run release 启动而本地开发 在mocks文件中定义相关的接口数据
	npm run ci/grunt ci 部署到服务器上时启动在,文件dist中prod文件下
