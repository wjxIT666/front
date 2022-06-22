const express = require('express');
const router = express.Router();

function getMiddle (req, res, next) {
    let { id } = req.query;
    if (id === '001') {
        next();
    } else {
        res.json({code: 9, msg: 'id错误'});
        return;
    };
};

router.get('/', getMiddle, function (req, res) {
    res.json({code: 0, msg: 'get请求接口'});
});

module.exports = router;
