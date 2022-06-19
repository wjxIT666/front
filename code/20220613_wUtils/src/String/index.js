/**
 *  封装字符串倒叙
 */
export function stringReverse (str) {
    return str.split('').reverse().join('');
};

/**
 *  封装字符串超出部分，使用...代替
 */
export function overStep (str, num) {
    return str.length > num ? str.substring(0, num) + '...' : str;
};
