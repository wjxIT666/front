const { gray } = require('chalk');
const { createGood, modifyGood, deleteGood, queryListGood } = require('../service/goods.service.js');

class GoodsController {
    //添加商品
    async addGood (ctx, next) {   
        //1.获取数据
        let { gname, price, gdesc } = ctx.request.body;
        console.log(gray('商品添加控制层', gname, price, gdesc));
        //2.操作业务层
        let result = await createGood({ gname, price, gdesc });
        //3.返回接口
        ctx.body = { code: 0, msg: '商品添加成功', result };
    };
    //修改商品
    async editGood (ctx, next) {
        //1.获取数据
        let { _id, gname, price, gdesc } = ctx.request.body;
        console.log(gray('商品修改控制层', _id, gname, price, gdesc));
        //2.操作业务层
        let result = await modifyGood({ _id, gname, price, gdesc });
        //3.返回接口
        ctx.body = { code: 0, msg: '修改商品成功', result };
    };
    //删除商品
    async delGood (ctx, next) {
        //1.获取数据
        let { _id } = ctx.request.body;
        console.log(gray('商品删除控制层', _id));
        //2.操作业务层
        let result = await deleteGood({ _id });
        //3.返回接口
        ctx.body = { code: 0, msg: '删除商品成功', result };
    };
    //商品列表
    async listGood (ctx, next) {
        //1.获取数据
        let { pageSize, pageNum } = ctx.request.body;
        console.log(gray('商品列表控制层', pageSize, pageNum));
        //2.操作业务层
        let result = await queryListGood({ pageSize, pageNum });
        //3.返回接口
        ctx.body = { code: 0, result };
    };
};

module.exports = new GoodsController();