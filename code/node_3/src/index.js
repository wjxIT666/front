const Koa = require('koa');
const app = new Koa();
/** 引入chalk */
const { blue } = require('chalk');
/** 解析post请求 */
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
/** 引入路径 */
const { resolve } = require('path');
/** 使用静态资源 */
const static = require('koa-static');
app.use(static(resolve(__dirname, 'public')));

app.use( (ctx, next) => {
    return next().catch( err => {
        if (err.status === 401) {
            ctx.body = { code: 9, msg: '鉴权失败' };
        };
    } );
} );

/** jwt解析生成token */
const jwt = require('koa-jwt');
app.use(jwt({ secret: 'privateKey' }).unless({ path: /\login/ }));

/** 引入路由 */
const login = require('./router/login.js');
app.use(login.routes()).use(login.allowedMethods());
const exit = require('./router/exit.js');
app.use(exit.routes()).use(exit.allowedMethods());

/** 监听3001端口 */
app.listen(3001, () => { console.log(blue('koa 服务启动')) });

