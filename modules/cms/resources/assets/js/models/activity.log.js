import axios from 'axios'
import {API_URL, PAGE_LIMIT} from '../constant'
import {authHeader} from '../utils/auth'

export function getActivityLogs(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;
    params.user_name = params.user_name || '';
    params.object_id = params.object_id || '';
    params.object_type = params.object_type || '';

    return axios.get(API_URL + '/activity-log', {
        headers: authHeader(),
        params: params
    });
}

export function getActivityLog(id) {
    return axios.get(API_URL + '/activity-log/' + id, {
        headers: authHeader()
    });
}

export function deleteActivityLog(id) {
    return axios.delete(API_URL + '/activity-log/' + id, {
        headers: authHeader()
    });
}

export function updateActivityLog(id, data) {
    return axios({
        url: API_URL + '/activity-log/' + id,
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function storeActivityLog(data) {
    return axios({
        url: API_URL + '/activity-log',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}