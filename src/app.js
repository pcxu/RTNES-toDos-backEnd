const express = require('express'); //服务端开发框架，建立服务的
const app = express();

const Sequelize = require('sequelize'); // orm 将对象-关系映射，操作数据库
const Op = Sequelize.Op;

const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
}; // 各种api罗列

const bodyParser = require("body-parser");
app.use(express.json()); // 处理 express 的 josn
app.use(express.urlencoded()); // 处理 url 参数的
app.use(bodyParser.urlencoded({extended:true})); // 处理 body 参数的

const models = require('../db/models');

// 查询
app.get('/todo/search', async (req, res, next)=>{
    try{
        let {title='', time='', content='', status='', current=0, pageSize=10} = req.query;
        console.log(current, pageSize);
        let todo = await models.todo.findAndCountAll({
            where: ( !title && !time && !content && !status )?{}:{
                [Op.or]: [
                    title!==''?{
                        title: {
                            [Op.like]: `%${title}%`,
                        }, 
                    }:null,
                    time!==''?{
                        time,
                    }:null,
                    content!==''?{
                        content: {
                            [Op.like]: `%${content}%`,
                        }, 
                    }:null,
                    status!==''?{
                        status,
                    }:null,
                ]
            },
            limit: Number(pageSize),
            offset: Number( (current-1)*pageSize ),
            raw:true,
            attributes:["id", "title", "time", "content", "status"],
        });

        let count = await models.todo.findAndCountAll({
            where: {},
            raw:true,
            attributes:["id", "title", "time", "content", "status"],
        });
        
        todo.count = ( !title && !time && !content && !status )?count.rows.length:todo.rows.length;

        res.json({
            msg: '查询成功！',
            body: todo,
            status: 0,
        })
    } catch (error) {
        next(error);
    }
    
}); 

//创建
app.post('/todo/create', async (req, res, next)=>{
    // application/json; charset=utf-8
    try{
        let {title, time, content, status} = req.body;
        let todo = await models.todo.create({
            title, time, content, status
        });
        res.json({
            msg: '创建成功！',
            body: todo,
            status: 0,
        })
    } catch (error) {
        next(error);
    }
    
}); 

//更新
app.post('/todo/update', async (req, res, next)=>{
    try{
        let { id, title, time, content, status} = req.body;
        let obj  = {};
        if(title){
            obj.title = title;
        }
        if(time){
            obj.time = time;
        }
        if(content){
            obj.content = content;
        }
        if(status){
            obj.status = status;
        }

        await models.todo.update(
            obj,
            {
                where:{
                    id,
                }
            }
        );

        let todo = await models.todo.findOne(
            {
                where:{
                    id,
                }
            }
        );

        res.json({
            msg: `${todo?'编辑成功！':'编辑失败！'}`,
            body: todo,
            status: 0,
        })
    } catch (error) {
        next(error);
    }
    
}); 

// 删除
// 真是业务的删除功能，都是改变数据状态。
app.delete('/todo/delete', async (req, res, next)=>{
    try{
        let {id} = req.body;
        let todo = await models.todo.findOne(
            {
                where:{
                    id,
                }
            }
        );

        await models.todo.destroy({
            where:{
                id,
            }
        });
        res.json({
            msg: `${todo?'删除成功！':'删除失败！'}`,
            body: todo,
            status: 0,
        })
    } catch (error) {
        next(error);
    }
    
}); 

// 错误信息返回
app.use( (err, req, res, next)=>{
    if(err){
        console.log( 'err', err);
        res.status(500).json({
            msg: err.message,
            status: 1,
        })
    }
} );

const units = require('./units.js');
app.listen(3000, ()=>{
    console.log(`服务启动成功！${units.nowDate()}`);
})