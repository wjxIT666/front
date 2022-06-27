const db = require('../u_collection.js');

const addFind = (u_name) => {
    return new Promise( async (resolve, reject) => {
        let dbRes = await db;
        dbRes.find({u_name}, (err, data) => {
            if (err) console.log(err);
            else {
                resolve(data);
            };
        });
    } );
};

module.exports = {
    addFind
};
