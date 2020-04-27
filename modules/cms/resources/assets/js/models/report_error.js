import axios from 'axios'
import {API_URL, PAGE_LIMIT} from '../constant'
import {authHeader} from '../utils/auth'

export function getReportErrors(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;
    params.name = params.name || '';

    return axios.get(API_URL + '/cms/report-error', {
        headers: authHeader(),
        params: params
    });
}

export function getReportError(id) {
    return axios.get(API_URL + '/cms/report-error/' + id, {
        headers: authHeader()
    });
}
