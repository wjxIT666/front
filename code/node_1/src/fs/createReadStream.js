const { createReadStream, createWriteStream } = require('fs');
const { join } = require('path');

//创建文件读取流的实例
let crs = createReadStream(join(__dirname, '/read.txt'));
let cws = createWriteStream(join(__dirname, '/cws.txt'));

//监听open事件
crs.on('open', () => { console.log('文件开始读取') });
cws.on('open', () => { console.log('文件开始写入') });
//监听close事件
crs.on('close', () => { console.log('文件读取结束'); cws.end(); });
crs.on('close', () => { console.log('文件写入结束') });

const createReadStreamFun = () => {
    return new Promise( (resolve, reject) => {
        //监听data事件
        crs.on('data', chunk => {
            cws.write(chunk);
            resolve();
        });
    } );
};

module.exports = {
    createReadStreamFun: createReadStreamFun()
};
