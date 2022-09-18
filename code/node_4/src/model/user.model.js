let mon = require('../db/mongodb.js');

const userModel = function () {
    return new Promise( async (resolve, reject) => {
        mon = await mon;
        //创建UserSchema
        let UserSchema = mon.Schema;
        //制定userRule
        let userRule = new UserSchema({
            name: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true,
            }
        });
        //创建userModel
        let userModel = mon.model('students2', userRule);
        resolve(userModel);
    } );
};

module.exports = userModel();