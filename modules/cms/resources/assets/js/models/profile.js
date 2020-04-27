import axios from 'axios'
import {API_URL} from '../constant'
import {authHeader} from '../utils/auth'

export function updateProfile(data) {
    return axios({
        url: API_URL + '/cms/profile',
        method: 'post',
        data: data,
        headers: authHeader()
    });
}

export function updatePassword(data) {
    return axios({
        url: API_URL + '/cms/password/update',
        method: 'post',
        data: data,
        headers: authHeader()
    });
}

export function getProfile() {
    return axios.get(API_URL + '/cms/profile', {
        headers: authHeader()
    });
}