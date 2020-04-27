import axios from 'axios'
import {API_URL, PAGE_LIMIT} from '../constant'
import {authHeader} from '../utils/auth'

export function getTransactionDepositReports(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;
    params.type = 'DEPOSIT';

    return axios.get(API_URL + '/cms/report/transaction', {
        headers: authHeader(),
        params: params
    });
}

export function getTransactionWithdrawReports(params = {}) {
    params.page = params.page || 1;
    params.limit = params.limit || PAGE_LIMIT;
    params.type = 'WITHDRAW';

    return axios.get(API_URL + '/cms/report/transaction', {
        headers: authHeader(),
        params: params
    });
}
