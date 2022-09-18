const app = require('./app/koa.js');
const { APP_PORT } = require('./config/config.default.js');
const { green } = require('chalk');

app.listen(APP_PORT, () => { console.log(green(`serve running in http://localhost:${APP_PORT}`)) });