const Router = require('koa-router');
const router = new Router();
const { find } = require('../db/find.js');
const { isEmpty } = require('../common/util.js');
const jsonwebtoken = require('jsonwebtoken');
const { privateKey } = require('../common/config.js');

router.post('/login', async ctx => {
    //获取用户名，密码
    let { userVal: u_name, pwdVal: u_password } = ctx.request.body;
    //数据校验
    let nameRule = isEmpty(u_name);
    let pwdRule = isEmpty(u_password);
    if (!nameRule || !pwdRule) {
        ctx.body = {code: 9, msg: '用户名或者密码不能为空'};
        return false;
    };
    //操作数据库
    let obj = {u_name, u_password};
    let findRes = await find(obj);
    //返回数据
    if (findRes.length === 0) ctx.body = {code: 9, msg: '用户名或者密码错误'};
    else {
        //生成token
        let uinfo = findRes[0];
        let { _id } = uinfo;
        const token = jsonwebtoken.sign({ uid: _id }, privateKey, { expiresIn: '1h' });
        ctx.body = { code: 0, msg: '登录成功', token};
    }; 
});

module.exports = router;
