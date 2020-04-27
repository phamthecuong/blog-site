import axios from 'axios'
import {API_URL, PAGE_LIMIT} from '../constant'
import {authHeader} from '../utils/auth'

export function getGroups(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;
    params.name = params.name || '';
    params.status = params.status || '';

    return axios.get(API_URL + '/cms/admin-group', {
        headers: authHeader(),
        params: params
    });
}

export function getGroup(id) {
    return axios.get(API_URL + '/cms/admin-group/' + id, {
        headers: authHeader()
    });
}

export function deleteGroup(id) {
    return axios.delete(API_URL + '/cms/admin-group/' + id, {
        headers: authHeader()
    });
}

export function updateGroup(id, data) {
    return axios({
        url: API_URL + '/cms/admin-group/' + id,
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function storeGroup(data) {
    return axios({
        url: API_URL + '/cms/admin-group',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}