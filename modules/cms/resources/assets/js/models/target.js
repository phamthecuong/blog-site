import axios from 'axios'
import {API_URL, PAGE_LIMIT} from '../constant'
import {authHeader} from '../utils/auth'

export function getTargets(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;
    params.name = params.name || '';
    params.is_active = params.is_active || '';

    return axios.get(API_URL + '/cms/target', {
        headers: authHeader(),
        params: params
    });
}

export function getTarget(id) {
    return axios.get(API_URL + '/cms/target/' + id, {
        headers: authHeader()
    });
}

export function deleteTarget(id) {
    return axios.delete(API_URL + '/cms/target/' + id, {
        headers: authHeader()
    });
}

export function updateTarget(id, data) {
    return axios({
        url: API_URL + '/cms/target/' + id,
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function storeTarget(data) {
    return axios({
        url: API_URL + '/cms/target',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function updateTargetFund(targetId, fundId, data) {
    return axios({
        url: API_URL + '/cms/target/' + targetId + '/fund/' + fundId,
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function storeTargetFund(targetId, data) {
    return axios({
        url: API_URL + '/cms/target/' + targetId + '/fund/',
        method: 'post',
        data: data,
        headers: authHeader()
    })
}

export function deleteTargetFund(targetId, fundId) {
    return axios.delete(API_URL + '/cms/target/' + targetId + '/fund/' + fundId, {
        headers: authHeader()
    });
}
