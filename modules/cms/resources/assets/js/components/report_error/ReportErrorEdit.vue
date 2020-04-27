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
                            <router-link :to="{ name: 'get_report_errors' }">
                                Quản lý Báo lỗi
                            </router-link>
                        </li>
                        <li class="active">{{report_error.id}}</li>
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
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 text-right">
                                        <label class="form-label">Nội dung</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            {{report_error.content}}
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 text-right">
                                        <label class="form-label">Hình ảnh</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div v-for="report_error_image in report_error.images"
                                                 style="float: left; margin-right: 5px;">
                                                <img :src="report_error_image" style="width: 100px"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 text-right">
                                        <label class="form-label">Người báo lỗi</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            {{report_error.reporter.phone}}
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 text-right">
                                        <label class="form-label">Thời gian báo lỗi</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <td>{{report_error.created_at}}</td>
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
    import {getReportError} from '../../models/report_error'

    export default {
        name: "ReportErrorEdit",

        data() {
            return {
                errors: {},
                report_error: {
                    reporter: {}
                },
            };
        },

        created() {
            this.fetch();
        },

        methods: {
            fetch() {
                const {id} = this.$route.params;

                axios.all([
                    getReportError(id)
                ]).then(axios.spread((first_response) => {
                    this.report_error = first_response.data.data.report_error;
                })).catch(errors => {
                    if (errors.response.status == 404) {
                        this.$router.push('/404');
                    }
                });
            },

            addEvent({target}) {

            },

            onSubmit(e) {
                e.preventDefault();
            }
        }
    }
</script>

<style scoped>

</style>
