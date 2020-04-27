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
                        <li class="active">Log hành động</li>
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
                                        <label>Người dùng</label>
                                        <input type="text" class="form-control" name="user_name"
                                               v-on:keyup="searchEvent"
                                               placeholder="Nhập tên người dùng" value=""/>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 m-b-0">
                                <div class="form-group m-0">
                                    <div class="form-line">
                                        <label>Mã đối tượng</label>
                                        <input type="text" class="form-control" name="object_id"
                                               v-on:keyup="searchEvent"
                                               placeholder="Nhập Mã đối tượng" value=""/>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 m-b-0">
                                <div class="form-group">
                                    <div class="form-line">
                                        <label>Loại đối tượng</label>
                                        <select name="object_type" class="form-control" title="Loại đối tượng"
                                                @change="searchEvent">
                                            <option value="">Tất cả</option>
                                            <option value="order">Đơn hàng</option>
                                            <option value="transaction">Giao dịch</option>
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
                                    <th>Người dùng</th>
                                    <th>Mã đối tượng</th>
                                    <th>Loại đối tượng</th>
                                    <th>Nội dung</th>
                                    <th>Thời gian tạo</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="log in activity_logs">
                                    <td>{{log.user.name}}</td>
                                    <td>{{log.object_id}}</td>
                                    <td>{{log.object_type}}</td>
                                    <td>
                                        <p>{{log.content}}</p>
                                    </td>
                                    <td>{{log.created_at}}</td>
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
    import {getActivityLogs} from '../../models/activity.log'

    export default {
        name: "ActivityLogList",

        data() {
            return {
                search: {
                    user_name: "",
                    object_id: "",
                    object_type: ""
                },
                activity_logs: [],
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
                    getActivityLogs({
                        page: page
                    })
                ]).then(axios.spread((first_response) => {
                    this.activity_logs = first_response.data.data;
                    this.pageCount = first_response.data.meta.last_page;
                }));
            },

            searchEvent({target}) {
                const that = this;

                switch (target.name) {
                    case 'user_name':
                        that.search.user_name = target.value;

                        break;
                    case 'object_id':
                        that.search.object_id = target.value;

                        break;
                    case 'object_type':
                        that.search.object_type = target.value;

                        break;
                }

                getActivityLogs({
                    user_name: that.search.user_name,
                    object_id: that.search.object_id,
                    object_type: that.search.object_type
                }).then(response => {
                    this.activity_logs = response.data.data;
                    this.pageCount = response.data.meta.last_page;
                });
            }
        }
    }
</script>

<style scoped>

</style>