const { gray } = require('chalk');
const { APP_PORT } = require('../config/config.default.js');

class UploadController {
    //上传
    async upload (ctx, next) {
        //1.获取数据
        let file = ctx.request.files.file;
        console.log(gray('上传控制层'));
        //2.操作数据
        let { newFilename } = file;
        //3.返回接口
        ctx.body = { code: 0, msg: '上传图片成功', result: { path: `http://localhost:${APP_PORT}/${newFilename}` } };
    };
};

module.exports = new UploadController();