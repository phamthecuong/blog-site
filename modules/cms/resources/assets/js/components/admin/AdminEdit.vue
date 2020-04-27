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
                            <router-link :to="{ name: 'get_admins' }">
                                Quản lý Quản trị viên
                            </router-link>
                        </li>
                        <li class="active">{{user.name}}</li>
                    </ol>
                </div>
            </div>

            <div class="row clearfix">
                <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
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
                                                <input type="text" class="form-control" name="name" v-model="user.name"
                                                       placeholder="Tài khoản"/>
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
                                                <input type="text" class="form-control" name="email" disabled
                                                       v-model="user.email" placeholder="Email"/>
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
                                        <label class="form-label">Nhóm</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <select name="group_id" class="form-control" @change="addEvent"
                                                        v-model="user.group_id">
                                                    <option value="0">Chọn nhóm</option>
                                                    <option v-for="group in groups" v-bind:value="group.id"
                                                            :selected="group.id == user.group_id">
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
                                            <input type="checkbox" id="is_active" class="filled-in" name="is_active"
                                                   @change="addEvent"
                                                   v-model="user.is_active"/>
                                            <label for="is_active">Trạng thái</label>
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
                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                </div>
            </div>
        </div>
    </section>

</template>

<script>
    import axios from 'axios'
    import {getAdmin, updateAdmin} from '../../models/admin'
    import {getGroups} from '../../models/group'
    import {showDialog} from '../../utils/dialog'

    export default {
        name: "AdminEdit",
        title() {
            return `Sửa thông tin ${this.user.name}`
        },

        data() {
            return {
                errors: {},
                user: {
                    name: '',
                    email: '',
                    phone: '',
                    is_active: 0,
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
                const {id} = this.$route.params;

                axios.all([
                    getAdmin(id),
                    getGroups()
                ]).then(axios.spread((first_response, second_response) => {
                    this.user = first_response.data.data.admin;

                    this.groups = second_response.data.data.admin_groups;

                    setTimeout(() => {
                        $('select[name=group_id]').selectpicker("refresh");
                    }, 1000);
                })).catch(errors => {
                    if (errors.response.status == 404) {
                        this.$router.push('/404');
                    }
                });
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
                formData.append('phone', this.user.phone);
                formData.append('is_active', this.user.is_active ? 1 : 0);
                formData.append('group_id', this.user.group_id);
                //formData.append('_method', 'patch');

                updateAdmin(this.user.id, formData).then(({data}) => {
                    this.$router.push('/admin')
                }).catch(({response}) => {
                    console.log(response);

                    this.errors = response.data.errors;

                    showDialog('error', 'Thông báo', response.data.error.message);
                });

                e.preventDefault();
            },

            isValid() {
                let is_valid = true;

                return is_valid;
            }
        }
    }
</script>

<style scoped>

</style>
