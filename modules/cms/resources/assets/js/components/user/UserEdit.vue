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
                            <router-link :to="{ name: 'get_users' }">
                                Quản lý Khách hàng
                            </router-link>
                        </li>
                        <li class="active">+{{user.phone}}</li>
                    </ol>
                </div>
            </div>

            <div class="row clearfix">
                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <div class="card profile-card">
                        <div class="profile-header">&nbsp;</div>
                        <div class="profile-body">
                            <div class="image-area">
                                <img v-if="user.profile.avatar_url" :src="user.profile.avatar_url" alt=""
                                     style="width: 100px; height: 100px;"/>
                                <img v-else="user.profile.avatar_url" src="/themes/admin/images/image.png" alt=""
                                     style="width: 100px; height: 100px;"/>
                            </div>
                            <div class="content-area">
                                <h3>+{{user.phone}}</h3>
                                <p>{{user.email}}</p>
                                <p>{{user.profile.fullname}}</p>
                            </div>
                        </div>
                        <div class="profile-footer">
                            <ul>
                                <li>
                                    <span>Số dư</span>
                                    <span>{{ user.account.balance | toCurrency}}</span>
                                </li>
                            </ul>
                            <router-link class="item-tool" :to="{path: '/transaction?phone='+user.phone}">
                                <button class="btn btn-primary btn-lg waves-effect btn-block">LỊCH SỬ GIAO DỊCH</button>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>
                                THÔNG TIN KHÁCH HÀNG
                            </h2>
                        </div>
                        <div class="body table-responsive">
                            <form class="form-horizontal" id="create_form" method="POST"
                                  encType="multipart/form-data" @submit.prevent="onSubmit">
                                <ul class="nav nav-tabs tab-nav-right" role="tablist">
                                    <li role="presentation" class="active">
                                        <a href="#tab_introduction" data-toggle="tab">Thông tin chung</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#tab_card_id" data-toggle="tab">Chứng minh thư</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#tab_bank" data-toggle="tab">Thông tin ngân hàng</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#tab_target" data-toggle="tab">Lịch sử giao dịch</a>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div role="tabpanel" class="tab-pane fade in active in active"
                                         id="tab_introduction">
                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 text-right">
                                                <label class="form-label">Điện thoại</label>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                                <div class="form-group">
                                                    {{user.phone}}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 text-right">
                                                <label class="form-label">Email</label>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                                <div class="form-group">
                                                    {{user.email}}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 text-right">
                                                <label class="form-label">Tên hiển thị</label>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                                <div class="form-group">
                                                    {{user.profile.fullname}}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 text-right">
                                                <label class="form-label">Địa chỉ</label>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                                <div class="form-group">
                                                    {{user.profile.address}}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 text-right">
                                                <label class="form-label">Ngày sinh</label>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                                <div class="form-group">
                                                    {{user.profile.birthday}}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 text-right">
                                                <label class="form-label">Giới tính</label>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                                <div class="form-group">
                                                    <span v-if="user.profile.gender == 1">Nam</span>
                                                    <span v-else-if="user.profile.gender == 2">Nữ</span>
                                                    <span v-else>Chưa xác nhận</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 text-right">
                                                <label class="form-label">Xác thực email</label>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                                <div class="form-group">
                                                    <input type="checkbox" id="is_verify_email" class="filled-in"
                                                           name="is_active"
                                                           @change="addEvent"
                                                           v-model="user.profile.is_verify_email"/>
                                                    <label for="is_verify_email"></label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 text-right">
                                                <label class="form-label">Xác thực điện thoại</label>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                                <div class="form-group">
                                                    <input type="checkbox" id="is_verify_phone" class="filled-in"
                                                           name="is_active"
                                                           @change="addEvent"
                                                           v-model="user.profile.is_verify_phone"/>
                                                    <label for="is_verify_phone"></label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row clearfix">
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 text-right">
                                                <label for="is_active" class="form-label">Trạng thái</label>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                                <div class="form-group">
                                                    <input type="checkbox" id="is_active" class="filled-in"
                                                           name="is_active"
                                                           @change="addEvent"
                                                           v-model="user.is_active"/>
                                                    <label for="is_active"></label>
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
                                    </div>
                                    <div role="tabpanel" class="tab-pane fade" id="tab_card_id">
                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 text-right">
                                                <label class="form-label">CMT</label>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                                <div class="form-group">
                                                    {{user.profile.card_no}}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 text-right">
                                                <label class="form-label">Ngày cấp CMT</label>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                                <div class="form-group">
                                                    {{user.profile.card_iss}}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 text-right">
                                                <label class="form-label">Nơi cấp CMT</label>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                                <div class="form-group" v-if="user.profile.card_iss_province != null">
                                                    {{user.profile.card_iss_province.name}}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 text-right">
                                                <label class="form-label">Ảnh CMT mặt trước</label>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                                <div class="form-group">
                                                    <img v-if="user.profile.card_image_front_url"
                                                         :src="user.profile.card_image_front_url" alt=""
                                                         style="width: 150px;"/>
                                                    <img v-else="user.profile.avatar_url"
                                                         src="/themes/admin/images/image.png"
                                                         alt=""
                                                         style="width: 150px;"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 text-right">
                                                <label class="form-label">Ảnh CMT mặt sau</label>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                                <div class="form-group">
                                                    <img v-if="user.profile.card_image_back_url"
                                                         :src="user.profile.card_image_back_url" alt=""
                                                         style="width: 150px;"/>
                                                    <img v-else="user.profile.avatar_url"
                                                         src="/themes/admin/images/image.png"
                                                         alt=""
                                                         style="width: 150px;"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 text-right">
                                                <label class="form-label">Xác thực CMT</label>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                                <div class="form-group">
                                                    <input type="checkbox" id="is_verify_card" class="filled-in"
                                                           name="is_active"
                                                           @change="addEvent"
                                                           v-model="user.profile.is_verify_card"/>
                                                    <label for="is_verify_card"></label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 text-right">
                                                <label class="form-label">Lý do huỷ các thực CMT</label>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                                <div class="form-group">
                                                    <div class="form-line">
                                                        <input type="text" class="form-control" name="title"
                                                               v-model="user.profile.card_reject_content" @input="addEvent"
                                                               placeholder="Lý do huỷ các thực CMT"/>
                                                    </div>
                                                    <div class="help-info">Tối thiểu 3, tối đa 255 ký tự</div>
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
                                    </div>
                                    <div role="tabpanel" class="tab-pane fade" id="tab_bank">
                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 text-right">
                                                <label class="form-label">Ngân hàng</label>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                                <div class="form-group">
                                                    {{user.profile.bank_name}}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 text-right">
                                                <label class="form-label">Chi nhánh</label>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                                <div class="form-group">
                                                    {{user.profile.bank_branch}}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 text-right">
                                                <label class="form-label">Tên tài khoản</label>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                                <div class="form-group">
                                                    {{user.profile.bank_account_name}}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-5 text-right">
                                                <label class="form-label">Số tài khoản</label>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                                                <div class="form-group">
                                                    {{user.profile.bank_account}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane fade" id="tab_target">

                                        <table class="table table-striped">
                                            <thead>
                                            <tr>
                                                <th>Thông tin giao dịch</th>
                                                <th>Thông tin khách hàng</th>
                                                <th>Gói đầu tư</th>
                                                <th>Trạng thái</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="transaction in transactions">
                                                <td>
                                                      <span v-if="transaction.type == 'DEPOSIT'"
                                                            class="font-bold col-teal">Nạp tiền</span>
                                                    <span v-else-if="transaction.type == 'WITHDRAW'"
                                                          class="font-bold col-pink">Rút tiền</span>
                                                    <p><small>{{transaction.created_at}}</small></p>
                                                    <p><b>ID: </b>{{transaction.id}}</p>
                                                    <p><b>Số tiền: </b>{{transaction.amount | toCurrency}}</p>
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
                                                <td>{{transaction.target.name}}</td>
                                                <td>
                                        <span v-if="transaction.status == 'CREATED'"
                                              class="font-bold">Mới tạo</span>
                                                    <span v-else-if="transaction.status == 'PROCESSING'"
                                                          class="font-bold col-orange">Đang xử lý</span>
                                                    <span v-else-if="transaction.status == 'SUCCESS'"
                                                          class="font-bold col-teal">Thành công</span>
                                                    <span v-else-if="transaction.status == 'CANCEL'"
                                                          class="font-bold col-pink">Đã huỷ</span>
                                                    <span v-else-if="transaction.status == 'FINISHED'"
                                                          class="font-bold col-teal">Hoàn thành</span>
                                                    <span v-else-if="transaction.status == 'FAIL'"
                                                          class="font-bold col-pink">Thất bại</span>
                                                    <span v-else class="font-bold col-pink">Lỗi</span>
                                                </td>
                                                <td class="text-right">
                                                    <a class="item-tool" :href="`/transaction/`+transaction.id"
                                                       target="_blank">
                                                        <i class="material-icons">edit</i>
                                                    </a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>

                                        <div class="text-right">
                                            <paginate
                                                v-model="transactionPage"
                                                :page-count="transactionPageCount"
                                                :click-handler="fetch"
                                                :prev-text="'Trang trước'"
                                                :next-text="'Trang sau'"
                                                :container-class="'pagination'">
                                            </paginate>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                </div>
            </div>
        </div>
    </section>

</template>

<script>
    import axios from 'axios'
    import {getUser, updateUser} from '../../models/user'
    import {getTransactions} from '../../models/transaction'
    import {showDialog} from '../../utils/dialog'

    export default {
        name: "UserEdit",
        title() {
            return `Sửa thông tin ${this.user.phone}`
        },

        data() {
            return {
                errors: {},
                user: {
                    email: '',
                    phone: '',
                    profile: {
                        fullname: '',
                        address: '',
                        birthday: '',
                        gender: '',
                        card_iss: '',
                        card_iss_province: {
                            name: ''
                        },
                        card_image_front_url: '',
                        card_image_back_url: '',
                        card_reject_content: '',
                        is_verify_card: false,
                        is_verify_phone: false,
                        is_verify_email: false,
                    },
                    account: {
                        balance: 0
                    },
                    is_active: 0
                },

                transactions: [],
                transactionPage: 1,
                transactionPageCount: 1,
                transactionPageLimit: 25
            };
        },

        created() {
            this.fetch();
        },

        methods: {
            fetch(page = 1) {
                const {id} = this.$route.params;

                axios.all([
                    getUser(id),
                    getTransactions({
                        page: page,
                        per_page: 5,
                        user_id: id
                    })
                ]).then(axios.spread((first_response, second_response) => {
                    this.user = first_response.data.data.user;
                    this.transactions = second_response.data.data.transactions;
                    this.transactionPageCount = second_response.data.data.meta_data.last_page;
                })).catch(errors => {
                    if (errors.response.status == 404) {
                        this.$router.push('/404');
                    }
                });
            },

            addEvent({target}) {
                console.log(target.name);
            },

            onSubmit(e) {
                if (!this.isValid()) {
                    window.scrollTo(0, 0);

                    return false;
                }

                const formData = new FormData();

                //formData.append('email', this.user.email);
                //formData.append('phone', this.user.phone);
                formData.append('is_verify_card', this.user.profile.is_verify_card ? 1 : 0);
                formData.append('is_verify_phone', this.user.profile.is_verify_phone ? 1 : 0);
                formData.append('is_verify_email', this.user.profile.is_verify_email ? 1 : 0);
                formData.append('card_reject_content', this.user.profile.card_reject_content);
                formData.append('is_active', this.user.is_active ? 1 : 0);
                //formData.append('_method', 'patch');

                updateUser(this.user.id, formData).then(({data}) => {
                    this.$router.push('/user')
                }).catch(({response}) => {
                    console.log(response);

                    this.errors = response.data.errors;

                    showDialog('error', 'Thông báo', response.data.error.message);
                });

                e.preventDefault();
            },

            isValid() {
                let is_valid = true;

                return is_valid;
            }
        }
    }
</script>

<style scoped>

</style>
