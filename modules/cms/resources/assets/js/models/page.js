import axios from 'axios'
import {API_URL, PAGE_LIMIT} from '../constant'
import {authHeader} from '../utils/auth'

export function getPages(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;
    params.title = params.title || '';
    params.category_id = params.category_id || 0;
    params.status = params.status || '';

    return axios.get(API_URL + '/page', {
        headers: authHeader(),
        params: params
    });
}

export function getPage(id) {
    return axios.get(API_URL + '/page/' + id, {
        headers: authHeader()
    });
}

export function deletePage(id) {
    return axios.delete(API_URL + '/page/' + id, {
        headers: authHeader()
    });
}

export function updatePage(id, data) {
    return axios({
        url: API_URL + '/page/' + id,
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function storePage(data) {
    return axios({
        url: API_URL + '/page',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}