import axios from 'axios';
import { message } from 'antd';
import { ContentType, AccessId, Channel, Version } from './config.js';

//创建axios实例
const http = axios.create({
    timeout: 0
});

//创建请求拦截器
http.interceptors.request.use( config => {
    //判断请求方式
    config.method === 'post' ? config.data = {...config.data} : config.params = {...config.params};
    //判断请求头
    config.headers['Content-Type'] = ContentType;
    config.headers['accessId'] = AccessId;
    config.headers['channel'] = Channel;
    config.headers['version'] = Version;
    return config;
}, error => {
    return Promise.reject(error);
} );

//创建响应拦截器
http.interceptors.response.use( res => {
    if (res) {
        return res.data;
    } else {
        message.error('网络繁忙');
    };
}, error => {
    return Promise.reject(error);
} );

export default http;
