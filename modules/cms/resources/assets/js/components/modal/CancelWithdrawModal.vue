<template>
    <div class="modal fade" id="cancelWithdrawModal" tabindex="-1" role="dialog" style="display: none;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Huỷ Rút tiền</h4>
                </div>
                <div class="modal-body">
                    <div class="row clearfix">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <div class="form-line">
                                    <label>Nhập lý do huỷ giao dịch</label>
                                    <input type="text" name="note" class="form-control"
                                           placeholder="Lý do huỷ" v-model="note"
                                           @input="addEvent"/>
                                </div>
                                <label class="error" v-if="errors.note">{{ errors.note }}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-link waves-effect" @click="withdrawCancel()">CẬP NHẬT</button>
                    <button type="button" class="btn btn-link waves-effect" data-dismiss="modal">HUỶ</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {deposit, withdrawCancel} from '../../models/wallet'
    import {showDialog} from '../../utils/dialog'

    export default {
        name: "CancelWithdrawModal",

        props: ['transaction'],

        data() {
            return {
                errors: {
                    note: ''
                },
                note: ''
            };
        },

        created() {

        },

        methods: {
            addEvent({target}) {
                const that = this;

                switch (target.name) {
                    case 'note':
                        that.note = target.value;

                        break;
                }
            },

            withdrawCancel(e) {
                if (!this.isValid()) {
                    window.scrollTo(0, 0);

                    return false;
                }

                const that = this;

                const formData = new FormData();

                formData.append('note', this.note);

                withdrawCancel(that.transaction.id, formData).then(({data}) => {
                    $('#cancelWithdrawModal').modal('hide');

                    if (data.success == false) {
                        showDialog('error', 'Thông báo', data.error.message);
                    } else {
                        that.$emit('updateTransaction', 'cancel_withdraw', data.data.transaction);

                        showDialog('info', 'Thông báo', data.message);
                    }
                }).catch(({response}) => this.errors = response.data.errors);

                //e.preventDefault();
            },

            isValid() {
                let is_valid = true;

                if (!this.note || this.note == '') {
                    this.errors.note = "Vui lòng nhập lý do huỷ.";

                    is_valid = false;
                }

                return is_valid;
            }
        }
    }
</script>

<style scoped>

</style>
