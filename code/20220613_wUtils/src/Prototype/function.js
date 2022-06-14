/**
 * 封装call方法
 */
Function.prototype.myCall = function (obj, ...args) {
    //判断obj
    let arr = [undefined, null];
    (arr.includes(obj)) && (obj = window);

    //改变this
    obj.tempFn = this;
    //设置返回值
    let result = obj.tempFn(...args);
    //删除tempFn
    delete obj.tempFn;
    return result;
};

/**
 *  封装apply方法
 */
Function.prototype.myApply = function (obj, array) {
    //判断obj
    let arr = [undefined, null];
    (arr.includes(obj)) && (obj = window);

    //改变this
    obj.tempFn = this;
    //返回值
    let result = obj.tempFn(...array);
    //删除tempFn
    delete obj.tempFn;
    return result;
};

/**
 *  封装bind方法
 */
Function.prototype.myBind = function (obj, ...args) {
    return (...args2) => {
        return this.myCall(obj, ...args, ...args2);
    };
};
