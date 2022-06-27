const db = require('../u_collection.js');

const find = (current, pageSize) => {
    return new Promise( async (resolve, reject) => {
        let dbRes = await db;
        dbRes.find({}, (err, data) => {
            if (err) reject(err);
            else {
                let count = data.length;
                dbRes.find({}).skip((current - 1) * pageSize).limit(pageSize).exec( (err, data2) => {
                    let obj = {
                        total: count,
                        data: data2
                    };
                    resolve(obj);
                } );
            };
        });
    } );
};

module.exports = {
    find
};
