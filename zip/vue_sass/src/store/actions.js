import customerInterface from '../request/api.js';
export default {
    // 请求用户接口
    async sendCustomer (context) {
        let customerInterfaceRes = await customerInterface.customerInterface();
        if (customerInterfaceRes.code === 0) {
            context.commit('setCustomer', customerInterfaceRes.data);
        } else {
            context.commit('addCustomer');
        }
    }
};
