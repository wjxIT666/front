const { blue } = require('chalk');
const userModel = require('../model/user.model.js');

class UserService {
    //新增用户
    async createUser ({ name, password }) {
        //1.获取数据
        console.log(blue('用户新增业务层', name, password));
        //2.调用模型层
        let res = await userModel;
        let result = await res.insertMany({ name, password });
        //3.返回查询结果
        return result[0];
    };
    //查询用户
    async queryUser ({ name, password }) {
        //1.获取数据
        console.log(blue('用户查询业务层', name, password));
        //2.调用模型层
        let res = await userModel;
        let result = await res.find({name, password});
        //3.返回查询结果
        return result[0];
    };
};

module.exports = new UserService();
