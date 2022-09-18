const Router = require('koa-router');
const router = new Router();

const { upload } = require('../controller/upload.controller.js');
const { uploadReg } = require('../middleware/upload.middleware.js');

//上传接口
router.post('/upload', uploadReg, upload);

module.exports = router;