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
                            <router-link :to="{ name: 'get_targets' }">
                                Quản lý Gói đầu tư
                            </router-link>
                        </li>
                        <li class="active">{{target.name}}</li>
                    </ol>
                </div>
            </div>

            <div class="row clearfix">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h5>
                                THÔNG TIN GÓI ĐẦU TƯ
                            </h5>
                        </div>
                        <div class="body table-responsive">
                            <form class="form-horizontal" id="create_form" method="POST" encType="multipart/form-data"
                                  @submit.prevent="onSubmit">
                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Tên gói (*)</label>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div v-bind:class="[errors.name?'form-line focused error':'form-line']">
                                                <input type="text" class="form-control" name="title"
                                                       v-model="target.name" @input="addEvent"
                                                       placeholder="Tên gói" autocomplete="off"/>
                                            </div>
                                            <div class="help-info">Tối thiểu 3, tối đa 255 ký tự</div>
                                            <label class="error" v-if="errors.name">{{ errors.name }}</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Mô tả</label>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div
                                                v-bind:class="[errors.description?'form-line focused error':'form-line']">
                                                <textarea name="description" class="form-control" rows="4"
                                                          @input="addEvent"
                                                          placeholder="Mô tả" v-model="target.description"></textarea>
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
                                        <label class="form-label">Số tiền tối đa</label>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="max_deposit_amount"
                                                       @input="addEvent"
                                                       v-model="target.max_deposit_amount"
                                                       placeholder="Số tiền tối đa"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Số tiền rút tối thiểu</label>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="withdrawal_condition"
                                                       @input="addEvent"
                                                       v-model="target.withdrawal_condition"
                                                       placeholder="Số tiền rút tối thiểu"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 text-right">
                                        <label class="form-label">Lợi nhuận/năm</label>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                {{target.rate}}%
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Sắp xếp</label>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="order"
                                                       @input="addEvent"
                                                       v-model="target.order"
                                                       placeholder="Sắp xếp"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Ảnh đại diện</label>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <label class="form-label">
                                                <span class="col-teal">Click để đăng ảnh</span>

                                                <div id="image_preview" class="box-card" style="width: 150px;">
                                                    <div class="box-card--content bg-img-default image_preview_content"
                                                         v-bind:style="{ backgroundImage: 'url(' + target.image_url + ')' }">
                                                    </div>
                                                </div>

                                                <input type="file" name="image" class="hidden" @change="addEvent"/>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Icon</label>
                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <label class="form-label">
                                                <span class="col-teal">Click để đăng ảnh</span>

                                                <div class="box-card" style="width: 50px;">
                                                    <div class="box-card--content bg-img-default image_preview_content"
                                                         v-bind:style="{ backgroundImage: 'url(' + target.icon_url + ')' }">
                                                    </div>
                                                </div>

                                                <input type="file" name="icon" class="hidden" @change="addEvent"/>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">

                                    </div>
                                    <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <input type="checkbox" id="is_active" class="filled-in" name="is_active"
                                                   @change="addEvent"
                                                   v-model="target.is_active"/>
                                            <label for="is_active">Trạng thái</label>
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
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h5>
                                THÔNG TIN CHỨNG CHỈ QUỸ
                            </h5>
                        </div>
                        <div class="body table-responsive">
                            <div class="text-right">
