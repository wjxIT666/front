/**
 * 非空校验
 * @param {*} val 值 
 */
const isEmpty = (val) => {
    let arr = ['', undefined, null];
    if (arr.includes(val)) return false;
    else return true;
};

module.exports = {
    isEmpty
};
