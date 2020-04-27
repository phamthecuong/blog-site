import axios from 'axios'
import {API_URL, PAGE_LIMIT} from '../constant'
import {authHeader} from '../utils/auth'

export function getContacts(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;
    params.name = params.name || '';
    params.status = params.status || '';

    return axios.get(API_URL + '/contact', {
        headers: authHeader(),
        params: params
    });
}

export function getContact(id) {
    return axios.get(API_URL + '/contact/' + id, {
        headers: authHeader()
    });
}

export function deleteContact(id) {
    return axios.delete(API_URL + '/contact/' + id, {
        headers: authHeader()
    });
}

export function updateContact(id, data) {
    return axios({
        url: API_URL + '/contact/' + id,
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function storeContact(data) {
    return axios({
        url: API_URL + '/contact',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}