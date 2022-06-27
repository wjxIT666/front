import { message } from 'antd';
/**
 * 非空校验
 * @param {*} val 值 
 * @param {*} msg 提示
 */
export const isEmpty = (val, msg) => {
    let arr = ['', undefined, null];
    if (arr.includes(val)) {
        message.error(msg);
        return false;
    } else {
        return true;
    };
};

/**
 * 添加antd-table的key
 * @param {*} obj table的每一项
 * @param {*} val 以table的唯一项作为key值
 */
export const addKey = (obj, val) => {
    Object.defineProperty(obj, 'key', {
        writable: true,
        enumerable: true,
        configurable: true,
        value: val
    });
};

/**
 * 日期转换字符串
 * @param {*} date 传入日期
 */
export const timeChange = (date) => {
    if (date === undefined) return false;
    let year = new Date(date).getFullYear();
    let month = new Date(date).getMonth();
    month = month + 1;
    month = month >= 10 ? month : `0${month}`;
    let day = new Date(date).getDate();
    day = day >= 10 ? day : `0${day}`;
    let hours = new Date(date).getHours();
    hours = hours >= 10 ? hours : `0${hours}`;
    let minutes = new Date(date).getMinutes();
    minutes = minutes >= 10 ? minutes : `0${minutes}`;
    let seconds = new Date(date).getSeconds();
    seconds = seconds >= 10 ? seconds : `0${seconds}`;
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
