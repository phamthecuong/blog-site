import axios from 'axios'
import {API_URL} from '../constant'
import {authHeader} from '../utils/auth'

export function authLogin(params) {
    return axios.post(API_URL + '/cms/login', {
        username: params.username,
        password: params.password,
        remember_me: params.remember_me
    })
}

export function authLogout() {
    return axios.post(API_URL + '/cms/logout', {}, {
        headers: authHeader()
    })
}