import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App'
import paginate from 'vuejs-paginate'
import router from './router'
import {store} from './store'
import mixinTitle from './utils/mixins/mixinTitle'
import Axios from 'axios'
import i18n from './i18n'

Vue.use(VueRouter);

Vue.mixin(mixinTitle);

Vue.prototype.$http = Axios;

const token = localStorage.getItem('access_token');
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

Vue.component('paginate', paginate);

const app = new Vue({
    el: '#app',
    i18n,
    router,
    store,
    components: {App},
    template: '<App/>'
});

export default app
