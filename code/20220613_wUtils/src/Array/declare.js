/**
 *  封装map方法
 */
export function map (array, callback) {
    //返回新数组
    let arr = [];

    //遍历
    for (let i = 0; i < array.length; i++) {
        arr.push(callback(array[i], i, array));
    };

    return arr;
};

/**
 *  封装filter方法
 */
export function filter (array, callback) {
    //返回新数组
    let arr = [];

    //遍历
    for (let i = 0; i < array.length; i++) {
        let result = callback(array[i], i, array);
        if (result) {
            arr.push(array[i]);
        };
    };

    return arr;
};

/**
 *  封装find方法
 */
export function find (array, callback) {
    //遍历
    for (let i = 0; i < array.length; i++) {
        let result = callback(array[i], i, array);
        if (result) {
            return array[i];
        };
    };

    return undefined;
};

/**
 *  封装findIndex方法
 */
export function findIndex (array, callback) {
    //遍历
    for (let i = 0; i < array.length; i++) {
        let result = callback(array[i], i, array);
        if (result) {
            return i;
        };
    };

    return -1;
};

/**
 *  封装some方法
 */
export function some (array, callback) {
    //遍历
    for (let i = 0; i < array.length; i++) {
        let result = callback(array[i], i, array);
        if (result) {
            return true;
        };
    };

    return false;
};

/**
 *  封装every方法
 */
export function every (array, callback) {
    //遍历
    for (let i = 0; i < array.length; i++) {
        let result = callback(array[i], i, array);
        if (!result) {
            return false;
        };
    };

    return true;
};
