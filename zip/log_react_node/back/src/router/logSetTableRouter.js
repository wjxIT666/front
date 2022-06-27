const Router = require('koa-router');
const router = new Router();
const { find } = require('../db/logset/find.js');

router.post('/logSetTable', async ctx => {
    //获取前端值
    let { current, pageSize, projNameVal: projName, userVal: cuser, startTime, endTime } = ctx.request.body;
    //操作数据库
    let findRes = await find(current, pageSize, projName, cuser, startTime, endTime);
    let { count, data } = findRes;
    //数据返回
    ctx.body = { code: 0, data, total: count };
});

module.exports = router;
