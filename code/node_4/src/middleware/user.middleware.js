const { dataIsNull, dataIsExist, dataIsError } = require('../error/error.default.js');
const userModel = require('../model/user.model.js');
/**
 * 非空校验
 */
const isEmpty = async (ctx, next) => {
    //1.获取数据
    let { name, password } = ctx.request.body;
    //2.判断数据
    let empty = ['', null, undefined];
    if (empty.includes(name) || empty.includes(password)) return ctx.app.emit('error', dataIsNull, ctx);
    //3.放行
    await next();
};

/**
 * 合法校验--注册
 */
const isRepeat = async (ctx, next) => {
    //1.获取数据
    let { name } = ctx.request.body;
    //2.判断数据
    let res = await userModel;
    let result = await res.find({ name });
    if (result.length > 0) return ctx.app.emit('error', dataIsExist, ctx);
    //3.放行
    await next();
};

/**
 * 合法校验--登录
 */
const isError = async (ctx, next) => {
    //1.获取数据
    let { name, password } = ctx.request.body;
    //2.判断数据
    let res = await userModel;
    let result = await res.find({ name, password });
    if (result.length === 0) return ctx.app.emit('error', dataIsError, ctx);
    //3.放行
    return next();
};

module.exports = {
    isEmpty,
    isRepeat,
    isError
};
