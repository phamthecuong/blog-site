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
                            <router-link :to="{ name: 'get_transactions' }">
                                Quản lý Giao dịch
                            </router-link>
                        </li>
                        <li class="active">Giao dịch {{transaction.id}}</li>
                    </ol>
                </div>
            </div>

            <div class="row clearfix">
                <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>
                                THÔNG TIN GIAO DỊCH
                            </h2>
                        </div>
                        <div class="body table-responsive">
                            <form class="form-horizontal" id="create_form" method="POST" encType="multipart/form-data">
                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <b>Mã giao dịch</b>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-7">
                                        <b>{{transaction.id}}</b>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <b>Mô tả</b>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-7">
                                        <p>{{transaction.title}}</p>
                                        <small>{{transaction.description}}</small>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <b>Nội dung giao dịch</b>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-7">
                                        {{transaction.content}}
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <b>Số tiền (VNĐ)</b>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-7">
                                        <p><b>Số tiền:</b> {{transaction.amount | toCurrency}}</p>
                                        <p><b>Phí giao dịch:</b> {{transaction.fee | toCurrency}}</p>
                                        <p><b>Phí TNCN: </b>{{transaction.vat | toCurrency}}</p>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <b>Loại giao dịch</b>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-7">
                                        <span v-if="transaction.type == 'DEPOSIT'"
                                              class="font-bold col-teal">Nạp tiền</span>
                                        <span v-else-if="transaction.type == 'WITHDRAW'" class="font-bold col-pink">Rút tiền</span>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <b>Gói đầu tư</b>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-7">
                                        {{transaction.target.name}}
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <b>Thông tin CCQ</b>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-7">

                                        <div v-if="transaction.funds != undefined">
                                            <div class="table-responsive">
                                                <table class="table table-striped">
                                                    <thead>
                                                    <tr>
                                                        <th>CCQ</th>
                                                        <th>Số tiền</th>
                                                        <th>NAV</th>
                                                        <th>Số CCQ</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr v-for="transFund in transaction.funds">
                                                        <td>{{transFund.fund.code}}</td>
                                                        <td>{{transFund.amount | toCurrency}}</td>
                                                        <td>{{transFund.nav}}</td>
                                                        <td>{{transFund.total}}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <b>Phương thức giao dịch</b>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-7">
                                        <span v-if="transaction.method== 'BANK_TRANSFER'">Nạp tiền chuyển khoản</span>
                                        <span v-else class="font-bold col-pink">Chưa xác định</span>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <b>Thời gian giao dịch</b>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-7">
                                        {{transaction.created_at}}
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <b>Thông tin khách hàng</b>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-7">
                                        <p><b>Số điện thoại: </b>
                                            <a :href="`/user/`+transaction.user.id" target="_blank">
                                                +{{transaction.user.phone}}
                                            </a>
                                        </p>
                                        <p v-if="transaction.user.profile">
                                            <b>Họ tên: </b>{{transaction.user.profile.fullname}}
                                        </p>
                                        <p><b>Ngân hàng: </b>{{transaction.info.bank_name}}</p>
                                        <p><b>Chi nhánh: </b>{{transaction.info.bank_branch}}</p>
                                        <p><b>Tên tài khoản: </b>{{transaction.info.bank_account_name}}</p>
                                        <p><b>Số tài khoản: </b>{{transaction.info.bank_account}}</p>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <b>Ngân hàng thụ hưởng</b>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-7">
                                        <p><b>Ngân hàng: </b>{{transaction.info.service_bank_name}}</p>
                                        <p><b>Chi nhánh: </b>{{transaction.info.service_bank_branch}}</p>
                                        <p><b>Tên tài khoản: </b>{{transaction.info.service_bank_account_name}}</p>
                                        <p><b>Số tài khoản: </b>{{transaction.info.service_bank_account}}</p>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <b>Ghi chú</b>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-7">
                                        {{transaction.note}}
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <b>Trạng thái</b>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-7">
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
                                    </div>
                                </div>

                                <div class="row clearfix" v-if="transaction.approver != undefined">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <b>Người duyệt</b>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-7">
                                        {{transaction.approver.name}}
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 form-control-label">
                                        <b>Thời gian cập nhật</b>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-7">
                                        {{transaction.updated_at}}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <div class="card"
                         v-if="transaction.type == 'DEPOSIT' && ['CREATED', 'PROCESSING'].includes(transaction.status)">
                        <div class="header">
                            <h2>
                                HỖ TRỢ CSKH
                            </h2>
                        </div>
                        <div class="body table-responsive">
                            <div>
                                <button type="button" class="btn btn-block btn-lg btn-success waves-effect"
                                        data-toggle="modal" data-target="#approveDepositModal">
                                    Duyệt Nạp tiền
                                </button>
                                <button type="button" class="btn btn-block btn-lg btn-danger waves-effect m-t-15"
                                        data-toggle="modal" data-target="#cancelDepositModal">
                                    Huỷ Nạp tiền
                                </button>

                                <approve-deposit-modal v-bind:transaction="transaction"
                                                       @updateTransaction="updateTransaction"/>
                                <cancel-deposit-modal v-bind:transaction="transaction"
                                                      @updateTransaction="updateTransaction"/>
                            </div>
                        </div>
                    </div>
                    <div class="card"
                         v-else-if="transaction.type == 'WITHDRAW' && ['CREATED', 'PROCESSING'].includes(transaction.status)">
                        <div class="header">
                            <h2>
                                HỖ TRỢ CSKH
                            </h2>
                        </div>
                        <div class="body table-responsive">
                            <div>
                                <button type="button" class="btn btn-block btn-lg btn-success waves-effect"
                                        data-toggle="modal" data-target="#approveWithdrawModal">
                                    Duyệt Rút tiền
                                </button>
                                <button type="button" class="btn btn-block btn-lg btn-danger waves-effect m-t-15"
                                        data-toggle="modal" data-target="#cancelWithdrawModal">
                                    Huỷ Rút tiền
                                </button>

                                <approve-withdraw-modal v-bind:transaction="transaction"
                                                        @updateTransaction="updateTransaction"/>
                                <cancel-withdraw-modal v-bind:transaction="transaction"
                                                       @updateTransaction="updateTransaction"/>
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
    import {getTransaction} from '../../models/transaction'
    import {showDialog} from '../../utils/dialog'
    import ApproveDepositModal from "../modal/ApproveDepositModal"
    import CancelDepositModal from "../modal/CancelDepositModal"
    import ApproveWithdrawModal from "../modal/ApproveWithdrawModal"
    import CancelWithdrawModal from "../modal/CancelWithdrawModal"

    export default {
        name: "TransactionEdit",
        components: {ApproveDepositModal, CancelDepositModal, ApproveWithdrawModal, CancelWithdrawModal},
        data() {
            return {
                errors: {},
                transaction: {
                    user: {},
                    target: {},
                    info: {
                        bank_id: '',
                        bank_name: '',
                        bank_branch_id: '',
                        bank_branch: '',
                        bank_account_name: '',
                        bank_account: '',
                        service_bank_name: '',
                        service_bank_branch: '',
                        service_bank_account: '',
                        service_bank_account_name: '',
                        note: '',
                    }
                }
            };
        },

        created() {
            this.fetch();
        },

        methods: {
            fetch() {
                const {id} = this.$route.params;

                axios.all([
                    getTransaction(id),
                ]).then(axios.spread((first_response) => {
                    this.transaction = first_response.data.data.transaction;
                })).catch(errors => {
                    if (errors.response.status == 404) {
                        this.$router.push('/404');
                    }
                });
            },

            updateTransaction(type, transaction) {
                console.log(type);
                console.log(transaction);

                this.transaction = transaction;
            },
        }
    }
</script>

<style scoped>

</style>
