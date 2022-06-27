const db = require('./logset_collection.js');
const { green, log } = require('../../common/config.js');

const find = (current, pageSize, projName, cuser, startTime, endTime) => {
    return new Promise( async (resolve, reject) => {
        let dbRes = await db;
        let querySearch = {projName, cuser};
        let querySearchReg = {};
        for (let key in querySearch) {
            log(green(querySearch[key]), 'querySearch[key]');
            if (querySearch[key] === undefined || querySearch[key].replace(/\s+/g, '') === '') {
                delete querySearch[key];
            } else {
                //实现模糊查询
                querySearchReg[key] = new RegExp(querySearch[key]);
            };
        };
        //添加时间搜索
        let startTimeRule = startTime === '' || startTime === undefined;
        let endTimeRule = endTime === '' || endTime === undefined;
        if (!startTimeRule && !endTimeRule) {
            Object.defineProperty(querySearchReg, 'ctime', {
                writable: true,
                configurable: true,
                enumerable: true,
                value: { "$gte": startTime, "$lt": endTime }
            });
        };
        log(querySearchReg, 'querySearchReg');
        dbRes.find(querySearchReg, (err, data) => {
            if (err) reject(err);
            else {
                //数据总数
                let count = data.length; 
                //分页查询
                dbRes.find(querySearchReg).skip((current - 1)*parseInt(pageSize)).limit(parseInt(pageSize)).exec(function (err, data) {
                    if (err) reject(err);
                    else {
                        let obj = {
                            count,
                            data
                        };
                        resolve(obj);
                    };
                });
            };
        });
    } ); 
};

module.exports = {
    find
};
