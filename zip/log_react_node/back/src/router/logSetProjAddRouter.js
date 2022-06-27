const Router = require('koa-router');
const router = new Router();
const { isEmpty } = require('../common/util.js');
const db = require('../db/logset/logset_collection.js');

router.post('/createProj', async ctx => {
    //获取项目名称和标签
    let { tags, inputName: projName, user } = ctx.request.body;
    //数据校验
    let projNameRule = isEmpty(projName);
    if (!projNameRule) {
        ctx.body = { code: 9, msg: '请添加项目名称' };
        return false;
    };
    let dbRes = await db;
    //操作数据库
    dbRes.insertMany({projName, tags, ctime: Date.now(), cuser: user});
    ctx.body = { code: 0, msg: '创建项目成功' };
});

module.exports = router;
