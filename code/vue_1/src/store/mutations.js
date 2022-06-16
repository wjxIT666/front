import { ADD_COUNT } from './mutations_const.js';

export default {
    [ADD_COUNT] (state, value) {
        state.count += value;
    },
    setDZ (state, value) {
        state.duanzi = value;
    },
    setToken (state, token) {
        state.token = token;
        sessionStorage.setItem('token', state.token);
    }
};
