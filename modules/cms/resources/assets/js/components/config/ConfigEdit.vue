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
                        <li class="active">Cấu hình hệ thống</li>
                    </ol>
                </div>
            </div>
        </div>

        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="body">
                            <form id="group_config" class="form-horizontal" method="POST" encType="multipart/form-data"
                                  @submit.prevent="onSubmit">
                                <!-- Nav tabs -->
                                <ul class="nav nav-tabs tab-nav-right" role="tablist">
                                    <template v-for="group in group_configs">
                                        <li role="presentation" :class="{ 'active' : group.code == 'OVERVIEW'}">
                                            <a :href="'#GROUP_CONFIG_'+group.code" data-toggle="tab">
                                                {{group.name}}
                                            </a>
                                        </li>
                                    </template>
                                </ul>

                                <div class="tab-content">
                                    <template v-for="group in group_configs">
                                        <div role="tabpanel"
                                             v-bind:class="group.code == 'OVERVIEW'?'tab-pane fade active in':'tab-pane fade'"
                                             :id="'GROUP_CONFIG_'+group.code">

                                            <template v-for="config in group.data">
                                                <div class="row clearfix">
                                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                                        <label class="form-label">{{config.label}}</label>
                                                    </div>
                                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                                        <div class="form-group">
                                                            <div class="form-line">
                                                                <input type="text" class="form-control"
                                                                       :name="config.key" v-model="config.value"
                                                                       :placeholder="config.label"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>

                                        </div>
                                    </template>
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
    import {getConfigAll, updateConfigAll} from '../../models/config'
    import {showDialog} from '../../utils/dialog'

    export default {
        name: "Welcome",
        title: 'Trang chủ',

        data() {
            return {
                errors: {},
                group_configs: [],
                config: {}
            };
        },

        created() {
            this.fetch();
        },

        methods: {
            fetch() {
                axios.all([
                    getConfigAll()
                ]).then(axios.spread(({data}) => {
                    const response = data;

                    this.group_configs = response.data.configs;
                }));
            },

            onSubmit(e) {
                const formData = new FormData(document.getElementById('group_config'));

                updateConfigAll(formData)
                    .then(({data}) => {
                        const response = data;

                        if (response.success == false) {
                            showDialog('error', 'Thông báo', response.error.message);

                            return false;
                        }

                        showDialog('info', 'Thông báo', 'Cập nhật thông tin thành công.')
                    }).catch(({response}) => {
                    showDialog('error', 'Có lỗi xảy ra.', response.data.message)
                });

                e.preventDefault();
            },
        }
    }
</script>

<style scoped>

</style>
