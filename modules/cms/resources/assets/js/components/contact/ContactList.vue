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
                        <li class="active">Quản lý liên hệ</li>
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
                                        <label>Họ tên</label>
                                        <input type="text" class="form-control" name="name" v-on:keyup="searchEvent"
                                               placeholder="Nhập họ tên" value=""/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 m-b-0">
                                <div class="form-group m-0">
                                    <div class="form-line">
                                        <label>Email</label>
                                        <input type="text" class="form-control" name="email" v-on:keyup="searchEvent"
                                               placeholder="Nhập Email" value=""/>
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
                                    <th>Họ tên</th>
                                    <th>Email</th>
                                    <th>Thời gian tạo</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="contact in contacts">
                                    <td>{{contact.id}}</td>
                                    <td>{{contact.name}}</td>
                                    <td>{{contact.email}}</td>
                                    <td>{{contact.created_at}}</td>
                                    <td class="text-right">
                                        <router-link class="item-tool" :to="{path: '/contact/'+contact.id}">
                                            <i class="material-icons">edit</i>
                                        </router-link>
                                        <a href="#" class="item-tool" @click="report(contact.id)">
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
    </section>

</template>

<script>
    import axios from 'axios'
    import {confirmDialog} from '../../utils/dialog'
    import {getContacts, deleteContact} from '../../models/contact'

    export default {
        name: "ContactList",

        data() {
            return {
                search: {
                    name: '',
                    status: -1
                },
                contacts: [],
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
                    getContacts({
                        page: page
                    })
                ]).then(axios.spread((first_response) => {
                    this.contacts = first_response.data.data;
                    this.pageCount = first_response.data.meta.last_page;
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
                        that.search.status = target.value;

                        break;
                }

                getContacts({
                    name: that.search.name,
                    email: that.search.email,
                    status: that.search.status
                }).then(response => {
                    this.contacts = response.data.data;
                    this.pageCount = response.data.meta.last_page;
                });
            },

            report(id) {
                const that = this;

                confirmDialog('Xác nhận', 'Bạn chắc chắn muốn xóa?', function () {
                    deleteContact(id).then(response => {
                        that.contacts = that.contacts.filter(item => item.id !== id);
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>