import axios from 'axios'
import {API_URL} from '../constant'
import {authHeader} from '../utils/auth'

function getMenus() {
    return axios.get(API_URL + '/cms/menu', {
        headers: authHeader()
    });
}

export {
    getMenus
}