<!--                                <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#createTargetFund">Thêm CCQ</button>-->
                                <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" v-on:click="showCreate" >Thêm CCQ</button>
                            </div>
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th width="100">Mã CCQ</th>
                                    <th width="100">Phân bổ</th>
                                    <th width="100"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="fund in target.funds">
                                    <td>
                                        <b>{{fund.code}}</b>
                                    </td>
                                    <td>{{fund.percent}}%</td>
                                    <td>
                                        <div class="text-right">
                                            <a href="#" class="item-tool" data-toggle="modal"
                                               :data-target="`#updateTargetFund`+fund.code+`Modal`">
                                                <i class="material-icons">edit</i>
                                            </a>
                                            <a href="#" class="item-tool" @click="deleteFund(fund.id)">
                                                <i class="material-icons">delete</i>
                                            </a>
                                        </div>

                                        <update-target-fund-modal v-bind:target="target" v-bind:fund="fund"
                                                                  @updateTargetFund="updateTargetFund"/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <create-target-fund-modal v-bind:percent="total_percent" v-bind:target="target" v-bind:targetFunds="target.funds"
                                @reloadTargetFundList="fetch"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h5>
                                MÔ TẢ GÓI
                            </h5>
                        </div>
                        <div class="body table-responsive">
                            <div class="text-right">
                                <button type="button" class="btn btn-primary btn-sm">Thêm Mô tả</button>
                            </div>
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th width="80">Hình ảnh</th>
                                    <th>Mô tả</th>
                                    <th width="100"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="summary in target.summaries">
                                    <td>
                                        <img :src="summary.icon_url" style="width: 100%"/>
                                    </td>
                                    <td>{{summary.title}}</td>
                                    <td class="text-right">
                                        <a href="#" class="item-tool" @click="deleteFund(fund.id)">
                                            <i class="material-icons">edit</i>
                                        </a>
                                        <a href="#" class="item-tool" @click="deleteSummary(summary.id)">
                                            <i class="material-icons">delete</i>
                                        </a>
                                    </td>
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
    import {getTarget, updateTarget, deleteTargetFund} from '../../models/target'
    import {confirmDialog, showDialog} from "../../utils/dialog";
    import UpdateTargetFundModal from "../modal/UpdateTargetFundModal";
    import CreateTargetFundModal from "../modal/CreateTargetFundModal";

    export default {
        name: "TargetEdit",
        components: {UpdateTargetFundModal, CreateTargetFundModal},
        data() {
            return {
                errors: {
                    name: '',
                },
                target: {},
                total_percent: 0
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
                    getTarget(id)
                ]).then(axios.spread((first_response) => {

                    $.each(first_response.data.data.target.funds, function(key, value) {
                        that.total_percent += value.percent;
                    });

                    this.target = first_response.data.data.target;

                })).catch(errors => {
                    console.error(errors);
                });
            },
            showCreate() {
                if (parseInt(this.total_percent) === 100) {
                    showDialog('error', 'Thông báo', 'Gói đầu tư này đã không còn chỗ trống phân bổ');
                } else {
                    $('#createTargetFund').modal('show');
                }
            },
            addEvent({target}) {
                const that = this;

                switch (target.name) {
                    case 'image':
                        const reader = new FileReader();

                        const images = target.files;

                        if (images.length == 0) {
                            break;
                        }

                        const image = images[0];

                        that.target.image = image;

                        reader.onload = function (e) {
                            that.target.image_url = e.target.result;
                        };

                        if (/\.(jpe?g|png|gif)$/i.test(image.name)) {
                            reader.readAsDataURL(image);
                        }

                        break;

                    case 'icon':
                        const readerIcon = new FileReader();

                        const icons = target.files;

                        if (icons.length == 0) {
                            break;
                        }

                        const icon = icons[0];

                        that.target.icon = icon;

                        readerIcon.onload = function (e) {
                            that.target.icon_url = e.target.result;
                        };

                        if (/\.(jpe?g|png|gif)$/i.test(icon.name)) {
                            readerIcon.readAsDataURL(icon);
                        }

                        break;
                }
            },

            onSubmit(e) {
                $('#create_form button[type=submit]').attr('disabled', 'disabled');

                if (!this.isValid()) {
                    window.scrollTo(0, 0);

                    return false;
                }

                const formData = new FormData();

                formData.append('name', this.target.name);
                formData.append('description', this.target.description);
                formData.append('max_deposit_amount', this.target.max_deposit_amount);
                formData.append('withdrawal_condition', this.target.withdrawal_condition);
                formData.append('order', this.target.order);
                formData.append('image', this.target.image != undefined ? this.target.image : '');
                formData.append('icon', this.target.icon != undefined ? this.target.icon : '');
                formData.append('is_active', this.target.is_active ? 1 : 0);

                updateTarget(this.target.id, formData).then(({data}) => {
                    $('#create_form button[type=submit]').removeAttr('disabled');

                    if (data.success == true) {
                        this.$router.push('/target');

                        return;
                    }

                    const errors = data.error.errors;
                    if (errors.hasOwnProperty('name')) {
                        that.errors.name = errors.name[0];
                    }

                    showDialog('error', 'Thông báo', data.error.message);
                }).catch(({response}) => this.errors = response.data.errors);

                e.preventDefault();
            },

            deleteFund(id) {
                const that = this;

                confirmDialog('Xác nhận', 'Bạn chắc chắn muốn xóa?', function () {

                    deleteTargetFund(that.target.id, id).then(({data}) => {
                        if (data.success) {
                            showDialog('success', 'Thông báo', 'Xoá thành công');
                            that.fetch();
                        } else {
                            showDialog('error', 'Thông báo', data.message);
                        }
                    }).catch(function (response) {
                        console.log('errors', response);
                    });

                });
            },

            deleteSummary(id) {
                const that = this;

                confirmDialog('Xác nhận', 'Bạn chắc chắn muốn xóa?', function () {

                });
            },

            isValid() {
                let is_valid = true;

                if (!this.target.name) {
                    this.errors.name = "Vui lòng nhập tên gói đầu tư.";

                    is_valid = false;
                }

                return is_valid;
            },

            updateTargetFund(target) {
                console.log('************');
                console.log(target);

                this.target = target;
            },
        }
    }
</script>

<style scoped>

</style>
