const u_collection = require('./u_collection.js');

//查
const find = (obj) => {
    return new Promise( async (resolve, reject) => {
        let uRes = await u_collection;
        let {u_name, u_password} = obj;
        //查找数据
        uRes.find({u_name, u_password}, (error, data) => {
            if (error) reject(error);
            else {
                resolve(data);
            };
        });
    } ); 
};

module.exports = {
    find
};
