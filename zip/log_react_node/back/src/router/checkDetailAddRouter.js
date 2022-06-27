const Router = require('koa-router');
const router = new Router();
const db = require('../db/logset/detail/detail_collection.js');

router.post('/checkDetailAdd', async ctx => {
    let { name, address, url, port, path, id } = ctx.request.body;
    //操作数据库
    let dbRes = await db;
    //先去查
    dbRes.find({id}, (err, data) => {
        if (err) {
            console.log(err);
            ctx.body = { code: 9, msg: '添加数据失败' };
            return false;
        } else {
            if (data.length > 0) {
                dbRes.updateMany({id: id}, {$push: {list: {name, address, url, port, path, key: Date.now()}}}, (err, data) => {
                    if (err) {
                        console.log(err);
                        ctx.body = { code: 9, msg: '添加数据失败' };
                        return false;
                    } else {
                        console.log(data);
                    };
                });
            } else {
                dbRes.insertMany({id, list: [{name, address, url, port, path, key: Date.now()}]});
            };
        };
    });
    ctx.body = { code: 0, msg: '添加数据成功' };
});

module.exports = router;
