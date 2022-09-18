const dataIsNull = {
    code: 10001,
    result: {
        msg: '用户名或者密码不能为空'
    }
};

const dataIsExist = {
    code: 10002,
    result: {
        msg: '用户已存在'
    }
};

const dataIsError = {
    code: 10003,
    result: {
        msg: '用户名或者密码不正确'
    }
};

const dataGoodsIsNull = {
    code: 20001,
    result: {
        msg: '商品参数不能为空'
    }
};

const _idGoodsIsNull = {
    code: 20002,
    result: {
        msg: '商品未找到'
    }
};

const paramsGoodIsNull = {
    code: 20003,
    result: {
        msg: '商品参数错误'
    }
};

const imageIsNull = {
    code: 30001,
    result: {
        msg: '请上传图片'
    }
};


module.exports = {
    dataIsNull,
    dataIsExist,
    dataIsError,
    dataGoodsIsNull,
    imageIsNull,
    _idGoodsIsNull,
    paramsGoodIsNull
};
