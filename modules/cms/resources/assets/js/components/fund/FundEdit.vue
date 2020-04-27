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
                            <router-link :to="{ name: 'get_funds' }">
                                Quản lý Chứng chỉ quỹ
                            </router-link>
                        </li>
                        <li class="active">{{fund.name}}</li>
                    </ol>
                </div>
            </div>

            <div class="row clearfix">
                <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>
                                THÔNG TIN CHỨNG CHỈ QUỸ
                            </h2>
                        </div>
                        <div class="body table-responsive">
                            <form class="form-horizontal" id="create_form" method="POST" encType="multipart/form-data"
                                  @submit.prevent="onSubmit">
                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Chứng chỉ quỹ (*)</label>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div v-bind:class="[errors.name?'form-line focused error':'form-line']">
                                                <input type="text" class="form-control" name="name"
                                                       v-model="fund.name" @input="addEvent"
                                                       placeholder="Tiêu đề"/>
                                            </div>
                                            <div class="help-info">Tối thiểu 3, tối đa 255 ký tự</div>
                                            <label class="error" v-if="errors.name">{{ errors.name }}</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Mã chứng chỉ quỹ (*)</label>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div v-bind:class="[errors.code?'form-line focused error':'form-line']">
                                                <input type="text" class="form-control" name="code"
                                                       v-model="fund.code" @input="addEvent"
                                                       placeholder="Tiêu đề"/>
                                            </div>
                                            <div class="help-info">Tối thiểu 3, tối đa 255 ký tự</div>
                                            <label class="error" v-if="errors.code">{{ errors.code }}</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Mô tả (*)</label>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div
                                                v-bind:class="[errors.description?'form-line focused error':'form-line']">
                                                <textarea name="description" class="form-control" rows="4"
                                                          @input="addEvent"
                                                          placeholder="Mô tả" v-model="fund.description"></textarea>
                                            </div>

                                            <div class="help-info">Tối thiểu 3 ký tự</div>
                                            <label class="error" v-if="errors.description">
                                                {{ errors.description }}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Công ty quản lý</label>
                                    </div>
                                    <div class="col-lg-7 col-md-7 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="company_name"
                                                       @input="addEvent"
                                                       v-model="fund.company_name"
                                                       placeholder="Công ty quản lý"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Lợi nhuận (%)</label>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="rate"
                                                       @input="addEvent"
                                                       v-model="fund.rate"
                                                       placeholder="Lợi nhuận"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Website</label>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="link"
                                                       @input="addEvent"
                                                       v-model="fund.link"
                                                       placeholder="Website"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Màu sắc</label>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="input-group colorpicker">
                                                <div class="form-line">
                                                    <input type="text" class="form-control" name="color_chart"
                                                           @input="addEvent"
                                                           v-model="fund.color_chart"
                                                           placeholder="Màu sắc"/>
                                                </div>
                                                <span class="input-group-addon">
                                                    <i v-bind:style="`background-color: `+fund.color_chart"></i>
                                                </span>
                                            </div>
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
                <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>
                                BIỂU ĐỒ TĂNG TRƯỞNG
                            </h2>
                        </div>
                        <div class="body table-responsive">
                            <div id="line_chart" class="graph"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from 'axios'
    import {getFund, updateFund} from '../../models/fund'
    import {showDialog} from '../../utils/dialog'

    export default {
        name: "FundEdit",

        data() {
            return {
                errors: {
                    code: '',
                    name: '',
                    description: '',
                },
                fund: {
                    color_chart: '#ff0000',
                    navs: [],
                }
            };
        },

        created() {
            this.fetch();
        },

        methods: {
            fetch() {
                const that = this;

                const {id} = this.$route.params;

                axios.all([
                    getFund(id)
                ]).then(axios.spread((first_response) => {
                    this.fund = first_response.data.data.fund;

                    Morris.Line({
                        element: 'line_chart',
                        data: this.fund.navs,
                        xkey: 'time',
                        ykeys: ['amount'],
                        labels: ['NAV', 'Thời gian'],
                        lineColors: ['rgb(0, 188, 212)'],
                        lineWidth: 1,
                        pointSize: 0
                    });

                    setTimeout(() => {
                        $('.colorpicker').colorpicker();
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
                const that = this;

                if (!this.isValid()) {
                    window.scrollTo(0, 0);

                    return false;
                }

                const formData = new FormData();

                formData.append('code', this.fund.code);
                formData.append('name', this.fund.name);
                formData.append('description', this.fund.description);
                formData.append('company_name', this.fund.company_name);
                formData.append('company_name', this.fund.company_name);
                formData.append('rate', this.fund.rate);
                formData.append('color_chart', this.fund.color_chart);
                formData.append('link', this.fund.link);

                updateFund(this.fund.id, formData)
                    .then(({data}) => {
                        if (data.success == true) {
                            this.$router.push('/fund');

                            return;
                        }

                        const errors = data.error.errors;
                        if (errors.hasOwnProperty('code')) {
                            that.errors.code = errors.code[0];
                        }
                        if (errors.hasOwnProperty('name')) {
                            that.errors.name = errors.name[0];
                        }
                        if (errors.hasOwnProperty('description')) {
                            that.errors.description = errors.description[0];
                        }

                        showDialog('error', 'Thông báo', data.error.message);
                    })
                    .catch(({response}) => this.errors = response.data.errors);

                e.preventDefault();
            },

            isValid() {
                let is_valid = true;

                if (!this.fund.code) {
                    this.errors.code = "Vui lòng nhập mã CCQ.";

                    is_valid = false;
                }

                if (!this.fund.name) {
                    this.errors.name = "Vui lòng nhập tên CCQ.";

                    is_valid = false;
                }

                if (!this.fund.description) {
                    this.errors.description = "Vui lòng nhập mô tả CCQ.";

                    is_valid = false;
                }

                return is_valid;
            }
        }
    }
</script>

<style scoped>

</style>
