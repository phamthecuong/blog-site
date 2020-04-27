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
                        <li class="active">Quản lý Giao dịch</li>
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
                                        <label>Mã giao dịch</label>
                                        <input type="text" class="form-control" name="eid" v-on:keyup="searchEvent"
                                               placeholder="Nhập Mã giao dịch" value=""/>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 m-b-0">
                                <div class="form-group m-0">
                                    <div class="form-line">
                                        <label>Số điện thoại</label>
                                        <input type="text" class="form-control" name="phone" v-on:keyup="searchEvent"
                                               placeholder="Nhập Số điện thoại" :value="search.phone"/>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 m-b-0">
                                <div class="form-group m-0">
                                    <div class="form-line">
                                        <label>Nội dung giao dịch</label>
                                        <input type="text" class="form-control" name="content" v-on:keyup="searchEvent"
                                               placeholder="Nội dung giao dịch" :value="search.content"/>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 m-b-0">
                                <div class="form-group">
                                    <div class="form-line">
                                        <label>Loại giao dịch</label>
                                        <select name="type" class="form-control" title="Chọn Loại giao dịch"
                                                @change="searchEvent">
                                            <option value="">Tất cả</option>
                                            <option value="DEPOSIT">Nạp tiền</option>
                                            <option value="WITHDRAW">Rút tiền</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 m-b-0">
                                <div class="form-group">
                                    <div class="form-line">
                                        <label>Trạng thái</label>
                                        <select name="status" class="form-control" title="Chọn trạng thái"
                                                @change="searchEvent">
                                            <option value="">Tất cả</option>
                                            <option value="CREATED">Mới tạo</option>
                                            <option value="PROCESSING">Đang xử lý</option>
                                            <option value="CANCEL">Đã huỷ</option>
                                            <option value="FAIL">Thất bại</option>
                                            <option value="SUCCESS">Thành công</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

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
                                    <button type="button" class="btn btn-success waves-effect form-control">
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
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th>Thông tin giao dịch</th>
                                    <th>Thông tin khách hàng</th>
                                    <th>Loại giao dịch</th>
                                    <th>Gói đầu tư</th>
                                    <th>Thời gian giao dịch</th>
                                    <th>Trạng thái</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="transaction in transactions">
                                    <td>
                                        <p><b>{{transaction.title}}</b></p>
                                        <p><small><b>ID: </b>{{transaction.id}}</small></p>
                                        <p><small>{{transaction.description}}</small></p>
                                    </td>
                                    <td>
                                        <p>
                                            <a :href="`/user/`+transaction.user.id" target="_blank">
                                                +{{transaction.user.phone}}
                                            </a>
                                        </p>
                                        <p v-if="transaction.user.profile">
                                            {{transaction.user.profile.fullname}}
                                        </p>
                                    </td>
                                    <td>
                                        <p><b>Số tiền: </b>{{transaction.amount | toCurrency}}</p>
                                        <p><b>Phí giao dịch: </b>{{transaction.fee | toCurrency}}</p>
                                        <p><b>Phí TNCN: </b>{{transaction.vat | toCurrency}}</p>
                                    </td>
                                    <td>
                                        <span v-if="transaction.type == 'DEPOSIT'"
                                              class="font-bold col-teal">Nạp tiền</span>
                                        <span v-else-if="transaction.type == 'WITHDRAW'" class="font-bold col-pink">Rút tiền</span>
                                    </td>
                                    <td>{{transaction.target.name}}</td>
                                    <td>{{transaction.created_at}}</td>
                                    <td>
                                        <span v-if="transaction.status == 'CREATED'"
                                              class="font-bold">Mới tạo</span>
                                        <span v-else-if="transaction.status == 'PROCESSING'"
                                              class="font-bold col-orange">Đang xử lý</span>
                                        <span v-else-if="transaction.status == 'SUCCESS'" class="font-bold col-teal">Thành công</span>
                                        <span v-else-if="transaction.status == 'CANCEL'" class="font-bold col-pink">Đã huỷ</span>
                                        <span v-else-if="transaction.status == 'FINISHED'" class="font-bold col-teal">Hoàn thành</span>
                                        <span v-else-if="transaction.status == 'FAIL'"
                                              class="font-bold col-pink">Thất bại</span>
                                        <span v-else class="font-bold col-pink">Lỗi</span>
                                    </td>
                                    <td class="text-right">
                                        <router-link class="item-tool" :to="{path: '/transaction/'+transaction.id}">
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
    import {confirmDialog} from '../../utils/dialog'
    import {getTransactions} from '../../models/transaction'

    export default {
        name: "TransactionList",
        title: 'Quản lý Giao dịch',

        data() {
            return {
                search: {
                    eid: '',
                    phone: '',
                    content: '',
                    type: '',
                    status: '',
                    date_from: '',
                    date_to: ''
                },
                transactions: [],
                page: 1,
                pageCount: 1,
                pageLimit: 25
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

                this.search.phone = this.$route.query.phone;
                this.search.content = this.$route.query.content;
                this.search.type = this.$route.query.type;
                this.search.status = this.$route.query.status;
                this.search.date_from = this.$route.query.date_from;
                this.search.date_to = this.$route.query.date_to;

                if (this.$route.query.page != undefined) {
                    this.page = page;
                }

                axios.all([
                    getTransactions({
                        page: page,
                        phone: this.search.phone,
                        content: this.search.content,
                        type: this.search.type,
                        status: this.search.status,
                        date_from: this.search.date_from,
                        date_to: this.search.date_to
                    })
                ]).then(axios.spread((first_response) => {
                    this.transactions = first_response.data.data.transactions;
                    this.pageCount = first_response.data.data.meta_data.last_page;

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
                    name: 'get_transactions', params: {}, query: {
                        page: page,
                        phone: this.search.phone,
                        content: this.search.content,
                        type: this.search.type,
                        status: this.search.status,
                        date_from: this.search.date_from,
                        date_to: this.search.date_to
                    }
                }).catch(err => {
                });
            },

            searchEvent({target}) {
                const that = this;

                switch (target.name) {
                    case 'eid':
                        that.search.eid = target.value;

                        break;
                    case 'phone':
                        that.search.phone = target.value;

                        break;
                    case 'content':
                        that.search.content = target.value;

                        break;
                    case 'type':
                        that.search.type = target.value;

                        break;
                    case 'status':
                        that.search.status = target.value;

                        break;
                    case 'date_from':
                        that.search.date_from = target.value;

                        break;
                    case 'date_to':
                        that.search.date_to = target.value;

                        break;
                }

                getTransactions({
                    eid: this.search.eid,
                    phone: this.search.phone,
                    content: this.search.content,
                    type: this.search.type,
                    status: this.search.status,
                    date_from: this.search.date_from,
                    date_to: this.search.date_to
                }).then(response => {
                    this.transactions = response.data.data.transactions;
                    this.pageCount = response.data.data.meta_data.last_page;

                    this.updateUrl();
                });
            },

            report(id) {
                const that = this;

                confirmDialog('Xác nhận', 'Bạn chắc chắn muốn xóa?', function () {

                });
            }
        }
    }
</script>

<style scoped>

</style>
