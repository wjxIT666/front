const Router = require('koa-router');
const router = new Router();
const { find } = require('../db/logset/detail/find.js');

router.post('/checkDetailQuery', async ctx => {
    let { current, pageSize, id } = ctx.request.body;
    //操作数据库
    let findRes = await find(id, current, pageSize);
    console.log(findRes);
    if (findRes.length > 0) {
        ctx.body = { code: 0, data: findRes[0], total: findRes[0].list.length};
    } else {
        ctx.body = { code: 0, data: findRes, total: 0};
    };
});

module.exports = router;
