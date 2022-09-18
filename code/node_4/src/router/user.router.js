const Router = require('koa-router');
const router = new Router({prefix: '/user'});
const { regist, login } = require('../controller/user.controller.js');
const { isEmpty, isRepeat, isError } = require('../middleware/user.middleware.js');

//注册接口
router.post('/regist', isEmpty, isRepeat, regist);

//登录接口
router.post('/login', isEmpty, isError, login);

module.exports = router;
