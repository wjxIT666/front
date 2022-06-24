//初始值
let initToken = '';

export function getToken (preState = initToken, action) {
    let { type, data } = action;
    console.log(type, data);
    switch (type) {
        case 'setToken':
            return initToken = data;
        default:
            return preState;
    };
};