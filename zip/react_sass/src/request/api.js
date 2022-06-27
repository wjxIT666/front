import http from './http.js';
import { getSign } from './sign.js';
import { API, INSTANCE, KP } from './config.js';

//签名
let signRes;

//应用游戏列表
export const applyGameList = async data => {
    let REGION = '""'; //签名规则不一样，斗罗云不传，签名生成null，签名会错误，需要传一个字符串
    let Time = parseInt(Date.now() / 1000);
    let Nonce = parseInt(Math.random()*(999999-1)+1);
    signRes = await getSign(data, '/raystream/open/app/list', REGION, Nonce, Time);
    return http({
        method: 'POST',
        url: `${API}/raystream/open/app/list`,
        headers: {
            region: REGION,
            nonce: Nonce,
            timestamp: Time,
            signature: signRes
        },
        data
    });
};

//分发应用
export const publishGame = async data => {
    let REGION = '""';
    let Time = parseInt(Date.now() / 1000);
    let Nonce = parseInt(Math.random()*(999999-1)+1);
    signRes = await getSign(data, '/raystream/open/app/publish', REGION, Nonce, Time);
    return http({
        method: 'POST',
        url: `${API}/raystream/open/app/publish`,
        headers: {
            region: REGION,
            nonce: Nonce,
            timestamp: Time,
            signature: signRes
        },
        data
    });
};

//创建游戏token
export const getToken = async data => {
    let REGION = '""';
    let Time = parseInt(Date.now() / 1000);
    let Nonce = parseInt(Math.random()*(999999-1)+1);
    signRes = await getSign(data, '/raystream/open/app/session/create', REGION, Nonce, Time);
    return http({
        method: 'POST',
        url: `${API}/raystream/open/app/session/create`,
        headers: {
            region: REGION,
            nonce: Nonce,
            timestamp: Time,
            signature: signRes
        },
        data
    });
};

//浏览器启动
export const startGame = async (data, regin) => {
    let REGION = regin;
    let Time = parseInt(Date.now() / 1000);
    let Nonce = parseInt(Math.random()*(999999-1)+1);
    signRes = await getSign(data, '/raystream/open/app/start', REGION, Nonce, Time);
    return http({
        method: 'POST',
        url: `${API}/raystream/open/app/start`,
        headers: {
            region: REGION,
            nonce: Nonce,
            timestamp: Time,
            signature: signRes
        },
        data
    });
};

//新增应用
export const addGame = async data => {
    let REGION = '""';
    let Time = parseInt(Date.now() / 1000);
    let Nonce = parseInt(Math.random()*(999999-1)+1);
    signRes = await getSign(data, '/raystream/open/app/add/v2', REGION, Nonce, Time);
    return http({
        method: 'POST',
        url: `${API}/raystream/open/app/add/v2`,
        headers: {
            region: REGION,
            nonce: Nonce,
            timestamp: Time,
            signature: signRes
        },
        data
    });
};

//升级游戏
export const updateGame = async data => {
    let REGION = '""';
    let Time = parseInt(Date.now() / 1000);
    let Nonce = parseInt(Math.random()*(999999-1)+1);
    signRes = await getSign(data, '/raystream/open/app/upgrade/v2', REGION, Nonce, Time);
    return http({
        method: 'POST',
        url: `${API}/raystream/open/app/upgrade/v2`,
        headers: {
            region: REGION,
            nonce: Nonce,
            timestamp: Time,
            signature: signRes
        },
        data
    });
};

//设备列表
export const cloudList = async (data, regin) => {
    let REGION = regin;
    let Time = parseInt(Date.now() / 1000);
    let Nonce = parseInt(Math.random()*(999999-1)+1);
    signRes = await getSign(data, '/raystack/open/api/instance/list', REGION, Nonce, Time, 'raystack-api.doulongyun.com');
    return http({
        method: 'POST',
        url: `${INSTANCE}/raystack/open/api/instance/list`,
        headers: {
            region: REGION,
            nonce: Nonce,
            timestamp: Time,
            signature: signRes
        },
        data
    }); 
};

//设备重启
export const cloudReset = async (data, regin) => {
    let REGION = regin;
    let Time = parseInt(Date.now() / 1000);
    let Nonce = parseInt(Math.random()*(999999-1)+1);
    let paramsSign = {};
    console.log(data, 'data');
    let { instanceIds } = data;
    instanceIds.forEach( (item, key) => {
        let value = 'instanceIds' + key;
        paramsSign[value] = item;
    } );
    signRes = await getSign(paramsSign, '/raystack/open/api/instance/restart', REGION, Nonce, Time, 'raystack-api.doulongyun.com');
    return http({
        method: 'POST',
        url: `${INSTANCE}/raystack/open/api/instance/restart`,
        headers: {
            region: REGION,
            nonce: Nonce,
            timestamp: Time,
            signature: signRes
        },
        data
    }); 
};

//进程列表
export const processList = async (data, regin) => {
    let REGION = regin;
    let Time = parseInt(Date.now() / 1000);
    let Nonce = parseInt(Math.random()*(999999-1)+1);
    signRes = await getSign(data, '/raystream/open/app/running/list', REGION, Nonce, Time);
    return http({
        method: 'POST',
        url: `${API}/raystream/open/app/running/list`,
        headers: {
            region: REGION,
            nonce: Nonce,
            timestamp: Time,
            signature: signRes
        },
        data
    }); 
};

//游戏中止
export const gameOver = async (data, regin) => {
    let REGION = regin;
    let Time = parseInt(Date.now() / 1000);
    let Nonce = parseInt(Math.random()*(999999-1)+1);
    let paramsSign = {};
    let { processIds } = data;
    processIds.forEach( (item, key) => {
        let value = 'processIds' + key;
        paramsSign[value] = item;
    } );
    signRes = await getSign(paramsSign, '/raystream/open/app/stop', REGION, Nonce, Time);
    return http({
        method: 'POST',
        url: `${API}/raystream/open/app/stop`,
        headers: {
            region: REGION,
            nonce: Nonce,
            timestamp: Time,
            signature: signRes
        },
        data
    }); 
};

//登录接口--快盘
export const loginKP = data => {
    return http({
        method: 'POST',
        url: `${KP}/api/sys/login`,
        data
    });
};

//获取用户信息--快盘
export const userKP = () => {
    return http({
        method: 'GET',
        url: `${KP}/api/sys/login/user/info`,
        headers: {
            Authorization: sessionStorage.getItem('token')
        }
    });
};

//退出登录接口--快盘
export const exitLoginKP = () => {
    return http({
        method: 'POST',
        url: `${KP}/api/sys/logout`,
        headers: {
            Authorization: sessionStorage.getItem('token')
        }
    });
};

//重置密码接口--快盘
export const resetPwdKP = data => {
    return http({
        method: 'POST',
        url: `${KP}/api/sys/user/update/pwd`,
        data,
        headers: {
            Authorization: sessionStorage.getItem('token')
        }
    });
};

//设备地域
export const cloudRegin = async (data) => {
    let REGION = 'all';
    let Time = parseInt(Date.now() / 1000);
    let Nonce = parseInt(Math.random()*(999999-1)+1);
    signRes = await getSign(data, '/raystack/open/api/region/list', REGION, Nonce, Time, 'raystack-api.doulongyun.com');
    return http({
        method: 'POST',
        url: `${INSTANCE}/raystack/open/api/region/list`,
        headers: {
            region: REGION,
            nonce: Nonce,
            timestamp: Time,
            signature: signRes
        },
        data
    }); 
};
