export default {
    //改变state中的userState，customerFlag的状态
    setCustomer (state, data) {
        state.userState = data.account;
        state.customerFlag = 1;
        state.corpId = data.corpId;
        state.corpStatus = data.corpStatus;
    },
    //token失效后，改变state中的userState的状态
    addCustomer (state) {
        state.userState = '未登录';
    },
    //修改customerFlag状态
    removecustomerFlag (state, data) {
        state.customerFlag = data;
    }
};