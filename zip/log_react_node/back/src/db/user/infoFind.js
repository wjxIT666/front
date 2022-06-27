const db = require('../../db/u_collection.js');

const infoFind = (u_name) => {
    return new Promise( async (resolve, reject) => {
        let dbRes = await db;
        dbRes.find({u_name}, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    } );
};

module.exports = {
    infoFind
};
