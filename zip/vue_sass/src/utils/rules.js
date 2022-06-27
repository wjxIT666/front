/** 
 * C端校验
*/

//校验手机号
export const checkTel = (rule, value, callback, message) => {
    const reg = /^[1][0-9][0-9]{9}$/;
    if (value === '') {
        callback(new Error(`${message}`));
    } else if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号'));
    } else {
        callback();
    };
};

//封装密码校验共用代码
const passwordCommon = (value, callback) => {
    const reg = /^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{8,20}$/;
    if (value === '') {
        callback(new Error('请输入密码'));
    } else if (!reg.test(value)) {
        callback(new Error('密码长度8-20位，同时包含数字以及字母'));
    };
};

//校验密码
export const checkPassword = (rule, value, callback) => {
    passwordCommon (value, callback);
    callback();
};

//同一密码校验
export const checkRepeatPassword = (rule, value, callback, valueAgain) => {
    passwordCommon (value, callback);
    if (value === valueAgain) {
        callback(new Error('新旧密码重复，请重新输入'));
    } else {
        callback();
    };
};

//二次校验密码
export const checkPasswordAgain = (rule, value, callback, valueAgain) => {
    passwordCommon (value, callback);
    if (value !== valueAgain) {
        callback(new Error('两次输入的密码不一致，请重新输入'));
    } else {
        callback();
    };
};

//封装通用校验信息
const infoCommon = (value, callback, name) => {
    if (value === '') {
        callback(new Error(`${name}信息必填`));
    } else if (value.length > 50) {
        callback(new Error(`${name}不超过50个字，请重新输入`));
    };
};

//单位名称校验
export const checkUnitName = (rule, value, callback) => {
    infoCommon (value, callback, '单位名称');
    callback();
};

//统一社会信用校验
export const checkCode = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('统一社会信用代码信息必填'));
    } else if (value.length != 18) {
        callback(new Error('请输入正确内容'));
    } else {
        callback();
    };
};

//联系人姓名校验
export const checkName = (rule, value, callback) => {
    infoCommon (value, callback, '联系人姓名');
    callback();
};

//邮箱校验
export const checkEmail = (rule, value, callback) => {
    infoCommon (value, callback, '联系人邮箱');
    const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
    if (value.length > 50) {
        callback(new Error(`邮箱不超过50个字，请重新输入`));
    } else if (!reg.test(value)) {
        callback(new Error('请输入正确的邮箱'));
    } else {
        callback();
    };
};

//游戏名称校验
export const checkGame = (rule, value, callback) => {
    if (value === '') {
        callback(new Error(`游戏名称信息必填`));
    } else if (value.length > 30) {
        callback(new Error(`游戏名称不超过30个字，请重新输入`));
    } else  {
        callback();
    };
};

/**
 * 后台校验
 */

//校验账号
export const checkBAccount = (rule, value, callback) => {
    const reg = /^[a-zA-Z]{3,20}$/;
    if (value === '') {
        callback(new Error('请输入正确的账号'));
    } else if (!reg.test(value)) {
        callback(new Error('用户名仅支持英文字符，长度为3-20位'));
    } else {
        callback();
    };
};

//校验密码
export const checkBPassword = (rule, value, callback) => {
    const reg = /^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{6,}$/;
    if (value === '') {
        callback(new Error('请输入正确的密码'));
    } else if (!reg.test(value)) {
        callback(new Error('密码至少6个字符，需要包含英文与数字'));
    } else {
        callback();
    };
};

//校验用户密码
export const checkBUserPassword = (rule, value, callback) => {
    const reg = /^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{6,20}$/;
    if (value === '') {
        callback(new Error('请输入正确的密码'));
    } else if (!reg.test(value)) {
        callback(new Error('密码6-20个字符，需要包含英文与数字'));
    } else {
        callback();
    };
};

//用户权限校验
export const userPower = (rule, value, callback) => {
    if (value.length === 0) {
        callback(new Error('请选择用户权限'));
    } else {
        callback();
    };
};

//角色名称校验
export const powerName = (rule, value, callback) => {
    if (value.length > 15 || value.length < 1) {
        callback(new Error('请输入正确的角色名称'));
    } else {
        callback();
    };
};

//试玩倒计时校验
export const playTime = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请填写试玩倒计时'));
    } else if (parseInt(value) < 60) {
        callback(new Error('试玩倒计时不得少于60s'));
    } else {
        callback();
    };
};
