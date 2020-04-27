<template>
    <section class="content">
        <div class="container-fluid">
            <div class="block-header">
                <div class="row">
                    <ol class="breadcrumb m-b-0 p-b-0">
                        <li>
                            <router-link :to="{ name: 'home' }">
                                <i class="material-icons">home</i>
                                <span>Trang chủ</span>
                            </router-link>
                        </li>
                        <li class="active">Đổi mật khẩu</li>
                    </ol>
                </div>
            </div>

            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="body table-responsive">
                            <form class="form-horizontal" id="create_form" method="POST" encType="multipart/form-data"
                                  @submit.prevent="onSubmit">
                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Tài khoản</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="name"
                                                       v-model="user_info.name" disabled/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Mật khẩu cũ</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="password" class="form-control" name="password"
                                                       v-model="password"/>
                                            </div>
                                            <label class="error" v-if="errors.password">{{ errors.password }}</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Mật khẩu mới</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="password" class="form-control" name="new_password"
                                                       v-model="new_password"/>
                                            </div>
                                            <label class="error" v-if="errors.new_password">{{ errors.new_password
                                                }}</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Xác nhận khẩu cũ</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="password" class="form-control" name="confirm_password"
                                                       v-model="confirm_password"/>
                                            </div>
                                            <label class="error" v-if="errors.confirm_password">{{
                                                errors.confirm_password }}</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">

                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7 text-right">
                                        <div class="form-group">
                                            <button class="btn btn-lg btn-primary waves-effect" type="submit">
                                                Đổi mật khẩu
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
    import {updatePassword} from '../../models/profile'
    import {showDialog} from '../../utils/dialog'
    import {mapGetters} from 'vuex'

    export default {
        name: "ProfilePassword",
        title: 'Thông tin cá nhân',

        data() {
            return {
                errors: {
                    password: '',
                    new_password: '',
                    confirm_password: ''
                },
                user: {},
                password: '',
                new_password: '',
                confirm_password: ''
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

            },

            onSubmit(e) {
                if (!this.isValid()) {
                    window.scrollTo(0, 0);

                    return false;
                }

                const formData = new FormData();

                formData.append('password', this.password);
                formData.append('new_password', this.new_password);

                updatePassword(formData)
                    .then(({data}) => {
                        const response = data;

                        if (response.success == false) {
                            showDialog('error', 'Thông báo', data.error.message);

                            return false;
                        }

                        showDialog('info', 'Thông báo', 'Đổi mật khẩu thành công.');
                    })
                    .catch(({response}) => this.errors = response.data.errors);

                e.preventDefault();
            },

            isValid() {
                let is_valid = true;

                if (!this.password) {
                    this.errors.password = "Vui lòng nhập mật khẩu cũ.";

                    is_valid = false;
                }

                if (!this.new_password) {
                    this.errors.new_password = "Vui lòng nhập mật khẩu mới.";

                    is_valid = false;
                }

                if (!this.confirm_password) {
                    this.errors.confirm_password = "Vui lòng xác nhận mật khẩu.";

                    is_valid = false;
                }

                if (this.new_password != this.confirm_password) {
                    this.errors.confirm_password = "Mật khẩu xác nhận không chính xác."

                    is_valid = false;
                }

                return is_valid;
            }
        }
    }
</script>

<style scoped>

</style>