import axios from 'axios'
import {API_URL, PAGE_LIMIT} from '../constant'
import {authHeader} from '../utils/auth'

export function getPostCategories(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;
    params.name = params.name || '';
    params.status = params.status || '';

    return axios.get(API_URL + '/cms/post-category', {
        headers: authHeader(),
        params: params
    });
}

export function getPostCategory(id) {
    return axios.get(API_URL + '/cms/post-category/' + id, {
        headers: authHeader()
    });
}

export function deletePostCategory(id) {
    return axios.delete(API_URL + '/cms/post-category/' + id, {
        headers: authHeader()
    });
}

export function updatePostCategory(id, data) {
    return axios({
        url: API_URL + '/cms/post-category/' + id,
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function storePostCategory(data) {
    return axios({
        url: API_URL + '/cms/post-category',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}
