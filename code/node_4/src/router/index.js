const fs = require('fs');
const Router = require('koa-router');
const router = new Router();
const { green } = require('chalk');

fs.readdirSync(__dirname).forEach( file => {
    console.log(green(`路由自动加载：${file}`));
    if (file !== 'index.js') {
        let f = require('./' + file);
        router.use(f.routes());
    };
} );

module.exports = router;