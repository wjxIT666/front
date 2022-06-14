import _ from 'lodash';
/**
 * 封装call方法
 */
export function call (fn, obj, ...args) {
    //判断obj
    let arr = [undefined, null];
    (arr.includes(obj)) && (obj = window);

    //改变this
    obj.tempFn = fn;
    //返回值
    let result = obj.tempFn(...args);
    //删除tempFn
    delete obj.tempFn;
    return result;
};

/**
 *  封装apply方法
 */
export function apply (fn, obj, array) {
    //判断obj
    let arr = [undefined, null];
    (arr.includes(obj)) && (obj = window);

    //改变this
    obj.tempFn = fn;
    //返回值
    let result = obj.tempFn(...array);
    //删除tempFn
    delete obj.tempFn;
    return result;
};

/**
 *  封装bind方法
 */
export function bind (fn, obj, ...args) {
    return function (...args2) {
        return fn.call(obj, ...args, ...args2);
    };
};

/**
 *  节流
 */
export function throttle (dom, event, doSome) {
    let throttled = _.throttle(doSome, 2000, { 'trailing': false });
    dom.addEventListener(event, throttled);
};

/**
 *  防抖
 */
export function debounce (dom, event, doSome) {
    let debounced = _.debounce(doSome, 2000);
    dom.addEventListener(event, debounced);
};
