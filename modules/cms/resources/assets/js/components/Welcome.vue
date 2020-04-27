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
                        <li class="active">Tổng quan</li>
                    </ol>
                </div>
            </div>
        </div>

        <div class="container-fluid">
            <div class="row clearfix">
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div class="info-box bg-light-green hover-expand-effect">
                        <div class="icon">
                            <i class="material-icons">insert_chart</i>
                        </div>
                        <div class="content">
                            <div class="text">CHỨNG CHỈ QUỸ</div>
                            <div class="number count-to">{{data.fund_count}}</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div class="info-box bg-cyan hover-expand-effect">
                        <div class="icon">
                            <i class="material-icons">monetization_on</i>
                        </div>
                        <div class="content">
                            <div class="text">GIAO DỊCH NẠP TIỀN</div>
                            <div class="number count-to">{{data.transaction_deposit_count}}</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div class="info-box bg-pink hover-expand-effect">
                        <div class="icon">
                            <i class="material-icons">attach_money</i>
                        </div>
                        <div class="content">
                            <div class="text">GIAO DỊCH RÚT TIỀN</div>
                            <div class="number count-to">{{data.transaction_withdraw_count}}</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div class="info-box bg-orange hover-expand-effect">
                        <div class="icon">
                            <i class="material-icons">person_add</i>
                        </div>
                        <div class="content">
                            <div class="text">NGƯỜI DÙNG</div>
                            <div class="number count-to">{{data.user_count}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>

</template>

<script>
    import axios from "axios";
    import {getDashboard} from "../models/admin";

    export default {
        name: "Welcome",
        title: 'Trang chủ',

        data() {
            return {
                data: {
                    fund_count: 0,
                    transaction_deposit_count: 0,
                    transaction_withdraw_count: 0,
                    user_count: 0,
                }
            };
        },

        created() {
            this.fetch();
        },

        methods: {
            fetch() {
                axios.all([
                    getDashboard({})
                ]).then(axios.spread((first_response) => {
                    this.data = first_response.data.data.data;
                }));
            },
        }
    }
</script>

<style scoped>

</style>
