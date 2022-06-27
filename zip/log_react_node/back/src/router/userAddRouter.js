const Router = require('koa-router');
const router = new Router();
const db = require('../db/u_collection.js');
const find = require('../db/role/find.js');
const { addFind } = require('../db/user/addFind.js');

router.post('/userAdd', async ctx => {
    let { u_name, u_password, roleListValue, treeArr, grantor } = ctx.request.body;
    //操作数据库
    let dbRes = await db;
    let findRes = await find;
    findRes = findRes.map( item => {
        return {
            name: item.name,
            code: item.code
        };
    });
    let role = findRes.find( item => roleListValue === item.code || roleListValue === item.name);
    //查
    let addFindRes = await addFind(u_name);
    if (addFindRes.length > 0) {
        ctx.body = { code: 9, msg: '用户名不能重复' };
    } else {
        //增加
        dbRes.insertMany({
            u_name,
            u_password,
            ctime: Date.now(),
            roleName: role.name,
            roleCode: role.code,
            grantor,
            menuList: treeArr
        });
        ctx.body = { code: 0, msg: '添加成功' };
    };
});

module.exports = router;
