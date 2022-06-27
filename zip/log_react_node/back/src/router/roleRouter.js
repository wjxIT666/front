const Router = require('koa-router');
const router = new Router();
const find = require('../db/role/find.js');

router.get('/role', async ctx => {
    let findRes = await find;
    findRes = findRes.map( item => {
        return {
            name: item.name,
            code: item.code
        };
    } );
    ctx.body = { code: 0, data: findRes };
});

module.exports = router;
