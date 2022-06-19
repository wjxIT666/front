import Vue from 'vue';

export const state = Vue.observable({
    token: '00000'
});

export const mutations = function (value) {
    state.token = value;
};

