import axios from 'axios'
import {API_URL, PAGE_LIMIT} from '../constant'
import {authHeader} from '../utils/auth'

export function getAdmins(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;
    params.name = params.name || '';
    params.email = params.email || '';
    params.fullname = params.fullname || '';
    params.phone = params.phone || '';
    params.status = params.status || '';

    return axios.get(API_URL + '/cms/admin', {
        headers: authHeader(),
        params: params
    });
}

export function getDashboard(params = {}) {
    return axios.get(API_URL + '/cms/dashboard', {
        headers: authHeader(),
        params: params
    });
}

export function getAdmin(id) {
    return axios.get(API_URL + '/cms/admin/' + id, {
        headers: authHeader()
    });
}

export function deleteAdmin(id) {
    return axios.delete(API_URL + '/cms/admin/' + id, {
        headers: authHeader()
    });
}

export function updateAdmin(id, data) {
    return axios({
        url: API_URL + '/cms/admin/' + id,
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function storeAdmin(data) {
    return axios({
        url: API_URL + '/cms/admin',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}
