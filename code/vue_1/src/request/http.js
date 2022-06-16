import axios from 'axios';

//设置baseURL
const getBaseURL = (env) => {
    const baseURLObj = {
        'development': '/api',
        'production': ''
    };

    return baseURLObj[env];
};

//创建axios实例
const http = axios.create({
    timeout: 0,
    baseURL: getBaseURL(process.env.NODE_ENV)
});

//封装axios的请求拦截器
http.interceptors.request.use( config => {
    //判断请求方式
    config.method === 'post' ? config.data = {...config.data} : config.params = {...config.params};
    //设置数据请求方式
    config.headers['Content-Type'] = 'application/json';
    return config;
}, err => {
    return Promise.reject(err);
} );

//封装axios响应拦截器
http.interceptors.response.use( res => {
    if (res) {
        return res.data;
    } else {
        console.log('网络繁忙');
    };
}, err => {
    return Promise.reject(err);
} );

export default http;
