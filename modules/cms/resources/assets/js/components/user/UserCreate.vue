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
                        <li>
                            <router-link :to="{ name: 'user_list' }">
                                Quản lý người dùng
                            </router-link>
                        </li>
                        <li class="active">Thêm người dùng</li>
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
                                        <label class="form-label">Tài khoản (*)</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div v-bind:class="[errors.name?'form-line focused error':'form-line']">
                                                <input type="text" class="form-control" name="name"
                                                       v-model="user.name" @input="addEvent"
                                                       placeholder="Tài khoản"/>
                                            </div>
                                            <div class="help-info">Tối thiểu 3, tối đa 255 ký tự</div>
                                            <label class="error" v-if="errors.name">{{ errors.name }}</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Email (*)</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div v-bind:class="[errors.email?'form-line focused error':'form-line']">
                                                <input type="email" class="form-control" name="email"
                                                       v-model="user.email" @input="addEvent"
                                                       placeholder="Email"/>
                                            </div>
                                            <div class="help-info">Tối thiểu 3, tối đa 255 ký tự</div>
                                            <label class="error" v-if="errors.email">{{ errors.email }}</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Mật khẩu (*)</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div v-bind:class="[errors.password?'form-line focused error':'form-line']">
                                                <input type="password" class="form-control" name="password"
                                                       v-model="user.password" @input="addEvent"
                                                       placeholder="Mật khẩu"/>
                                            </div>
                                            <label class="error" v-if="errors.password">{{ errors.password }}</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Xác nhận mật khẩu (*)</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div v-bind:class="[errors.re_password?'form-line focused error':'form-line']">
                                                <input type="password" class="form-control" name="re_password"
                                                       v-model="user.re_password" @input="addEvent"
                                                       placeholder="Xác nhận mật khẩu"/>
                                            </div>
                                            <label class="error" v-if="errors.re_password">
                                                {{ errors.re_password }}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Họ tên</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="fullname"
                                                       @input="addEvent"
                                                       v-model="user.fullname"
                                                       placeholder="Họ tên"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Điện thoại</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="phone"
                                                       @input="addEvent"
                                                       v-model="user.phone"
                                                       placeholder="Điện thoại"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Địa chỉ</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="address"
                                                       @input="addEvent"
                                                       v-model="user.address"
                                                       placeholder="Địa chỉ"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Nhóm</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <select name="group_id" class="form-control" @change="addEvent"
                                                        v-model="user.group_id">
                                                    <option value="0">Chọn nhóm</option>
                                                    <option v-for="group in groups" v-bind:value="group.id">
                                                        {{group.name}}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">

                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <input type="checkbox" id="status" class="filled-in" name="status"
                                                   @change="addEvent"
                                                   v-model="user.status"/>
                                            <label for="status">Trạng thái</label>
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
    import axios from 'axios'
    import {storeUser} from '../../models/user'
    import {getGroups} from '../../models/group'

    export default {
        name: "UserCreate",
        title: 'Thêm người dùng',

        data() {
            return {
                errors: {
                    name: '',
                    email: '',
                    password: '',
                    re_password: '',
                },
                user: {
                    name: '',
                    email: '',
                    password: '',
                    fullname: '',
                    phone: '',
                    address: '',
                    status: false,
                    group_id: 0
                },
                groups: []
            };
        },

        created() {
            this.fetch();
        },

        methods: {
            fetch() {
                axios.all([
                    getGroups()
                ]).then(axios.spread((first_response) => {
                    this.groups = first_response.data.data;

                    setTimeout(() => {
                        $('select[name=group_id]').selectpicker("refresh");
                    }, 1000);
                }));
            },

            addEvent({target}) {
                console.log(target.name);
            },

            onSubmit(e) {
                if (!this.isValid()) {
                    window.scrollTo(0, 0);

                    return false;
                }

                const formData = new FormData();

                formData.append('name', this.user.name);
                formData.append('email', this.user.email);
                formData.append('password', this.user.password);
                formData.append('fullname', this.user.fullname);
                formData.append('phone', this.user.phone);
                formData.append('address', this.user.address);
                formData.append('status', this.user.status ? 1 : 0);
                formData.append('group_id', this.user.group_id);

                storeUser(formData).then(({data}) => {
                    if (data.error_code != 0) {
                        swal({
                            title: 'Thông báo',
                            text: data.message,
                            type: "error",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Ok",
                            closeOnConfirm: false
                        });
                    } else {
                        this.$router.push('/user');
                    }
                }).catch(({response}) => this.errors = response.data.errors);

                e.preventDefault();
            },

            isValid() {
                let is_valid = true;

                if (!this.user.name) {
                    this.errors.name = "Vui lòng nhập tài khoản.";

                    is_valid = false;
                }

                if (!this.user.email) {
                    this.errors.email = "Vui lòng nhập email.";

                    is_valid = false;
                }

                if (!this.user.password) {
                    this.errors.password = "Vui lòng nhập mật khẩu.";

                    is_valid = false;
                }

                if (!this.user.re_password) {
                    this.errors.re_password = "Vui lòng xác thực mật khẩu.";

                    is_valid = false;
                }

                if (this.user.password != this.user.re_password) {
                    this.errors.re_password = "Mật khẩu không khớp.";

                    is_valid = false;
                }


                return is_valid;
            }
        }
    }
</script>

<style scoped>

</style>