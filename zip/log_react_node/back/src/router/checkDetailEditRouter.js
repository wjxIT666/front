const Router = require('koa-router');
const router = new Router();
const db = require('../db/logset/detail/detail_collection.js');

router.post('/checkDetailEdit', async ctx => {
    let { name, address, url, port, path, id, key } = ctx.request.body;
    console.log(name, address, url, port, path, id, key);
    //操作数据库
    let dbRes = await db;
    //mongoose修改集合中数组的某一项
    dbRes.updateMany({id, "list.key": key}, {$set: {"list.$.name": name, "list.$.address": address, "list.$.url": url, "list.$.port": port, "list.$.path": path}}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        };
    });
    ctx.body = { code: 0, msg: '修改成功' };
});

module.exports = router;
