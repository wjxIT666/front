/**
 *  封装map方法
 */
Array.prototype.myMap = function (callback) {
    //返回值
    let arr = [];

    for (let i = 0; i < this.length; i++) {
        arr.push(callback(this[i], i, this));
    };

    return arr;
};

/**
 *  封装filter方法
 */
Array.prototype.myFilter = function (callback) {
    //返回值
    let arr = [];

    //遍历
    for (let i = 0; i < this.length; i++) {
        let result = callback(this[i], i, this);
        if (result) {
            arr.push(this[i]);
        };
    };

    return arr;
};

/**
 *  封装find方法
 */
Array.prototype.myFind = function (callback) {
    //遍历
    for (let i = 0; i < this.length; i++) {
        let result = callback(this[i], i, this);
        if (result) {
            return this[i]
        };
    };

    return undefined;
};

/**
 *  封装findIndex方法
 */
Array.prototype.myFindIndex = function (callback) {
    //遍历
    for (let i = 0; i < this.length; i++) {
        let result = callback(this[i], i, this);
        if (result) {
            return i;
        };
    };

    return -1;
};

/**
 *  封装some方法
 */
Array.prototype.mySome = function (callback) {
    //遍历
    for (let i = 0; i < this.length; i++) {
        let result = callback(this[i], i, this);
        if (result) {
            return true;
        };
    };

    return false;
};

/**
 *  封装every方法
 */
Array.prototype.myEvery = function (callback) {
    //遍历
    for (let i = 0; i < this.length; i++) {
        let result = callback(this[i], i, this);
        if (!result) {
            return false;
        };
    };

    return true;
};

/**
 *  封装数组去重
 */
Array.prototype.myUniq = function () {
    //返回新数组
    let arr = [];

    arr = Array.from(new Set(this));

    return arr;
};

/**
 *  封装concat方法
 */
Array.prototype.myConcat = function (...args) {
    //返回新数组
    let arr = [...this];

    arr = arr.flat(arr.push(...args));

    return arr;
};

/**
 *  封装slice方法
 */
Array.prototype.mySlice  = function (begin, end) {
    //返回新数组
    let arr = [];

    //遍历
    for (let i = begin; i < end; i++) {
        arr.push(this[i]);
    };

    return arr;
};
