<template>
    <div class="modal fade" id="createTargetFund" tabindex="-1" role="dialog"
         style="display: none;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Thêm mới CCQ</h4>
                </div>
                <div class="modal-body">
                    <div class="row clearfix">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <div class="form-line">
                                    <label>Lựa chọn CCQ</label>
                                    <select name="fund_id" id="fund_id" class="form-control"
                                            v-model="data.fund_id">
                                        <option value="0" selected>Chọn quỹ đầu tư</option>
                                        <option v-for="(fund, key) in funds" :value="fund.id">{{fund.code}} - {{fund.name}}</option>
                                    </select>
                                </div>
                                <label class="error" v-if="errors.name=='fund_id'">{{errors.message}}</label>
                            </div>
                        </div>
                    </div>
                    <div class="row clearfix">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <div class="form-line">
                                    <label>Phần trăm phân bổ</label>
                                    <input type="text" name="percent" class="form-control"
                                           placeholder="Phần trăm phân bổ" v-model="data.percent"/>
                                </div>
                                <label class="error" v-if="errors.name=='percent'">{{errors.message}}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-link waves-effect" v-on:click="store($event)">TẠO MỚI</button>
                    <button type="button" class="btn btn-link waves-effect" data-dismiss="modal">HUỶ</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import {getTarget, updateTargetFund, storeTargetFund} from '../../models/target'
    import {getFunds} from '../../models/fund'

    import {showDialog} from '../../utils/dialog'
    import axios from "axios";

    export default {
        name: "CreateTargetFundModal",
        props: ['percent', 'target', 'target_funds'],
        data() {
            return {
                errors: {
                    name: '',
                    message: ''
                },
                funds: [],
                funds_except: [],
                data: {
                    percent: null,
                    fund_id: null
                }
            };
        },

        created() {
            this.fetch();
        },

        methods: {
            createFund() {
                console.log('create fund');
            },
            fetch(page = 1) {
                var that = this;

                axios.all([
                    getFunds({
                        page: page,
                        per_page: 1000
                    })
                ]).then(axios.spread((first_response) => {
                    that.funds = that.getFundsNotInTarget(first_response.data.data.funds);

                    that.pageCount = first_response.data.data.meta_data.last_page;

                    that.emitChangeOption();
                }));
            },
            getFundsNotInTarget(funds) {
                let fundTargetId = [];
                var fundTarget = this.target.funds;

                for(let i = 0; i< fundTarget.length ; i++) {
                    fundTargetId.push(this.target.funds[i]['id']);
                }

                var $funds = funds.filter(function($fund)  {
                    return !fundTargetId.includes($fund.id);
                });

                return $funds;
            },
            resetData() {
                this.data.fund_id = 0;
                this.data.percent = '';

                this.errors.name = '';
                this.errors.message = '';
            },
            store(e) {
                e.preventDefault();

                if (!this.isValid()) {
                    return;
                }

                const formData = new FormData();

                formData.append('fund_id', this.data.fund_id);
                formData.append('percent', this.data.percent);
                formData.append('target_id', this.target.id);

                var that = this;
                axios.all([
                    storeTargetFund(that.target.id, formData)
                ]).then(axios.spread((response) => {
                    if (!response.data.success) {
                        showDialog('error', 'Thông báo', response.data.error.message);
                    } else {
                        that.$emit('reloadTargetFundList');
                        showDialog('info', 'Thông báo', 'Thêm mới thành công');
                    }
                    $('#createTargetFund').modal('hide');
                    that.resetData();
                }));
            },

            emitChangeOption() {
                setTimeout(() => {
                    $('select[name=fund_id]').selectpicker("refresh");
                });
            },
            isValid() {
                if (!this.data.fund_id) {
                    this.errors.name = "fund_id";
                    this.errors.message = "Vui lòng nhập Lựa chọn gói đầu tư.";

                    return false;
                }

                if (!this.data.percent) {
                    this.errors.name = "percent";
                    this.errors.message = "Vui lòng nhập Phần trăm phân bổ.";

                    return false;
                } else if (this.percent + parseInt(this.data.percent) > 100) {
                    this.errors.name = "percent";
                    this.errors.message = 'Đã vượt quá quỹ phân bổ cho phép.';

                    return false;
                }

                return true;
            },
        }
    }
</script>

<style scoped>

</style>
