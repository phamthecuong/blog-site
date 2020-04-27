import axios from 'axios'
import {API_URL, PAGE_LIMIT} from '../constant'
import {authHeader} from '../utils/auth'

export function getFunds(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;
    params.name = params.name || '';

    return axios.get(API_URL + '/cms/fund', {
        headers: authHeader(),
        params: params
    });
}

export function getFund(id) {
    return axios.get(API_URL + '/cms/fund/' + id, {
        headers: authHeader()
    });
}

export function deleteFund(id) {
    return axios.delete(API_URL + '/cms/fund/' + id, {
        headers: authHeader()
    });
}

export function updateFund(id, data) {
    return axios({
        url: API_URL + '/cms/fund/' + id,
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function storeFund(data) {
    return axios({
        url: API_URL + '/cms/fund',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}
