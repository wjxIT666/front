const mongoose = require('mongoose');

//创建Schema
let KPSchema = mongoose.Schema;
//制定规则
let KPRule = new KPSchema({
    name: {
        type: String
    },
    code: {
        type: String
    }
});

const db = () => {
    return new Promise( (resolve, reject) => {
        let KPmodel = mongoose.model('roletables', KPRule);
        resolve(KPmodel);
    } );
};

module.exports = db();