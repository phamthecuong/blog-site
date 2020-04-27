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
                        <li class="active">Quản lý Quản trị viên</li>
                    </ol>
                </div>
            </div>

            <div class="card">

                <div class="body">
                    <form method="get" class="form-inline">
                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 m-b-0">
                                <div class="form-group m-0">
                                    <div class="form-line">
                                        <label>Tài khoản</label>
                                        <input type="text" class="form-control" name="name" v-on:keyup="searchEvent"
                                               placeholder="Nhập tài khoản" value=""/>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 m-b-0">
                                <div class="form-group m-0">
                                    <div class="form-line">
                                        <label>Email</label>
                                        <input type="text" class="form-control" name="email" v-on:keyup="searchEvent"
                                               placeholder="Nhập email" value=""/>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 m-b-0">
                                <div class="form-group">
                                    <div class="form-line">
                                        <label>Trạng thái</label>
                                        <select name="is_active" class="form-control" title="Chọn trạng thái"
                                                @change="searchEvent">
                                            <option value="-1">Tất cả</option>
                                            <option value="1">Hoạt động</option>
                                            <option value="0">Không hoạt động</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>

            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="body table-responsive">
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tài khoản</th>
                                    <th>Email</th>
                                    <th>Nhóm</th>
                                    <th>Thời gian tạo</th>
                                    <th>Trạng thái</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="user in users">
                                    <td>{{user.id}}</td>
                                    <td>{{user.name}}</td>
                                    <td>{{user.email}}</td>
                                    <td>{{user.group.name}}</td>
                                    <td>{{user.created_at}}</td>
                                    <td>
                                        <span v-if="user.is_active == 1" class="font-bold col-teal">Hoạt động</span>
                                        <span v-else class="font-bold col-pink">Không hoạt động</span>
                                    </td>
                                    <td class="text-right">
                                        <router-link class="item-tool" :to="{path: '/admin/'+user.id}">
                                            <i class="material-icons">edit</i>
                                        </router-link>
                                        <a href="#" class="item-tool" @click="report(user.id)">
                                            <i class="material-icons">delete</i>
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <div class="text-right">
                                <paginate
                                    v-model="page"
                                    :page-count="pageCount"
                                    :click-handler="fetch"
                                    :prev-text="'Trang trước'"
                                    :next-text="'Trang sau'"
                                    :container-class="'pagination'">
                                </paginate>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="btn-create-new">
            <router-link class="item-tool" :to="{path: '/admin/create'}">
                <button type="button" class="btn bg-red btn-circle-lg waves-effect waves-circle waves-float">
                    <i class="material-icons">add</i>
                </button>
            </router-link>
        </div>
    </section>

</template>

<script>
    import axios from 'axios'
    import {confirmDialog} from '../../utils/dialog'
    import {getAdmins, deleteAdmin} from '../../models/admin'

    export default {
        name: "AdminList",
        title: 'Quản lý Quản trị viên',

        data() {
            return {
                search: {
                    name: '',
                    email: '',
                    fullname: '',
                    phone: '',
                    is_active: -1
                },
                users: [],
                page: 1,
                pageCount: 1,
                pageLimit: 25
            };
        },

        created() {
            this.fetch();
        },

        methods: {
            fetch(page = 1) {
                axios.all([
                    getAdmins({
                        page: page
                    })
                ]).then(axios.spread((first_response) => {
                    this.users = first_response.data.data.admins;
                    this.pageCount = first_response.data.data.meta_data.last_page;
                }));
            },

            searchEvent({target}) {
                const that = this;

                switch (target.name) {
                    case 'name':
                        that.search.name = target.value;

                        break;
                    case 'email':
                        that.search.email = target.value;

                        break;
                    case 'status':
                        that.search.is_active = target.value;

                        break;
                }

                getAdmins({
                    name: this.search.name,
                    email: this.search.email,
                    fullname: this.search.fullname,
                    phone: this.search.phone,
                    is_active: this.search.is_active
                }).then(response => {
                    this.users = response.data.data.admins;
                    this.pageCount = response.data.data.meta_data.last_page;
                });
            },

            report(id) {
                const that = this;

                confirmDialog('Xác nhận', 'Bạn chắc chắn muốn xóa?', function () {
                    deleteAdmin(id).then(response => {
                        that.users = that.users.filter(item => item.id !== id);
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>
