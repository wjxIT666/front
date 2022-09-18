const { dataGoodsIsNull, _idGoodsIsNull, paramsGoodIsNull } = require('../error/error.default.js');
const goodsModel = require('../model/goods.model.js');
const { bgYellow } = require('chalk');
/**
 * 非空校验
 */
const isEmpty = async (ctx, next) => {
    //1.获取数据
    let { gname, price } = ctx.request.body;
    //2.操作数据
    let empty = ['', undefined, null];
    if (empty.includes(gname) || empty.includes(price)) return ctx.app.emit('error', dataGoodsIsNull, ctx);
    //3.放行
    await next();
};

/**
 * _id校验
 */
const _idIsNull = async (ctx, next) => {
    //1.获取数据
    let { _id } = ctx.request.body;
    //2.操作数据
    try {
        let res = await goodsModel;
        let result = await res.find({ _id });
        if (result.length === 0) return ctx.app.emit('error', _idGoodsIsNull, ctx);
    } catch (e) {
        console.log(bgYellow(e.message));
        return ctx.app.emit('error', _idGoodsIsNull, ctx);
    };
    //3.放行
    await next();
};

/**
 * 参数为空校验
 */
const paramsIsNull = async (ctx, next) => {
    //1.获取数据
    let { pageSize, pageNum } = ctx.request.body;
    //2.操作数据
    let empty = ['', undefined, null];
    if (empty.includes(pageSize) || empty.includes(pageNum)) return ctx.app.emit('error', paramsGoodIsNull, ctx);
    //3.放行
    await next();
};

module.exports = {
    isEmpty,
    _idIsNull,
    paramsIsNull
};
