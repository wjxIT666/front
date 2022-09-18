const Koa = require('koa');
const app = new Koa();
const path = require('path');

//解析post请求
const koaBody = require('koa-body');
app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, './static'),
        keepExtensions: true
    }
}));

//加载静态资源
const koaStatic = require('koa-static');
app.use(koaStatic(path.join(__dirname, './static')));

const handlerError = require('../error/error.handler.js');

//引入路由
const router = require('../router/index.js');
app.use(router.routes()).use(router.allowedMethods());

//统一错误处理
app.on('error', handlerError);

module.exports = app;