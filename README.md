rtnes-todos-backend
==============
<p align="center">
  <br>
  <img width="200" src="./src/assets/pcxu.JPG" alt="pcxu logo">
  <br>
  <br>
</p>  
  
# 编写意义  
**R**eact(**T**ypeScript) **N**ode(*E*xpress) **S**equelize  
用node完成服务端接口，拥抱大前端时代！  

# 食用方式  

## 一.开发依赖 ##
1.node（建议：使用nvm管理，避免服务端框架不兼容。）  
2.npm（建议：使用nrm管理npm源。）  
3.nodemon（作用：文件编辑自动重启node服务。）  
4.express（作用：服务端开发框架，可根据实际情况选择koa2、egg等。）  
5.mysql（作用：数据库。）  
6.mysql2（作用：数据库驱动。）  
7.sequelize + sequelize-cli（作用：ORM框架，协助node操作数据库。）  
8.body-parser（作用：post类型接口，接受body参数）  

## 二.架构设计 ##  
【业务代码】express --> 【ORM对象-关系映射】(sequlize) --> 【db驱动】mysql2 --> 【db】mysql  

## 三.准备过程 ##  
1.准备工程文件夹  
2.cmd `npm init`  
3.下载依赖 `npm i`  
4.创建src文件夹，创建app.js，引入express，创建服务  
5.启动服务 `npm start`,查看服务正常后配置数据库  
6.创建db文件夹，用于存放ORM相关  
7.`cd db`  
8.`npx sequelize init`  
9.修改数据库配置信息 db/config/config.json
10.`npx sequelize model:generate --name test --attributes name:string,dealine:date,content:string`创建一个model，在配置数据库下面建一个表【test】，创建字段【name】string类型，【dealine】date类型，【content】string类型。  
11.`npx sequelize db:migrate`执行model里面的内容，在数据库里面创建对应的表。  
12.歪个楼，个人认为第9、10步在实际开发不适用，数据库设计字段过多，类型长度设计需要更详细一点，更习惯手动在数据库中创建设计。  
13.还可以根据模板，自己编写models和migrations文件，然后执行创建，[更多配置请看这里。](https://segmentfault.com/a/1190000019760817)

## 四.数据库/接口设计 ##  
1.【数据库设计】表名：todo 字段：id title time content status  
2.【接口设计】  
2.1.【GET】【查询】/todo/search?title=标题&time=2020-01-08&content=内容&status=0  
2.2.【POST】【新增】/todo/create {title='标题', time='2020-01-08', content='内容', status=0 }  
2.3.【POST】【编辑】/todo/update {id: 0, title='标题', time='2020-01-08', content='内容', status=0 }  
2.4.【DELETE】【删除】/todo/delete {id: 0 }