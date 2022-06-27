const Router = require('koa-router');
const router = new Router();
const { find } = require('../db/roleTable/find.js');

router.post('/roleTable', async ctx => {
    let { current, pageSize } = ctx.request.body;
    let findRes = await find(current, pageSize);
    ctx.body = { code: 0, data: findRes };
});

module.exports = router;
