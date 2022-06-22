const { writeFile } = require('fs');
const { join } = require('path');

const writeFileFun = () => {
    return new Promise( (resolve, reject) => {
        writeFile(join(__dirname, '/write.txt'), '文件写入', () => {
            resolve();
        });
    } );
};

module.exports = writeFileFun();
