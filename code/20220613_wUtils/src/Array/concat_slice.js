/**
 *  封装concat方法
 */
export function concat (array, ...args) {
    //返回新数组
    let arr = [...array];

    arr = arr.flat(arr.push(...args));

    return arr;
};

/**
 *  封装slice方法
 */
export function slice (array, begin, end) {
    //返回截取的字段
    let arr = [];

    //遍历
    for (let i = begin; i < end; i++) {
        arr.push(array[i]);
    };

    return arr;
};
