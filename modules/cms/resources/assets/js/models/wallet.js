import axios from 'axios'
import {API_URL} from '../constant'
import {authHeader} from '../utils/auth'

export function deposit(id, data) {
    return axios({
        url: API_URL + '/cms/deposit/' + id + '/approve',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function depositCancel(id, data) {
    return axios({
        url: API_URL + '/cms/deposit/' + id + '/cancel',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function withdraw(id, data) {
    return axios({
        url: API_URL + '/cms/withdraw/' + id + '/approve',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function withdrawCancel(id, data) {
    return axios({
        url: API_URL + '/cms/withdraw/' + id + '/cancel',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}
