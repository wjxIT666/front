/**
 *  封装浅拷贝
 */
export function shallowClone (target) {
    //判断target的数据类型
    if (target instanceof Array) {
        return [...target];
    } else if (target !== null && typeof target === 'object') {
        return {...target};
    } else {
        return target;
    };
};

/**
 *  封装深拷贝
 *  解决函数属性丢失问题
 *  解决循环引用问题
 */
export function deepClone (target, map = new Map()) {
    //判断target的数据类型
    if (target instanceof Array || ( target !== null && typeof target === 'object' )) {
        //从map中取数据 使用map存数据，解决循环引用的问题，map与对象的区别，对象的key值只能是字符串
        let targetRes = map.get(target);
        if (targetRes) {
            return targetRes;
        };

        targetRes = target instanceof Array ? [] : {};
        //使用map存数据
        map.set(target, targetRes);

        for (let key in target) {
            if (target.hasOwnProperty(key)) {
                targetRes[key] = deepClone(target[key], map);
            };
        };
        return targetRes;
    } else {
        return target;
    };
};

