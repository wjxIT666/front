const Router = require('koa-router');
const router = new Router();

router.get('/exit', ctx => {
    ctx.body = {code: 0, msg: 'ιεΊζε'};
});

module.exports = router;