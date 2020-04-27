import axios from 'axios'
import {API_URL, PAGE_LIMIT} from '../constant'
import {authHeader} from '../utils/auth'

export function getUsers(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;
    params.name = params.name || '';
    params.email = params.email || '';
    params.fullname = params.fullname || '';
    params.phone = params.phone || '';
    params.status = params.status || '';

    return axios.get(API_URL + '/cms/user', {
        headers: authHeader(),
        params: params
    });
}

export function getUser(id) {
    return axios.get(API_URL + '/cms/user/' + id, {
        headers: authHeader()
    });
}

export function deleteUser(id) {
    return axios.delete(API_URL + '/cms/user/' + id, {
        headers: authHeader()
    });
}

export function updateUser(id, data) {
    return axios({
        url: API_URL + '/cms/user/' + id,
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function storeUser(data) {
    return axios({
        url: API_URL + '/cms/user',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}
