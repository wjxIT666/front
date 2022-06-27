const chalk = require('chalk');
const green = chalk.green.bold; //成功提示
const red = chalk.red.blod; //失败提示
const blue = chalk.blue.blod; //打印提示
const log = console.log; //打印
const port = 3001; //端口号
const db_port = 'mongodb://localhost:27017/kplog'; //mongo数据库
const u_collection = 'users'; //用户集合
const privateKey = 'KP_JWT_SECRET'; //鉴权Key
const logset_collection = 'logsets'; //日志配置集合

module.exports = {
    green,
    red,
    blue,
    log,
    port,
    db_port,
    u_collection,
    privateKey,
    logset_collection
};
