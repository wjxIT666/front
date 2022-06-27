import axios from 'axios';
import { LoadingInterface } from '../js/ELE_Loading/loading.js';
import { MessageBox } from 'element-ui';
//设置baseURL
let baseURL;

//匹配环境
switch (process.env.NODE_ENV) {
    case 'development':
        console.log('开发环境');
        baseURL = '/api';
        break;
    case 'production':
        // baseURL = 'http://dev-inter.open.kuaipantech.com/api-saas';
        baseURL = 'https://inter.open.kuaipantech.com/api-saas';
        break;
};

//创建axios实例函数
const http = axios.create({
    timeout: 0,
    baseURL: baseURL
});

//创建请求拦截器
http.interceptors.request.use( config => {
    // LoadingInterface('req');
    //判断请求方式
    config.method === 'post' ? config.data = config.data : config.params = config.params;
    //判断数据方式
    config.headers['Content-Type'] = 'application/json';
    //请求头携带token
    let token = sessionStorage.getItem('token');
    if (token) {
        config.headers['Authorization-Corp'] = token;
    };
    return config;
}, err => {
    return Promise.reject(err);
} );

//创建相应拦截器
http.interceptors.response.use( res => {
    //判断请求方式
    if (res) {
        // LoadingInterface('res');
        //判断token失效
        if (res.data.code === 111 || res.data.code === 110) {
            MessageBox.alert('网络繁忙，请重新登录', {
                callback: action => {
                    //清空token
                    window.location.reload();
                    sessionStorage.removeItem('token');
                    return false;
                },
                showClose: false
            });
        } else {
            return res.data;
        };
    } else {
        console.log('网络繁忙');
    };
}, err => {
    return Promise.reject(err);
} );

export default http;
