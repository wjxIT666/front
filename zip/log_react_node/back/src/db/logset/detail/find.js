const db = require('./detail_collection.js');

const find = (id, current, pageSize) => {
    return new Promise( async (resolve, reject) => {
        let dbRes = await db;
        dbRes.find({id}, (err, data) => {
            if (err) reject(err);
            else {
                //分页查询
                dbRes.find({id}).skip((current - 1)*parseInt(pageSize)).limit(parseInt(pageSize)).exec(function (err, data2) {
                    if (err) reject(err);
                    else {
                        resolve(data);
                    };
                });
            };
        });
    } );
};

module.exports = {
    find
};
