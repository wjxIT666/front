const Router = require('koa-router');
const router = new Router();
const db = require('../db/u_collection.js');
const find = require('../db/role/find.js');

router.post('/userEdit', async ctx => {
    let { u_name, u_password, roleListValue, treeArr } = ctx.request.body;
    let findRes = await find;
    findRes = findRes.map( item => {
        return {
            name: item.name,
            code: item.code
        };
    });
    let role = findRes.find( item => roleListValue === item.code || roleListValue === item.name);
    //操作数据库
    let dbRes = await db;
    dbRes.update({u_name}, {$set: {u_password, roleName: role.name, roleCode: role.code, menuList: treeArr}}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        };
    });
    ctx.body = { code: 0, msg: '修改成功' };
});

module.exports = router;
