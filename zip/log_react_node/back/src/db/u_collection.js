const mongoose = require('mongoose');
const { db_port, u_collection } = require('../common/config.js');
//连接mongondb
mongoose.connect(db_port);

//监听连接
const db = () => {
    return new Promise( (resolve, reject) => {
        mongoose.connection.on('open', err => {
            if (err) reject(err);
            else {
                //创建KPSchema
                let KPSchema = mongoose.Schema;
                //制定KPRule
                let KPRule = new KPSchema({
                    u_name: {
                        type: String,
                        required: true
                    },
                    u_password: {
                        type: String,
                        required: true
                    },
                    ctime: {
                        type: Date
                    },
                    roleName: {
                        type: String
                    },
                    roleCode: {
                        type: String
                    },
                    grantor: {
                        type: String
                    },
                    menuList: {
                        type: Array
                    }
                })
                //制定KPModel
                let KPModel = mongoose.model(u_collection, KPRule);
                resolve(KPModel);
            };
        });
    } );
};

module.exports = db();