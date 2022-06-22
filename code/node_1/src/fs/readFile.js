const { readFile } = require('fs');
const { join } = require('path');

const readFileFun = () => {
    return new Promise( (resolve, reject) => {
        readFile(join(__dirname, '/read.txt'), (err, data) => {
            if (err) reject(err);
            else {
                resolve(data);
            }; 
        });
    } );
};

module.exports = readFileFun();