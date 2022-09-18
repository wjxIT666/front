let mon = require('../db/mongodb.js');

const goodsModel = () => {
    return new Promise( async (resolve, reject) => {
        mon = await mon;
        //创建GoodsSchema
        let GoodsSchema = mon.Schema;
        //制定GoodsRule
        let goodsRule = new GoodsSchema({
            gname: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            gdesc: {
                type: String
            }
        });
        //创建GoodsModel
        let goodsModel = mon.model('goods1', goodsRule);
        resolve(goodsModel);
    } );
};

module.exports = goodsModel();
