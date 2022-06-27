const db = require('./role_collection.js');

const find = () => {
    return new Promise( async (resolve, reject) => {
        let dbRes = await db;
        //查
        dbRes.find({}, (err, data) => {
            if (err) reject(err);
            else resolve(data); 
        });
    } );
};

module.exports = find();
