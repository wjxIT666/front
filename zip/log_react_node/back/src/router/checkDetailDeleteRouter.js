const Router = require('koa-router');
const router = new Router();
const db = require('../db/logset/detail/detail_collection.js');

router.post('/checkDetailDelete', async ctx => {
    let { key, id } = ctx.request.body;
    let dbRes = await db;
    dbRes.find({id}, (err, data) => {
        if (err) console.log(err);
        else {
            if (data.length > 0) {
                //mongoose删除集合中数组的某一项
                dbRes.update({$pull: { list: { key } } }, (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                    };
                });
            };
        };
    });
    ctx.body = { code: 0, msg: '删除成功' };
});

module.exports = router;