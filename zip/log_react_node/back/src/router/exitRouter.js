const Router = require('koa-router');
const router = new Router();

router.get('/exit', ctx => {
    ctx.body = {code: 0, msg: '退出成功'};
});

module.exports = router;