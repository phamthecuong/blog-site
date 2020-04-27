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
                        <li class="active">Quản lý nhóm người dùng</li>
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
                                        <label>Danh mục</label>
                                        <input type="text" class="form-control" name="name" v-on:keyup="searchEvent"
                                               placeholder="Nhập tên nhóm" value=""/>
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
                                    <th>Nhóm</th>
                                    <th>Mô tả</th>
                                    <th>Trạng thái</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="group in groups">
                                    <td>{{group.name}}</td>
                                    <td>{{group.description}}</td>
                                    <td>
                                        <span v-if="group.is_active == 1" class="font-bold col-teal">Hoạt động</span>
                                        <span v-else class="font-bold col-pink">Không hoạt động</span>
                                    </td>
                                    <td class="text-right">
                                        <router-link class="item-tool" :to="{path: '/admin-group/'+group.id}">
                                            <i class="material-icons">edit</i>
                                        </router-link>
                                        <a href="#" class="item-tool" @click="report(group.id)">
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
            <router-link class="item-tool" :to="{path: '/admin-group/create'}">
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
    import {getGroups, deleteGroup} from '../../models/group'

    export default {
        name: "GroupList",

        data() {
            return {
                search: {
                    name: '',
                    is_active: -1
                },
                groups: [],
                page: 1,
                pageCount: 1,
                pageLimit: 25,
                error_code: 0,
                error_message: '',
            };
        },

        created() {
            this.fetch();
        },

        methods: {
            fetch(page = 1) {
                axios.all([
                    getGroups({
                        page: page
                    })
                ]).then(axios.spread((first_response) => {
                    if (first_response.data.success == false) {
                        this.error_code = first_response.data.error.code;
                        this.error_message = first_response.data.error.message;

                        this.$store.dispatch('setError', first_response.data.error);

                        return false;
                    }

                    this.groups = first_response.data.data.admin_groups;
                    this.pageCount = first_response.data.data.meta_data.last_page;
                }));
            },

            searchEvent({target}) {
                const that = this;

                switch (target.name) {
                    case 'name':
                        that.search.name = target.value;

                        break;
                    case 'is_active':
                        that.search.is_active = target.value;

                        break;
                }

                getGroups({
                    name: that.search.name,
                    is_active: that.search.is_active
                }).then(response => {
                    this.groups = response.data.data.admin_groups;
                    this.pageCount = response.data.data.meta_data.last_page;
                });
            },

            report(id) {
                const that = this;

                confirmDialog('Xác nhận', 'Bạn chắc chắn muốn xóa?', function () {
                    deleteGroup().then(response => {
                        that.groups = that.groups.filter(item => item.id !== id);
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>