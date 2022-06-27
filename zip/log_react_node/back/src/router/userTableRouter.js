const Router = require('koa-router');
const router = new Router();
const { find } = require('../db/user/find.js');

router.post('/userTable', async ctx => {
    let { current, pageSize } = ctx.request.body;
    //操作数据库
    let findRes = await find(current, pageSize);
    //返回数据
    ctx.body = {code: 0, userList: findRes};
});

module.exports = router;
