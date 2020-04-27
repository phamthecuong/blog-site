import VueRouter from 'vue-router'
import {Welcome, NotFound, Forbidden, Login} from './components'
import {PageList, PageEdit, PageCreate} from './components/ipage'
import {PostList, PostEdit, PostCreate} from './components/post'
import {PostCategoryList, PostCategoryEdit, PostCategoryCreate} from './components/post_category'
import {BannerList, BannerEdit, BannerCreate} from './components/banner'
import {FAQList, FAQEdit, FAQCreate} from './components/faq'
import {UserList, UserEdit} from './components/user'
import {AdminList, AdminEdit, AdminCreate} from './components/admin'
import {GroupList, GroupEdit, GroupCreate} from './components/group'
import {FundList, FundEdit, FundCreate} from './components/fund'
import {TargetList, TargetEdit, TargetCreate} from './components/target'
import {TransactionList, TransactionEdit} from './components/transaction'
import {TransactionDepositList, TransactionWithdrawList} from './components/report'
import {ConfigEdit} from './components/config'
import {Profile, ProfilePassword} from './components/profile'
import {ContactList, ContactEdit} from './components/contact'
import {ReportErrorList, ReportErrorEdit} from './components/report_error'
import {ActivityLogList} from './components/activity_log'
import {store} from './store'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', name: 'home', component: Welcome, props: {title: "DASHBOARD"}, meta: {requiresAuth: true}},

        {path: '/404', name: 'not_found', component: NotFound},
        {path: '/403', name: 'forbidden', component: Forbidden},

        {path: '/login', name: 'login', component: Login},

        {path: '/page', name: 'page_list', component: PageList, meta: {requiresAuth: true}},
        {path: '/page/create', name: 'page_create', component: PageCreate, meta: {requiresAuth: true}},
        {path: '/page/:id', name: 'page_edit', component: PageEdit, meta: {requiresAuth: true}},

        {path: '/post', name: 'get_posts', component: PostList, meta: {requiresAuth: true}},
        {path: '/post/create', name: 'create_post', component: PostCreate, meta: {requiresAuth: true}},
        {path: '/post/:id', name: 'update_post', component: PostEdit, meta: {requiresAuth: true}},

        {path: '/post-category', name: 'get_post_categories', component: PostCategoryList, meta: {requiresAuth: true}},
        {path: '/post-category/create', name: 'create_post_category', component: PostCategoryCreate, meta: {requiresAuth: true}},
        {path: '/post-category/:id', name: 'update_post_category', component: PostCategoryEdit, meta: {requiresAuth: true}},

        {path: '/banner', name: 'banner_list', component: BannerList, meta: {requiresAuth: true}},
        {path: '/banner/create', name: 'banner_create', component: BannerCreate, meta: {requiresAuth: true}},
        {path: '/banner/:id', name: 'banner_edit', component: BannerEdit, meta: {requiresAuth: true}},

        {path: '/faq', name: 'faq_list', component: FAQList, meta: {requiresAuth: true}},
        {path: '/faq/create', name: 'faq_create', component: FAQCreate, meta: {requiresAuth: true}},
        {path: '/faq/:id', name: 'faq_edit', component: FAQEdit, meta: {requiresAuth: true}},

        {path: '/user', name: 'get_users', component: UserList, meta: {requiresAuth: true}},
        {path: '/user/:id', name: 'update_user', component: UserEdit, meta: {requiresAuth: true}},

        {path: '/admin', name: 'get_admins', component: AdminList, meta: {requiresAuth: true}},
        {path: '/admin/create', name: 'create_admin', component: AdminCreate, meta: {requiresAuth: true}},
        {path: '/admin/:id', name: 'update_admin', component: AdminEdit, meta: {requiresAuth: true}},

        {path: '/admin-group', name: 'get_admin_groups', component: GroupList, meta: {requiresAuth: true}},
        {path: '/admin-group/create', name: 'group_create', component: GroupCreate, meta: {requiresAuth: true}},
        {path: '/admin-group/:id', name: 'update_admin_group', component: GroupEdit, meta: {requiresAuth: true}},

        {path: '/fund', name: 'get_funds', component: FundList, meta: {requiresAuth: true}},
        {path: '/fund/create', name: 'create_fund', component: FundCreate, meta: {requiresAuth: true}},
        {path: '/fund/:id', name: 'update_fund', component: FundEdit, meta: {requiresAuth: true}},

        {path: '/target', name: 'get_targets', component: TargetList, meta: {requiresAuth: true}},
        {path: '/target/create', name: 'create_target', component: TargetCreate, meta: {requiresAuth: true}},
        {path: '/target/:id', name: 'update_target', component: TargetEdit, meta: {requiresAuth: true}},

        {path: '/transaction', name: 'get_transactions', component: TransactionList, meta: {requiresAuth: true}},
        {path: '/transaction/:id', name: 'update_transaction', component: TransactionEdit, meta: {requiresAuth: true}},

        {path: '/report-deposit', name: 'report_deposit', component: TransactionDepositList, meta: {requiresAuth: true}},
        {path: '/report-withdraw', name: 'report_withdraw', component: TransactionWithdrawList, meta: {requiresAuth: true}},

        {path: '/config', name: 'get_configs', component: ConfigEdit, meta: {requiresAuth: true}},

        {path: '/profile', name: 'profile', component: Profile},
        {path: '/profile/password', name: 'profile_password', component: ProfilePassword},

        {path: '/contact', name: 'contact_list', component: ContactList, meta: {requiresAuth: true}},
        {path: '/contact/:id', name: 'contact_edit', component: ContactEdit, meta: {requiresAuth: true}},

        {path: '/report-error', name: 'get_report_errors', component: ReportErrorList, meta: {requiresAuth: true}},
        {
            path: '/report-error/:id',
            name: 'update_report_error',
            component: ReportErrorEdit,
            meta: {requiresAuth: true}
        },

        {path: '/log/activity', name: 'activity_log_list', component: ActivityLogList, meta: {requiresAuth: true}},

        {path: '*', component: NotFound}
    ],
});

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            //store.dispatch("SET_USER_INFO");

            next();

            return
        }
        next('/login')
    } else {
        next()
    }

    if (to.name) {
        // Start the route progress bar.
    }

    next()
});

router.afterEach((to, from) => {
    const public_pages = ['register', 'password_reset', 'password_change'];

    if (public_pages.indexOf(to.name) > -1) {
        if (typeof grecaptcha.reset == 'function') {
            grecaptcha.reset();
        }
    }
});

export default router;
