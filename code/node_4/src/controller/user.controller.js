const { gray } = require('chalk');
const { createUser, queryUser } = require('../service/user.service.js');

class UserController {
    //注册
    async regist (ctx, next) {
        //1.获取数据参数
        const { name, password } = ctx.request.body;
        console.log(gray('用户注册控制层', name, password));
        //2.调用业务层
        let result = await createUser({ name, password });
        //3.返回接口
        ctx.body = { code: 0, msg: '注册成功', result };
    };
    //登录
    async login (ctx, next) {
        //1.获取数据
        let { name, password } = ctx.request.body;
        console.log(gray('用户登录控制层', name, password));
        //2.调用业务层
        let result = await queryUser({ name, password });
        console.log(result, 'result');
        //3.返回接口
        ctx.body = { code: 0, msg: '登录成功', result };
    };
};

module.exports = new UserController();