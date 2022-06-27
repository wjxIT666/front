import { message } from 'antd';

/** 校验长度 */
export const lengthRule = function (value, length, msg) {
    if (value.length > length) { 
        message.error(msg)
        return false; 
    } else {
        return true;
    };
};

/** 校验特殊字符 */
export const specialUnicode = function (value, msg) {
    let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
    regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
    if(regEn.test(value) || regCn.test(value)) {
        message.error(msg);
        return false;
    } else {
        return true;
    };
};

/** 非空校验 */
export const isEmpty = function (value, msg) {
    if (value === '' || value === null || value === undefined) {
        message.error(msg);
        return false;
    } else {
        return true;
    };
};

/** 校验并发数 */
export const isCountEmpty = function (value, msg) {
    if (value === 0) {
        message.error(msg);
        return false;
    } else {
        return true;
    };
};

/** 校验数组长度 */
export const arrayLength = function (arr, msg) {
    if (arr.length <= 0) {
        message.error(msg);
        return false;
    } else {
        return true;
    };
};

/** 校验二次密码 */
export const rePwd = function (pwd, rePwd, msg) {
    if (pwd !== rePwd) {    
        message.error(msg);
        return false;
    } else {
        return true;
    };
};
