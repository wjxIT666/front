/**
 *  数组去重
 */
export function uniq (array) {
    //返回新数组
    let arr = [];

    arr = Array.from(new Set(array));

    return arr;
};