import axios from 'axios'
import {API_URL, PAGE_LIMIT} from '../constant'
import {authHeader} from '../utils/auth'

export function getConfigs(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;

    return axios.get(API_URL + '/config', {
        headers: authHeader(),
        params: params
    });
}

export function getConfig(id) {
    return axios.get(API_URL + '/config/' + id, {
        headers: authHeader()
    });
}

export function updateConfig(id, data) {
    return axios({
        url: API_URL + '/config/' + id,
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function getConfigAll(params = {}) {
    return axios.get(API_URL + '/cms/config/group', {
        headers: authHeader(),
        params: params
    });
}

export function updateConfigAll(data) {
    return axios({
        url: API_URL + '/cms/config/group',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}