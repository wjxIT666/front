import axios from 'axios';
import { message } from 'antd';

const baseURL = (val) => {
    const baseVal = {
        'development': '/api',
        'production': ''
    };
    return baseVal[val];
};

//创建axios实例
const http = axios.create({
    timeout: 0,
    baseURL: baseURL(process.env.NODE_ENV)
});

//设置请求拦截器
http.interceptors.request.use( config => {
    //判断请求方式
    config.method === 'post' ? config.data = {...config.data} : config.params = {...config.params};
    //设置请求头的数据格式
    config.headers['Content-Type'] = 'application/json';
    //设置请求头Token
    let token = sessionStorage.getItem('token');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
}, err => {
    return Promise.reject(err);
} );

//设置响应拦截器
http.interceptors.response.use( res => {
    if (res) {
        if (res.data.code === 401) {
            //清空token
            sessionStorage.removeItem('token');
            message.error('token失效，请重新登录');
            window.location.href = 'http://localhost:3000/';
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
