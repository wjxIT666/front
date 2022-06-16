import http from './http.js';

const getInterface = () => {
    return http({
        method: 'GET',
        url: '/getInterface'
    });
};

export default {
    getInterface
};
