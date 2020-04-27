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
                        <li class="active">Thông tin cá nhân</li>
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
                                        <label class="form-label">Email</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="email"
                                                       v-model="user_info.email" disabled/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Số điện thoại</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="phone"
                                                       v-model="user_info.phone" disabled/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Tên hiển thị</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="fullname"
                                                       v-model="user_info.profile.fullname"/>
                                            </div>
                                            <label class="error" v-if="errors.fullname">{{ errors.fullname }}</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Địa chỉ</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="address"
                                                       v-model="user_info.profile.address"/>
                                            </div>
                                            <label class="error" v-if="errors.address">{{ errors.address }}</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">

                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7 text-right">
                                        <div class="form-group">
                                            <button class="btn btn-lg btn-primary waves-effect" type="submit">
                                                Cập nhật
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
    import {updateProfile} from '../../models/profile'
    import {showDialog} from '../../utils/dialog'
    import {mapGetters} from 'vuex'

    export default {
        name: "Profile",
        title: 'Thông tin cá nhân',

        data() {
            return {
                errors: {
                    address: '',
                    fullname: ''
                },
                user: {
                    profile: {
                        fullname: '',
                        address: '',
                    }
                }
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

                formData.append('fullname', this.user_info.profile.fullname);
                formData.append('address', this.user_info.profile.address);

                updateProfile(formData)
                    .then(({data}) => {
                        showDialog('info', 'Thông báo', 'Cập nhật thông tin tài khoản thành công.')
                    }).catch(({response}) => {
                    showDialog('error', 'Có lỗi xảy ra.', response.data.message)
                });

                e.preventDefault();
            },

            isValid() {
                let is_valid = true;

                if (!this.user_info.profile.fullname) {
                    this.errors.fullname = "Vui lòng nhập tên hiển thị.";

                    is_valid = false;
                }

                if (!this.user_info.profile.address) {
                    this.errors.address = "Vui lòng nhập địa chỉ.";

                    is_valid = false;
                }

                return is_valid;
            }
        }
    }
</script>

<style scoped>

</style>