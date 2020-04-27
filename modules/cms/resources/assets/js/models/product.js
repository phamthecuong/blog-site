import axios from 'axios'
import {API_URL, PAGE_LIMIT} from '../constant'
import {authHeader} from '../utils/auth'

export function getProducts(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;
    params.title = params.title || '';
    params.category_id = params.category_id || 0;
    params.status = params.status || '';

    return axios.get(API_URL + '/product', {
        headers: authHeader(),
        params: params
    });
}

export function getProduct(id) {
    return axios.get(API_URL + '/product/' + id, {
        headers: authHeader()
    });
}

export function deleteProduct(id) {
    return axios.delete(API_URL + '/product/' + id, {
        headers: authHeader()
    });
}

export function updateProduct(id, data) {
    return axios({
        url: API_URL + '/product/' + id,
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function storeProduct(data) {
    return axios({
        url: API_URL + '/product',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}