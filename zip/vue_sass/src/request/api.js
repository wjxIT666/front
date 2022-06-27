import http from './http.js';

//注册接口
const registerInterface = data => {
    return http({
        method: 'POST',
        url: '/open/corp/cus/register',
        data
    });
};

//登录接口
const loginInterface = data => {
    return http({
        method: 'POST',
        url: '/open/corp/cus/login',
        data
    });
};

//发送验证码
const sendCodeInterface = params => {
    return http({
        method: 'GET',
        url: '/sms/code/register',
        params
    });
};

//发送验证码--重置密码
const sendCodeResetInterface = params => {
    return http({
        method: 'GET',
        url: '/sms/code/pwd/reset',
        params
    });
};

//退出登录
const exitInterface = () => {
    return http({
        method: 'GET',
        url: '/open/corp/cus/logout'
    });
};

//重置密码
const resetPasswordInterface = data => {
    return http({
        method: 'POST',
        url: '/open/corp/cus/pwd/reset',
        data
    });
};

//修改密码
const updatePasswordInterface = data => {
    return http({
        method: 'POST',
        url: '/open/corp/cus/pwd/update',
        data
    });
};

//获取用户信息接口
const customerInterface = () => {
    return http({
        method: 'GET',
        url: '/open/corp/cus'
    });
};

//添加认证信息
const proveInterface = data => {
    return http({
        method: 'POST',
        url: '/open/corp/cus/prove',
        data
    });
};

//获取认证信息
const checkProveInterface = () => {
    return http({
        method: 'GET',
        url: '/open/corp/cus/prove'
    });
};

//更新认证信息
const updateProveInterface = data => {
    return http({
        method: 'PUT',
        url: '/open/corp/cus/prove',
        data
    });
};

//分页接口
const pageInterface = params => {
    return http({
        method: 'GET',
        url: '/open/game/page',
        params
    });
};

//新增游戏
const addGameInterface = data => {
    return http({
        method: 'POST',
        url: '/open/game',
        data
    });
};

//创建计划
const addPlanInterface = data => {
    return http({
        method: 'POST',
        url: '/open/gameplan',
        data
    });
};

//更新创建计划
const updateAddPlanInterface = data => {
    return http({
        method: 'PUT',
        url: '/open/gameplan',
        data
    });
};

//快盘协议
const KPInterface = () => {
    return http({
        method: 'GET',
        url: '/sys/config/info?id=1288310280056483842'
    });
};

//数据报表--游戏下拉列表
const DataTablePageInterface = data => {
    return http({
        method: 'POST',
        url: '/open/data/operation',
        data
    });
};

//数据报表--H5试玩游戏报表
const DataTableH5Interface = data => {
    return http({
        method: 'POST',
        url: '/open/data/stat/h5',
        data
    });
};

//数据报表--安卓试玩游戏报表
const DataTableAndroidInterface = data => {
    return http({
        method: 'POST',
        url: '/open/data/stat/andr',
        data
    });
};


export default {
    registerInterface,
    loginInterface,
    sendCodeInterface,
    exitInterface,
    resetPasswordInterface,
    sendCodeResetInterface,
    updatePasswordInterface,
    customerInterface,
    proveInterface,
    checkProveInterface,
    updateProveInterface,
    pageInterface,
    addGameInterface,
    addPlanInterface,
    updateAddPlanInterface,
    KPInterface,
    DataTablePageInterface,
    DataTableH5Interface,
    DataTableAndroidInterface
};
