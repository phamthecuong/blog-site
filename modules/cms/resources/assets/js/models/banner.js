import axios from 'axios'
import {API_URL, PAGE_LIMIT} from '../constant'
import {authHeader} from '../utils/auth'

export function getBanners(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;
    params.name = params.name || '';
    params.status = params.status || '';

    return axios.get(API_URL + '/banner', {
        headers: authHeader(),
        params: params
    });
}

export function getBanner(id) {
    return axios.get(API_URL + '/banner/' + id, {
        headers: authHeader()
    });
}

export function deleteBanner(id) {
    return axios.delete(API_URL + '/banner/' + id, {
        headers: authHeader()
    });
}

export function updateBanner(id, data) {
    return axios({
        url: API_URL + '/banner/' + id,
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function storeBanner(data) {
    return axios({
        url: API_URL + '/banner',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}