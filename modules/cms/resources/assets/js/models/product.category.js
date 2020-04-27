import axios from 'axios'
import {API_URL, PAGE_LIMIT} from '../constant'
import {authHeader} from '../utils/auth'

export function getProductCategories(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;
    params.name = params.name || '';
    params.status = params.status || '';

    return axios.get(API_URL + '/product-category', {
        headers: authHeader(),
        params: params
    });
}

export function getProductCategory(id) {
    return axios.get(API_URL + '/product-category/' + id, {
        headers: authHeader()
    });
}

export function deleteProductCategory(id) {
    return axios.delete(API_URL + '/product-category/' + id, {
        headers: authHeader()
    });
}

export function updateProductCategory(id, data) {
    return axios({
        url: API_URL + '/product-category/' + id,
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function storeProductCategory(data) {
    return axios({
        url: API_URL + '/product-category',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}