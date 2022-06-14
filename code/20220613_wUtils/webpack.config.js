const { resolve } = require('path');
module.exports = {
    //模式
    mode: 'development', //开发环境
    // mode: 'production', //生产环境
    //入口文件
    entry: './src/index.js',
    //出口
    output: {
        //路径
        path: resolve(__dirname, 'dist'),
        //文件名
        filename: '20220613_wUtils.js',
        // filename: '20220613_wUtils.min.js',
        //导出对象
        library: 'wUtils',
        //可接收的引入方式 支持ES6 common.js
        libraryTarget: 'umd'
    }
};
