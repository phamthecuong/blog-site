import axios from 'axios'
import {API_URL, PAGE_LIMIT} from '../constant'
import {authHeader} from '../utils/auth'

export function getFAQs(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;

    return axios.get(API_URL + '/faq', {
        headers: authHeader(),
        params: params
    });
}

export function getFAQ(id) {
    return axios.get(API_URL + '/faq/' + id, {
        headers: authHeader()
    });
}

export function deleteFAQ(id) {
    return axios.delete(API_URL + '/faq/' + id, {
        headers: authHeader()
    });
}

export function updateFAQ(id, data) {
    return axios({
        url: API_URL + '/faq/' + id,
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function storeFAQ(data) {
    return axios({
        url: API_URL + '/faq',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}