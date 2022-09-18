const { blue } = require('chalk');
const goodsModel = require('../model/goods.model.js');

class GoodsService {
    //添加商品
    async createGood ({gname, price, gdesc}) {
        //1.获取数据
        console.log(blue('商品添加业务层', gname, price, gdesc));
        //2.操作数据库
        let res = await goodsModel;
        let result = await res.insertMany({gname, price, gdesc});
        //3.返回结果
        return result[0];
    };
    //修改商品
    async modifyGood ({ _id, gname, price, gdesc }) {
        //1.获取数据
        console.log(blue('商品修改业务层', _id, gname, price, gdesc));
        //2.操作数据库
        let res = await goodsModel;
        await res.update({ _id }, { $set: { gname, price, gdesc } });
        //3.返回结果
        return true;
    };
    //删除商品
    async deleteGood ({ _id }) {
        //1.获取数据
        console.log(blue('商品删除业务层', _id));
        //2.操作数据库
        let res = await goodsModel;
        let result = await res.remove({ _id });
        console.log(result);
        //3.返回结果
        return true;
    };
    //商品列表
    async queryListGood ({ pageSize, pageNum }) {
        //1.获取数据
        console.log(blue('商品列表业务层', pageSize, pageNum));
        //2.操作数据库
        let res = await goodsModel;
        let result = await res.find().skip((pageNum - 1) * pageSize).limit(pageSize);
        let total = result.length;
        //3.返回结果
        return { total, pageSize, pageNum, result };
    };
};

module.exports = new GoodsService();
