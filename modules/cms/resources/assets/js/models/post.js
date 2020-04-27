import axios from 'axios'
import {API_URL, PAGE_LIMIT} from '../constant'
import {authHeader} from '../utils/auth'

export function getPosts(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;
    params.title = params.title || '';
    params.category_id = params.category_id || 0;
    params.status = params.status || '';

    return axios.get(API_URL + '/cms/post', {
        headers: authHeader(),
        params: params
    });
}

export function getPost(id) {
    return axios.get(API_URL + '/cms/post/' + id, {
        headers: authHeader()
    });
}

export function deletePost(id) {
    return axios.delete(API_URL + '/cms/post/' + id, {
        headers: authHeader()
    });
}

export function updatePost(id, data) {
    return axios({
        url: API_URL + '/cms/post/' + id,
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function storePost(data) {
    return axios({
        url: API_URL + '/cms/post',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}
