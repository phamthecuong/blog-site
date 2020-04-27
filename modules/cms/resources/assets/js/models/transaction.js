import axios from 'axios'
import {API_URL, PAGE_LIMIT} from '../constant'
import {authHeader} from '../utils/auth'

export function getTransactions(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;
    params.name = params.name || '';
    params.email = params.email || '';
    params.fullname = params.fullname || '';
    params.phone = params.phone || '';
    params.status = params.status || '';

    return axios.get(API_URL + '/cms/transaction', {
        headers: authHeader(),
        params: params
    });
}

export function getTransaction(id) {
    return axios.get(API_URL + '/cms/transaction/' + id, {
        headers: authHeader()
    });
}

export function updateTransaction(id, data) {
    return axios({
        url: API_URL + '/cms/transaction/' + id,
        method: 'post',
        data: data,
        headers: authHeader()
    })
}
