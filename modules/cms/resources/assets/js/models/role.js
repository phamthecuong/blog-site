import axios from 'axios'
import {API_URL} from '../constant'
import {authHeader} from '../utils/auth'

export function getRoles(params = {}) {
    return axios.get(API_URL + '/cms/admin-group/role', {
        headers: authHeader(),
        params: params
    });
}
