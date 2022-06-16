const Router = require('koa-router');
const router = new Router();
/** josnwebtoken生成token */
const jsonwebtoken = require('jsonwebtoken');

router.post('/login', ctx => {
    let token = jsonwebtoken.sign({ name: '小明' }, 'privateKey', { expiresIn: '1h' });
    ctx.body = { code: 0, msg: '登录接口', token };
});

module.exports = router;
