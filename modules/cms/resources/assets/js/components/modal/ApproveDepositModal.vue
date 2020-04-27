<template>
    <div class="modal fade" id="approveDepositModal" tabindex="-1" role="dialog" style="display: none;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Duyệt Nạp tiền</h4>
                </div>
                <div class="modal-body">
                    <div class="row clearfix">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <div v-bind:class="[errors.bank_id?'form-line focused error':'form-line']">
                                    <label>Ngân hàng (*)</label>

                                    <select name="bank_id" class="form-control" @change="addEvent"
                                            v-model="transactionInfo.bank_id">
                                        <option value="">Chọn ngân hàng</option>
                                        <template v-for="bank in banks">
                                            <option v-bind:value="bank.id">
                                                {{bank.name}}
                                            </option>
                                        </template>
                                    </select>
                                </div>

                                <label class="error" v-if="errors.bank_id">
                                    {{ errors.bank_id }}
                                </label>
                            </div>

                            <div class="form-group">
                                <div v-bind:class="[errors.bank_branch_id?'form-line focused error':'form-line']">
                                    <label>Chi nhánh Ngân hàng (*)</label>

                                    <select name="bank_branch_id" class="form-control" @change="addEvent"
                                            v-model="transactionInfo.bank_branch_id">
                                        <option value="">Chọn Chi nhánh</option>
                                        <template v-for="bank_branch in bankBranches">
                                            <option v-bind:value="bank_branch.id">
                                                {{bank_branch.name}}
                                            </option>
                                        </template>
                                    </select>
                                </div>

                                <label class="error" v-if="errors.bank_branch_id">
                                    {{ errors.bank_branch_id }}
                                </label>
                            </div>

                            <div class="form-group">
                                <div class="form-line">
                                    <label>Tên tài khoản ngân hàng (*)</label>
                                    <input type="text" name="bank_account_name" class="form-control"
                                           placeholder="Tên tài khoản" v-model="transactionInfo.bank_account_name"
                                           @input="addEvent"/>
                                </div>
                                <label class="error" v-if="errors.bank_account_name">
                                    {{ errors.bank_account_name }}
                                </label>
                            </div>

                            <div class="form-group">
                                <div class="form-line">
                                    <label>Số tài khoản ngân hàng (*)</label>
                                    <input type="text" name="bank_account" class="form-control"
                                           placeholder="Số tài khoản" v-model="transactionInfo.bank_account"
                                           @input="addEvent"/>
                                </div>
                                <label class="error" v-if="errors.bank_account">
                                    {{ errors.bank_account }}
                                </label>
                            </div>

                            <div class="form-group">
                                <div v-bind:class="[errors.service_bank_id?'form-line focused error':'form-line']">
                                    <label>Ngân hàng thụ hưởng (*)</label>

                                    <select name="service_bank_id" class="form-control" @change="addEvent"
                                            v-model="transactionInfo.service_bank_id">
                                        <option value="">Chọn ngân hàng thụ hưởng</option>
                                        <template v-for="serviceBank in serviceBanks">
                                            <option v-bind:value="serviceBank.id">
                                                {{serviceBank.name}} {{serviceBank.account_number}}
                                            </option>
                                        </template>
                                    </select>
                                </div>

                                <label class="error" v-if="errors.service_bank_id">
                                    {{ errors.service_bank_id }}
                                </label>
                            </div>

                            <div class="form-group">
                                <div class="form-line">
                                    <label>Mô tả giao dịch (*)</label>
                                    <input type="text" name="note" class="form-control"
                                           placeholder="Mô tả" v-model="transactionInfo.note"
                                           @input="addEvent"/>
                                </div>
                                <label class="error" v-if="errors.note">{{ errors.note }}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-link waves-effect" @click="deposit()">CẬP NHẬT</button>
                    <button type="button" class="btn btn-link waves-effect" data-dismiss="modal">HUỶ</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {deposit} from '../../models/wallet'
    import {showDialog} from '../../utils/dialog'
    import axios from "axios";
    import {getBanks, getServiceBanks} from "../../models/bank";

    export default {
        name: "ApproveDepositModal",

        props: ['transaction'],

        data() {
            return {
                errors: {
                    note: '',
                    bank_id: '',
                    bank_branch_id: '',
                    bank_account: '',
                    bank_account_name: '',
                },
                transactionInfo: {
                    note: '',
                    bank_id: '',
                    bank_branch_id: '',
                    bank_account: '',
                    bank_account_name: '',
                    service_bank_id: '',
                },
                banks: [],
                serviceBanks: [],
                bankBranches: []
            };
        },

        created() {
            this.fetch();
        },

        methods: {
            fetch(page = 1) {
                axios.all([
                    getBanks({
                        page: page,
                        per_page: 10000
                    }),
                    getServiceBanks({
                        page: page,
                        per_page: 10000
                    })
                ]).then(axios.spread((first_response, second_response) => {
                    this.banks = first_response.data.data.banks;
                    this.pageCount = first_response.data.data.meta_data.last_page;

                    this.serviceBanks = second_response.data.data.banks;

                    setTimeout(() => {
                        $('select[name=bank_id]').selectpicker("refresh");
                        $('select[name=bank_branch_id]').selectpicker("refresh");
                        $('select[name=service_bank_id]').selectpicker("refresh");
                    }, 1000);
                }));
            },

            addEvent({target}) {
                const that = this;

                switch (target.name) {
                    case 'bank_id':
                        that.transactionInfo.bank_id = target.value;

                        that.setBankBranches(that.transactionInfo.bank_id);

                        break;
                    case 'note':
                        that.transactionInfo.note = target.value;

                        break;
                }
            },

            setBankBranches(bankId) {
                const that = this;
                this.banks.forEach((item) => {
                    if (item.id == bankId) {
                        that.bankBranches = item.branches;

                        setTimeout(() => {
                            $('select[name=bank_branch_id]').selectpicker("refresh");
                        }, 1000);
                    }
                });
            },

            deposit(e) {
                if (!this.isValid()) {
                    window.scrollTo(0, 0);

                    return false;
                }

                const that = this;

                const formData = new FormData();

                formData.append('bank_id', that.transactionInfo.bank_id);
                formData.append('bank_branch_id', that.transactionInfo.bank_branch_id);
                formData.append('bank_account_name', that.transactionInfo.bank_account_name);
                formData.append('bank_account', that.transactionInfo.bank_account);
                formData.append('service_bank_id', that.transactionInfo.service_bank_id);
                formData.append('note', that.transactionInfo.note);

                deposit(that.transaction.id, formData).then(({data}) => {
                    $('#approveDepositModal').modal('hide');

                    if (data.success == false) {
                        showDialog('error', 'Thông báo', data.error.message);
                    } else {
                        that.$emit('updateTransaction', 'deposit', data.data.transaction);

                        //showDialog('info', 'Thông báo', data.error.message);
                    }
                }).catch(({response}) => this.errors = response.data.error.errors);

                //e.preventDefault();
            },

            resetValid() {
                this.errors.bank_id = '';
                this.errors.bank_branch_id = '';
                this.errors.bank_account_name = '';
                this.errors.bank_account = '';
                this.errors.note = '';
                this.errors.service_bank_id = '';
            },

            isValid() {
                this.resetValid();

                let is_valid = true;

                /*if (!this.transactionInfo.bank_id) {
                    this.errors.bank_id = "Vui lòng chọn ngân hàng.";

                    is_valid = false;
                }

                if (!this.transactionInfo.bank_branch_id) {
                    this.errors.bank_branch_id = "Vui lòng chọn chi nhánh ngân hàng.";

                    is_valid = false;
                }

                if (!this.transactionInfo.bank_account_name) {
                    this.errors.bank_account_name = "Vui lòng nhập tên tài khoản ngân hàng.";

                    is_valid = false;
                }

                if (!this.transactionInfo.bank_account) {
                    this.errors.bank_account = "Vui lòng nhập số tài khoản ngân hàng.";

                    is_valid = false;
                }*/

                if (!this.transactionInfo.note) {
                    this.errors.note = "Vui lòng nhập mô tả giao dịch nạp tiền.";

                    is_valid = false;
                }

                if (!this.transactionInfo.service_bank_id) {
                    this.errors.service_bank_id = "Vui lòng chọn ngân hàng thụ hưởng.";

                    is_valid = false;
                }

                return is_valid;
            }
        }
    }
</script>

<style scoped>

</style>
