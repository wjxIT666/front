const Router = require('koa-router');
const router = new Router();
const db = require('../db/u_collection.js');

router.post('/userDelete', async ctx => {
    let { id } = ctx.request.body;
    console.log(id, 'id');
    //操作数据库
    let dbRes = await db;
    dbRes.deleteOne({_id: id}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        };
    });
    ctx.body = { code: 0, msg: '删除成功' };
});

module.exports = router;
