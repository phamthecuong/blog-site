<template>
    <div class="modal fade" :id="`updateTargetFund`+fund.code+`Modal`" tabindex="-1" role="dialog"
         style="display: none;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Cập nhật CCQ {{fund.code}}</h4>
                </div>
                <div class="modal-body">
                    <div class="row clearfix">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <div class="form-line">
                                    <label>Phần trăm phân bổ</label>
                                    <input type="text" name="percent" class="form-control"
                                           placeholder="Phần trăm phân bổ" v-model="fundInfo.percent"
                                           @input="addEvent"/>
                                </div>
                                <label class="error" v-if="errors.percent">{{ errors.percent }}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-link waves-effect" @click="updateFund()">CẬP NHẬT</button>
                    <button type="button" class="btn btn-link waves-effect" data-dismiss="modal">HUỶ</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getTarget, updateTargetFund} from '../../models/target'
    import {showDialog} from '../../utils/dialog'
    import axios from "axios";

    export default {
        name: "UpdateTargetFundModal",

        props: ['target', 'fund'],

        data() {
            return {
                errors: {
                    percent: ''
                },
                fundInfo: {
                    percent: ''
                }
            };
        },

        created() {
            this.fetch();
        },

        methods: {
            fetch() {
                this.fundInfo.percent = this.fund.percent;
            },

            addEvent({target}) {
                const that = this;

                switch (target.name) {
                    case 'note':
                        that.note = target.value;

                        break;
                }
            },

            updateFund(e) {
                if (!this.isValid()) {
                    window.scrollTo(0, 0);

                    return false;
                }

                const that = this;

                const formData = new FormData();

                formData.append('percent', this.fundInfo.percent);

                updateTargetFund(that.target.id, that.fund.id, formData).then(({data}) => {
                    const modalId = '#updateTargetFund' + that.fund.code + 'Modal';

                    $(modalId).modal('hide');

                    if (data.success == false) {
                        showDialog('error', 'Thông báo', data.error.message);
                    } else {
                        that.$emit('updateTargetFund', data.data.target);

                        showDialog('info', 'Thông báo', data.message);
                    }
                }).catch(({response}) => this.errors = response.data.errors);

                //e.preventDefault();
            },

            isValid() {
                let is_valid = true;

                if (!this.fundInfo.percent) {
                    this.errors.percent = "Vui lòng nhập Phần trăm phân bổ.";

                    is_valid = false;
                }

                return is_valid;
            }
        }
    }
</script>

<style scoped>

</style>
