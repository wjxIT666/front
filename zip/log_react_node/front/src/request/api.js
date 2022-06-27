import http from './http.js';

//登录接口
export const login = data => {
    return http({
        method: 'POST',
        url: '/login',
        data
    });
};

//退出接口
export const exit = () => {
    return http({
        method: 'GET',
        url: '/exit'
    });
};

//日志配置--创建项目
export const createProj = data => {
    return http({
        method: 'POST',
        url: '/createProj',
        data
    });
};

//日志配置--列表接口
export const logSetTable = data => {
    return http({
        method: 'POST',
        url: '/logSetTable',
        data
    });
};

//日志配置--添加条目--增
export const checkDetailAdd = data => {
    return http({
        method: 'POST',
        url: '/checkDetailAdd',
        data
    });
};

//日志配置--添加条目--查
export const checkDetailQuery = data => {
    return http({
        method: 'POST',
        url: '/checkDetailQuery',
        data
    });
};

//日志配置--添加条目--删
export const checkDetailDelete = data => {
    return http({
        method: 'POST',
        url: '/checkDetailDelete',
        data
    });
};

//日志配置--添加条目--改
export const checkDetailEdit = data => {
    return http({
        method: 'POST',
        url: '/checkDetailEdit',
        data
    });
};

//角色
export const role = () => {
    return http({
        method: 'GET',
        url: '/role'
    });
};

//用户--添加
export const userAdd = data => {
    return http({
        method: 'POST',
        url: '/userAdd',
        data
    });
};

//用户--列表
export const userTable = data => {
    return http({
        method: 'POST',
        url: '/userTable',
        data
    });
};

//用户--删除
export const userDelete = data => {
    return http({
        method: 'POST',
        url: '/userDelete',
        data
    });
};

//用户信息
export const userInfo = data => {
    return http({
        method: 'POST',
        url: '/userInfo',
        data
    });
};

//用户--修改
export const userEdit = data => {
    return http({
        method: 'POST',
        url: '/userEdit',
        data
    });
};

//角色列表
export const roleTable = data => {
    return http({
        method: 'POST',
        url: '/roleTable',
        data
    });
};
