const mongoose = require('mongoose');
const { logset_collection } = require('../../common/config.js');

//创建KPSchema
let KPSchema = mongoose.Schema;

//制定KPRule
let KPRule = new KPSchema({
    projName: {
        type: String,
        required: true
    },
    tags: {
        type: Array
    },
    ctime: {
        type: Date
    },
    cuser: {
        type: String
    }
});

//监听连接
const db = () => {
    return new Promise((resolve, reject) => {
        //制定KPModel
        let KPModel = mongoose.model(logset_collection, KPRule);
        resolve(KPModel);
    });
};

module.exports = db();