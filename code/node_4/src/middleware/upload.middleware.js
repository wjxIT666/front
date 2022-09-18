const { imageIsNull } = require('../error/error.default.js');
/**
 * 上传校验
 */
const uploadReg = async (ctx, next) => {
    //1.获取数据
    let file = ctx.request.files.file;
    //2.判断数据
    if (!file) return ctx.app.emit('error', imageIsNull, ctx);
    //3.放行
    await next();
};

module.exports = {
    uploadReg
};
