const Koa = require('koa');
const app = new Koa();
const { port, log, green, privateKey } = require('./src/common/config.js');
//解析post请求
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
//登录认证
const jwt = require('koa-jwt');
//错误信息处理
app.use(async (ctx, next) => {
    return next().catch((err) => {
        if (err.status == 401) {
            ctx.body = {
                code: 401,
                message: '用户鉴权失败',
            };
        } else {
            throw err;
        };
    });
});
//中间件注册
app.use(jwt({ secret: privateKey }).unless({ path: /\/login/ }));

//登录路由
const loginRouter = require('./src/router/loginRouter.js');
app.use(loginRouter.routes()).use(loginRouter.allowedMethods());
//登出路由
const exitRouter = require('./src/router/exitRouter.js');
app.use(exitRouter.routes()).use(exitRouter.allowedMethods());
//日志配置--添加项目
const logSetProjAddRouter = require('./src/router/logSetProjAddRouter.js');
app.use(logSetProjAddRouter.routes()).use(logSetProjAddRouter.allowedMethods());
//日志配置--列表接口
const logSetTableRouter = require('./src/router/logSetTableRouter.js');
app.use(logSetTableRouter.routes()).use(logSetTableRouter.allowedMethods());
//日志配置--日志条目--增
const checkDetailAddRouter = require('./src/router/checkDetailAddRouter.js');
app.use(checkDetailAddRouter.routes()).use(checkDetailAddRouter.allowedMethods());
//日志配置--日志条目--查
const checkDetailQueryRouter = require('./src/router/checkDetailQueryRouter.js');
app.use(checkDetailQueryRouter.routes()).use(checkDetailQueryRouter.allowedMethods());
//日志配置--日志条目--删
const checkDetailDeleteRouter = require('./src/router/checkDetailDeleteRouter.js');
app.use(checkDetailDeleteRouter.routes()).use(checkDetailDeleteRouter.allowedMethods());
//日志配置--日志条目--改
const checkDetailEditRouter = require('./src/router/checkDetailEditRouter.js');
app.use(checkDetailEditRouter.routes()).use(checkDetailEditRouter.allowedMethods());
//角色路由
const roleRouter = require('./src/router/roleRouter.js');
app.use(roleRouter.routes()).use(roleRouter.allowedMethods());
//用户路由--添加
const userAddRouter = require('./src/router/userAddRouter.js');
app.use(userAddRouter.routes()).use(userAddRouter.allowedMethods());
//用户列表
const userTableRouter = require('./src/router/userTableRouter.js');
app.use(userTableRouter.routes()).use(userTableRouter.allowedMethods());
//用户列表--删除
const userDeleteRouter = require('./src/router/userDeleteRouter.js');
app.use(userDeleteRouter.routes()).use(userDeleteRouter.allowedMethods());
//用户信息
const userInfoRouter = require('./src/router/userInfoRouter.js');
app.use(userInfoRouter.routes()).use(userInfoRouter.allowedMethods());
//用户信息--修改
const userEditRouter = require('./src/router/userEditRouter.js');
app.use(userEditRouter.routes()).use(userEditRouter.allowedMethods());
//角色列表
const roleTableRouter = require('./src/router/roleTableRouter.js');
app.use(roleTableRouter.routes()).use(roleTableRouter.allowedMethods());

app.listen(port, () => { log(green(`server run at ${port} port`)) });
