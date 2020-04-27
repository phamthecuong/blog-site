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
                        <li class="active">Quản lý Báo lỗi</li>
                    </ol>
                </div>
            </div>

            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="body table-responsive">
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th width="150">Tài khoản</th>
                                    <th>Nội dung</th>
                                    <th width="250">Thời gian tạo</th>
                                    <th width="100"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="report_error in report_errors">
                                    <td>{{report_error.reporter.phone}}</td>
                                    <td>{{report_error.content}}</td>
                                    <td>{{report_error.created_at}}</td>
                                    <td class="text-right">
                                        <router-link class="item-tool" :to="{path: '/report-error/'+report_error.id}">
                                            <i class="material-icons">edit</i>
                                        </router-link>
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
    import {getReportErrors} from '../../models/report_error'

    export default {
        name: "ReportErrorList",

        data() {
            return {
                search: {
                    content: ''
                },
                report_errors: {
                    reporter: {
                        phone: null
                    }
                },
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
                    getReportErrors({
                        page: page
                    })
                ]).then(axios.spread((first_response) => {
                    this.report_errors = first_response.data.data.report_errors;
                    this.pageCount = first_response.data.data.meta_data.last_page;
                }));
            },

            searchEvent({target}) {
                const that = this;

                switch (target.name) {
                    case 'content':
                        that.search.content = target.value;

                        break;
                }

                getReportErrors({
                    content: that.search.content
                }).then(response => {
                    this.report_errors = response.data.data.report_errors;
                    this.pageCount = response.data.data.meta_data.last_page;
                });
            },
        }
    }
</script>

<style scoped>

</style>
