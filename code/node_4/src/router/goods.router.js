const Router = require('koa-router');
const router = new Router({prefix: '/goods'});

const { addGood, editGood, delGood, listGood } = require('../controller/goods.controller.js');
const { isEmpty, _idIsNull, paramsIsNull } = require('../middleware/goods.middleware.js');

//添加商品
router.post('/addGood', isEmpty, addGood);

//修改商品
router.post('/editGood', _idIsNull, editGood);

//删除商品
router.post('/deleteGood', _idIsNull, delGood);

//商品列表
router.post('/listGood', paramsIsNull, listGood);

module.exports = router;