const Router = require('koa-router');
const router = new Router();
const { infoFind } = require('../db/user/infoFind.js');

router.post('/userInfo', async ctx => {
    let { u_name } = ctx.request.body;
    let infoFindRes = await infoFind(u_name);
    ctx.body = { code: 0, data: infoFindRes };
});

module.exports = router;