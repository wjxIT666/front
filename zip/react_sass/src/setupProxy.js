const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/api', createProxyMiddleware({
        target: 'https://raystream-api.doulongyun.com',
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        }
    }));
    app.use('/instance', createProxyMiddleware({
        target: 'https://raystack-api.doulongyun.com',
        changeOrigin: true,
        pathRewrite: {
            '^/instance': ''
        }
    }));
};
