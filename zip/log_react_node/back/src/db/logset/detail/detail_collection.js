const mongoose = require('mongoose');

//创建Schema
let KPSchema = mongoose.Schema;
//制定规则
let KPRule = new KPSchema({
    id: {
        type: String
    },
    list: {
        type: Array
    }
});

const db = () => {
    return new Promise( (resolve, reject) => {
        //创建模型
        let KPModal = mongoose.model('logsetdetails', KPRule);
        resolve(KPModal);
    } );
};

module.exports = db();