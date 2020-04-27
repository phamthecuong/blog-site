import axios from 'axios'
import {API_URL, PAGE_LIMIT} from '../constant'
import {authHeader} from '../utils/auth'

export function getBanks(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;
    params.name = params.name || '';
    params.status = params.status || '';

    return axios.get(API_URL + '/cms/bank', {
        headers: authHeader(),
        params: params
    });
}

export function getServiceBanks(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;
    params.name = params.name || '';
    params.status = params.status || '';

    return axios.get(API_URL + '/cms/bank/service', {
        headers: authHeader(),
        params: params
    });
}

export function getBank(id) {
    return axios.get(API_URL + '/cms/bank/' + id, {
        headers: authHeader()
    });
}

export function deleteBank(id) {
    return axios.delete(API_URL + '/cms/bank/' + id, {
        headers: authHeader()
    });
}

export function updateBank(id, data) {
    return axios({
        url: API_URL + '/cms/bank/' + id,
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function storeBank(data) {
    return axios({
        url: API_URL + '/cms/bank',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}
