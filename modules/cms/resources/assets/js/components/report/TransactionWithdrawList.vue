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
                        <li class="active">Báo cáo Giao dịch rút tiền</li>
                    </ol>
                </div>
            </div>

            <div class="card">

                <div class="body">
                    <form method="get" class="form-inline">
                        <div class="row m-t-15">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 m-b-0">
                                <div class="form-group">
                                    <label>Thời gian giao dịch</label>
                                    <div class="input-daterange input-group" id="bs_datepicker_range_container">
                                        <div class="form-line">
                                            <input type="text" class="form-control datepicker_range" name="date_from"
                                                   placeholder="Từ ngày" v-on:keyup="searchEvent"
                                                   :value="search.date_from" autocomplete="off"/>
                                        </div>
                                        <span class="input-group-addon">đến</span>
                                        <div class="form-line">
                                            <input type="text" class="form-control datepicker_range" name="date_to"
                                                   placeholder="Đến ngày" v-on:keyup="searchEvent"
                                                   :value="search.date_to" autocomplete="off"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 m-b-0">
                                <div class="form-group">
                                    <label>&nbsp;</label>
                                    <button type="button" class="btn btn-success waves-effect form-control"
                                            @click="exportToExcel()">
                                        <i class="material-icons">file_download</i>
                                        Xuất báo cáo
                                    </button>
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
                            <table id="reportTable" class="table table-bordered table-hover dataTable">
                                <thead>
                                <tr>
                                    <th rowspan="2" width="250">Ngày tháng</th>
                                    <th rowspan="2" width="250">Tổng tiền rút</th>
                                    <th colspan="3" class="text-center" v-for="fund in funds">{{fund.code}}</th>
                                    <th rowspan="2" width="250">Thuế TNCN giữ lại (0.1% giá trị giao dịch)</th>
                                    <th rowspan="2" width="250">Phí rút tiền (0.5%)</th>
                                    <th rowspan="2" width="250">Chênh lệch</th>
                                </tr>
                                <tr>
                                    <template v-for="fund in funds">
                                        <th>Số tiền</th>
                                        <th>Giá bán trung bình</th>
                                        <th>Số lượng</th>
                                    </template>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="transaction in transactions">
                                    <td>{{transaction.date}}</td>
                                    <td>{{transaction.amount}}</td>
                                    <template v-for="fund in transaction.funds">
                                        <td>
                                            <span v-if="fund.amount != ''">
                                                {{fund.amount}}
                                            </span>
                                            <span v-else>-</span>
                                        </td>
                                        <td>{{fund.nav || `-`}}</td>
                                        <td>{{fund.total || `-`}}</td>
                                    </template>
                                    <td>{{transaction.fee}}</td>
                                    <td>{{transaction.vat}}</td>
                                    <td>{{transaction.diff}}</td>
                                </tr>
                                <tr>
                                    <td><b>Tổng</b></td>
                                    <td><b>{{meta_data.amount}}</b></td>
                                    <template v-for="fund in funds">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </template>
                                    <td></td>
                                    <td></td>
                                    <td><b>{{meta_data.diff}}</b></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
    import axios from 'axios'
    import {getTransactionWithdrawReports} from '../../models/report'
    import {exportTableToExcel} from '../../utils/excel'

    export default {
        name: "TransactionWithdrawList",
        title: 'Báo cáo Giao dịch rút tiền',

        data() {
            return {
                search: {
                    date_from: '',
                    date_to: ''
                },
                funds: [],
                transactions: [],
                meta_data: [],
            };
        },

        created() {
            let page = 1;
            if (this.$route.query.page != undefined) {
                page = parseInt(this.$route.query.page);
            }
            this.fetch(page);
        },

        methods: {
            fetch(page = 1) {
                const that = this;

                this.search.date_from = this.$route.query.date_from;
                this.search.date_to = this.$route.query.date_to;

                axios.all([
                    getTransactionWithdrawReports({
                        date_from: this.search.date_from,
                        date_to: this.search.date_to
                    })
                ]).then(axios.spread((first_response) => {
                    this.funds = first_response.data.data.funds;
                    this.transactions = first_response.data.data.transactions;
                    this.meta_data = first_response.data.data.meta_data;

                    this.updateUrl(page);

                    setTimeout(() => {
                        $('#bs_datepicker_range_container .datepicker_range').datepicker({
                            autoclose: true,
                            format: 'dd/mm/yyyy',
                            container: '#bs_datepicker_range_container'
                        }).on('changeDate', function (e) {
                            that.searchEvent({
                                target: {
                                    name: $(this).attr('name'),
                                    value: this.value
                                }
                            });
                        });
                    }, 1000);
                }));
            },

            updateUrl(page = 1) {
                this.$router.replace({
                    name: 'report_withdraw', params: {}, query: {
                        date_from: this.search.date_from,
                        date_to: this.search.date_to
                    }
                }).catch(err => {
                });
            },

            searchEvent({target}) {
                const that = this;

                switch (target.name) {
                    case 'date_from':
                        that.search.date_from = target.value;

                        break;
                    case 'date_to':
                        that.search.date_to = target.value;

                        break;
                }

                getTransactionWithdrawReports({
                    date_from: this.search.date_from,
                    date_to: this.search.date_to
                }).then(response => {
                    this.transactions = response.data.data.transactions;
                    this.meta_data = response.data.data.meta_data;

                    this.updateUrl();
                });
            },

            exportToExcel() {
                exportTableToExcel('reportTable', 'report-withdraw');
            }
        }
    }
</script>

<style scoped>

</style>
