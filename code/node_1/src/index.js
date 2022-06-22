const express = require('express');
const app = express();

//获取get请求接口
const getRouter = require('./router/getRouter.js');
app.use('/getRouter', getRouter);

app.listen(3001, () => { console.log('服务启动') });