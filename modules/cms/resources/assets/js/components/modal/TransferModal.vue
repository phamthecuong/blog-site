<template>
    <div class="modal fade" id="transferModal" tabindex="-1" role="dialog" style="display: none;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Chuyển tiền</h4>
                </div>
                <div class="modal-body">
                    <div class="row clearfix">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <div class="form-line">
                                    <input type="text" name="transfer_amount" class="form-control"
                                           placeholder="Nhập số tiền cần chuyển" v-model="transfer_info.amount"
                                           @input="addEvent"/>
                                </div>
                                <label class="error" v-if="errors.amount">{{ errors.amount }}</label>
                            </div>

                            <div class="form-group">
                                <div class="form-line">
                                    <input type="text" name="transfer_user" class="form-control"
                                           placeholder="Nhập taì khoản người nhận" v-model="transfer_info.user_name"
                                           @input="addEvent"/>
                                </div>
                                <label class="error" v-if="errors.amount">{{ errors.user_name }}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-link waves-effect" @click="transfer()">CẬP NHẬT</button>
                    <button type="button" class="btn btn-link waves-effect" data-dismiss="modal">THOÁT</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {transfer} from '../../models/wallet'
    import {showDialog} from '../../utils/dialog'

    export default {
        name: "TransferModal",

        props: ['user'],

        data() {
            return {
                errors: {
                    amount: '',
                    user_name: ''
                },
                transfer_info: {
                    amount: '',
                    user_name: ''
                }
            };
        },

        created() {

        },

        methods: {
            addEvent({target}) {
                const that = this;

                switch (target.name) {
                    case 'transfer_amount':
                        that.transfer_info.amount = target.value;

                        break;
                    case 'transfer_user':
                        that.transfer_info.user_name = target.value;

                        break;
                }
            },

            transfer(e) {
                if (!this.isValid()) {
                    window.scrollTo(0, 0);

                    return false;
                }

                const that = this;

                const formData = new FormData();

                formData.append('amount', that.transfer_info.amount);
                formData.append('user_from_name', that.user.name);
                formData.append('user_to_name', that.transfer_info.user_name);

                transfer(formData).then(({data}) => {
                    $('#transferModal').modal('hide');

                    that.$emit('updateAmount', 'transfer', that.transfer_info.amount);

                    showDialog('info', 'Thông báo', data.message);
                }).catch(({response}) => this.errors = response.data.errors);

                //e.preventDefault();
            },

            isValid() {
                let is_valid = true;

                if (!this.transfer_info.amount) {
                    this.errors.amount = "Vui lòng nhập số tiền cần chuyển.";

                    is_valid = false;
                }

                if (!this.transfer_info.user_name) {
                    this.errors.user_name = "Vui lòng nhập tài khoản người nhận.";

                    is_valid = false;
                }

                return is_valid;
            }
        }
    }
</script>

<style scoped>

</style>