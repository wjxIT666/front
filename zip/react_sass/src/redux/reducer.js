import { GET_ACCOUNT } from './action_types.js';
//用户信息
let initName = '';
//解决页面刷新，redux丢失数据问题
let initNameSession = sessionStorage.getItem('userName');
if (initNameSession) initName = initNameSession;
export default function getAccount (preState = initName, action) {
    let { type, data } = action;
    switch (type) {
        case GET_ACCOUNT:
            let newPreState = data;
            return newPreState;
        default:
            return preState;    
    };
};
