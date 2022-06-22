const mongoose = require('mongoose');

//连接
mongoose.connect('mongodb://localhost:27017/demo');

const mon = function () {
    return new Promise ( (resolve, reject) => {
        //连接数据库
        mongoose.connection.on('open', () => { 
            //创建Schema
            let studentSchema = mongoose.Schema;
            //创建Rule
            let studentRule = new studentSchema({
                stu_id: {
                    type: String,
                    required: true,
                    unique: true
                },
                stu_name: {
                    type: String,
                    required: true
                },
                stu_age: {
                    type: Number,
                    required: true
                },
                hobby: {
                    type: Array
                },
                stu_flag: {
                    type: String,
                    default: 'Y'
                }
            });
            //创建model
            let studentModel = mongoose.model('students11', studentRule);
            resolve(studentModel);
        });
    } );
};

module.exports = mon();