import axios from 'axios'
import {API_URL, PAGE_LIMIT} from '../constant'
import {authHeader} from '../utils/auth'

export function getOrders(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;
    params.code = params.code || '';
    params.user_name = params.user_name || '';
    params.status = params.status || '';

    return axios.get(API_URL + '/order', {
        headers: authHeader(),
        params: params
    });
}

export function getOrder(id) {
    return axios.get(API_URL + '/order/' + id, {
        headers: authHeader()
    });
}

export function deleteOrder(id) {
    return axios.delete(API_URL + '/order/' + id, {
        headers: authHeader()
    });
}

export function updateOrder(id, data) {
    return axios({
        url: API_URL + '/order/' + id,
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function storeOrder(data) {
    return axios({
        url: API_URL + '/order',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function deleteOrderItem(id) {
    return axios.delete(API_URL + '/order-item/' + id, {
        headers: authHeader()
    });
}

export function updateOrderItem(id, data) {
    return axios({
        url: API_URL + '/order-item/' + id,
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function comment(data) {
    return axios({
        url: API_URL + '/order/comment',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function paymentOrder(id) {
    return axios({
        url: API_URL + '/order/' + id + '/payment',
        method: 'post',
        headers: authHeader()
    })
}

export function depositOrder(id) {
    return axios({
        url: API_URL + '/order/' + id + '/deposit',
        method: 'post',
        headers: authHeader()
    })
}