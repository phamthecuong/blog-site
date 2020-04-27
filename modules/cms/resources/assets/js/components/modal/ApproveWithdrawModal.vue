<template>
    <div class="modal fade" id="approveWithdrawModal" tabindex="-1" role="dialog" style="display: none;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Duyệt Rút tiền</h4>
                </div>
                <div class="modal-body">
                    <div class="row clearfix">
                        <div class="col-sm-12">
                            Bạn chắc chắn muốn thực hiện chức năng này?
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-link waves-effect" @click="withdraw()">CẬP NHẬT</button>
                    <button type="button" class="btn btn-link waves-effect" data-dismiss="modal">HUỶ</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {withdraw} from '../../models/wallet'
    import {showDialog} from '../../utils/dialog'

    export default {
        name: "ApproveWithdrawModal",

        props: ['transaction'],

        data() {
            return {};
        },

        created() {

        },

        methods: {
            withdraw(e) {
                const that = this;

                const formData = new FormData();

                withdraw(that.transaction.id, formData).then(({data}) => {
                    $('#approveWithdrawModal').modal('hide');

                    if (data.success == false) {
                        showDialog('error', 'Thông báo', data.error.message);
                    } else {
                        that.$emit('updateTransaction', 'withdraw', data.data.transaction);

                        showDialog('info', 'Thông báo', data.message);
                    }
                }).catch(({response}) => this.errors = response.data.errors);

                //e.preventDefault();
            },
        }
    }
</script>

<style scoped>

</style>
