<template>
    <section>
        <aside id="leftsidebar" class="sidebar">
            <div class="menu">
                <ul class="list">
                    <li class="header">
                        <div class="info-container">
                            <div class="email uppercase">{{user_info.email}}</div>
                        </div>
                    </li>
                    <li>
                        <router-link :to="{ name: 'home' }">
                            <i class="material-icons">home</i>
                            <span>Trang chủ</span>
                        </router-link>
                    </li>

                    <li v-for="menu in menus">
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons">{{menu.icon}}</i>
                            <span>{{menu.label}}</span>
                        </a>

                        <ul class="ml-menu">
                            <li v-for="sub_menu in menu.data">
                                <router-link :to="{ name: sub_menu.code }" class="">
                                    {{sub_menu.label}}
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!-- #Menu -->
            <!-- Footer -->
            <div class="legal">
                <div class="copyright">
                    Copyright &copy; 2020.
                </div>
            </div>
            <!-- #Footer -->
        </aside>

        <aside id="rightsidebar" class="right-sidebar">
            <ul class="nav nav-tabs tab-nav-right" role="tablist">
                <li role="presentation" class="active">
                    <a href="#sidebar_account" data-toggle="tab">{{$t("common.account")}}</a>
                </li>
                <!--<li role="presentation">
                    <a href="#sidebar_setting" data-toggle="tab">{{$t("common.setting")}}</a>
                </li>-->
            </ul>
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane fade in active" id="sidebar_account">
                    <ul class="setting-list">
                        <li>
                            <router-link :to="{ name: 'profile' }">
                                <i class="material-icons">person</i>{{$t("common.account_info")}}
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'profile_password' }">
                                <i class="material-icons">lock</i>{{$t("common.change_password")}}
                            </router-link>
                        </li>
                        <li>
                            <a href="#" class=" waves-effect waves-block" v-on:click="onLogout">
                                <i class="material-icons">input</i>{{$t("common.sign_out")}}
                            </a>
                        </li>
                    </ul>
                </div>
                <div role="tabpanel" class="tab-pane fade" id="sidebar_setting">
                    <p>{{$t("common.language")}}</p>

                    <ul class="setting-list">
                        <li>
                            <div>
                                <input name="language" type="radio" id="language_vi" value="vi" checked
                                       v-on:change="setLocate"/>
                                <label for="language_vi">Tiếng Việt</label>
                            </div>
                        </li>
                        <li>
                            <div>
                                <input name="language" type="radio" id="language_en" value="en"
                                       v-on:change="setLocate"/>
                                <label for="language_en">English</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    </section>
</template>

<script>
    import axios from 'axios'
    import {mapGetters} from 'vuex'
    import {getMenus} from '../models/menu'

    export default {
        name: "SideBar",

        data() {
            return {
                // user: this.$store.getters.user_info,
                menus: [],
                user: {name: 'Guest'}
            };
        },

        computed: {
            ...mapGetters([
                'user_info'
            ], () => {
                if (this.user_info) {
                    return this.user_info
                }

                return this.user
            })
        },

        created() {
            this.fetch();
        },

        methods: {
            fetch() {
                if (window.location.pathname != '/login') {
                    axios.all([
                        getMenus()
                    ]).then(axios.spread(({data}) => {
                        const response = data;

                        this.menus = response.data.menus;

                        setTimeout(() => {
                            $.AdminBSB.leftSideBar.activate();
                        }, 1000);
                    }));
                }
            },

            onLogout(e) {
                this.$store.dispatch('logout').then(() => {
                    this.$router.push('/login');
                });

                e.preventDefault();
            },

            setLocate(e) {
                this.$store.dispatch('setLang', e.target.getAttribute('value'));

                e.preventDefault();
            }
        }
    }
</script>

<style scoped>

</style>
