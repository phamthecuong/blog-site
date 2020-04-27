'use strict';

import Vue from 'vue'
import Vuex from 'vuex'
import {showDialog} from './utils/dialog'
import {authLogin, authLogout} from './models/auth'
import {getProfile} from './models/profile'
import axios from "axios"
import app from './app'

Vue.use(Vuex);

Vue.filter('toCurrency', function (value, currency) {
    // https://gist.github.com/ncreated/9934896
    switch (currency) {
        case '$':
        case 'USD':
            var formatter = new Intl.NumberFormat('us-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });
            break;
        case '¥':
        case 'NDT':
            var formatter = new Intl.NumberFormat('zh-CN', {
                style: 'currency',
                currency: 'CNY',
                minimumFractionDigits: 0
            });
            break;
        case 'đ':
        case 'VNĐ':
        case 'VND':
        default:
            var formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 0
            });
    }

    return formatter.format(parseFloat(value));
});

//axios.defaults.withCredentials = true;

axios.interceptors.response.use(function (response) {
    // Do something with response data
    // console.log(response);

    if (response.data.success == false && response.data.error.code == 1200 && window.location.pathname != '/login') {
        window.location.href = "/login"
    }

    return response;
}, function (error) {
    // Do something with response error
    console.log(error);

    return Promise.reject(error);
});

export const store = new Vuex.Store({
    state: {
        layout: 'app-layout',
        locale: 'en',
        access_token: localStorage.getItem('access_token') || '',
        user_info: {
            name: 'Guest',
            profile: {
                fullname: ''
            }
        },
        error: {
            code: 0,
            message: ''
        },
    },

    mutations: {
        SET_LAYOUT(state, payload) {
            state.layout = payload
        },

        SET_USER_INFO(state, payload) {
            state.user_info = payload;
        },

        SET_LANG(state, locale) {
            console.log('Set locate: ' + locale);

            app.$i18n.locale = locale
        },

        setError(state, error) {
            console.log('Set error: ' + error.code + '# ' + error.message);

            state.error = error;
        },

        auth_success(state, access_token, user_info) {
            state.access_token = access_token;
            state.user_info = user_info;
        },

        auth_error(state) {

        },

        logout(state) {
            state.user_info = {
                name: 'Guest'
            };
            state.access_token = '';
        }
    },

    actions: {
        SET_USER_INFO: async ({commit}) => {
            if (window.location.pathname != '/login') {
                await axios.all([
                    getProfile()
                ]).then(axios.spread(({data}) => {
                    const response = data;

                    if (response.success == false && response.error.code == 1200) {
                        localStorage.removeItem('access_token');

                        return;
                    }

                    commit("SET_USER_INFO", response.data.user);
                })).catch(error => {
                    commit('logout');
                });
            }
        },

        setLang({commit}, locale) {
            commit('SET_LANG', locale)
        },

        setError({commit}, error) {
            commit('setError', error);
        },

        login({commit}, user) {
            return new Promise((resolve, reject) => {
                authLogin(user).then((response) => {
                    if (response.data.success == false) {
                        showDialog('error', response.statusText, response.data.error.message);

                        return false;
                    }

                    const access_token = response.data.data.access_token.type + ' ' + response.data.data.access_token.token;
                    const user_info = response.data.data.user;

                    localStorage.setItem('access_token', access_token);

                    axios.defaults.headers.common['Authorization'] = access_token;

                    commit('auth_success', access_token, user_info);

                    resolve(response);

                    //window.location.href = '/';
                }).catch(({response}) => {
                    commit('auth_error');

                    localStorage.removeItem('access_token');

                    reject(response);

                    showDialog('error', response.statusText, response.data.message);
                });
            })
        },

        logout({commit}) {
            authLogout().then(({data}) => {
                commit('logout');

                // localStorage.removeItem('user');
                localStorage.removeItem('access_token');

                delete axios.defaults.headers.common['Authorization'];
            });
        }
    },

    getters: {
        isLoggedIn: state => !!state.access_token,

        layout(state) {
            return state.layout
        },

        isLoading(state) {
            return state.is_loading
        },

        error(state) {
            return state.error
        },

        user_info(state) {
            return state.user_info
        }
    }
});
