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
                        <li class="active">Quản lý Chứng chỉ quỹ</li>
                    </ol>
                </div>
            </div>

            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="body table-responsive">
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th width="100">ID</th>
                                    <th width="100">Mã CCQ</th>
                                    <th>Tên CCQ</th>
                                    <th width="200">Lợi nhuận/năm (%)</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="fund in funds">
                                    <td>{{fund.id}}</td>
                                    <td>{{fund.code}}</td>
                                    <td>
                                        <a :href="fund.link" target="_blank">{{fund.name}}</a>
                                    </td>
                                    <td>{{fund.rate}}</td>
                                    <td class="text-right">
                                        <router-link class="item-tool" :to="{path: '/fund/'+fund.id}">
                                            <i class="material-icons">edit</i>
                                        </router-link>
                                        <a href="#" class="item-tool" @click="report(fund.id)">
                                            <i class="material-icons">delete</i>
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <div class="text-right">
                                <paginate
                                    v-model="page"
                                    :page-count="pageCount"
                                    :click-handler="fetch"
                                    :prev-text="'Trang trước'"
                                    :next-text="'Trang sau'"
                                    :container-class="'pagination'">
                                </paginate>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="btn-create-new">
            <router-link class="item-tool" :to="{path: '/fund/create'}">
                <button type="button" class="btn bg-red btn-circle-lg waves-effect waves-circle waves-float">
                    <i class="material-icons">add</i>
                </button>
            </router-link>
        </div>
    </section>

</template>

<script>
    import axios from 'axios'
    import {confirmDialog} from '../../utils/dialog'
    import {getFunds, deleteFund} from '../../models/fund'

    export default {
        name: "FundList",

        data() {
            return {
                search: {
                    name: '',
                    status: -1
                },
                funds: [],
                page: 1,
                pageCount: 1,
                pageLimit: 25
            };
        },

        created() {
            this.fetch();
        },

        methods: {
            fetch(page = 1) {
                axios.all([
                    getFunds({
                        page: page
                    })
                ]).then(axios.spread((first_response) => {
                    this.funds = first_response.data.data.funds;
                    this.pageCount = first_response.data.data.meta_data.last_page;
                }));
            },

            searchEvent({target}) {
                const that = this;

                switch (target.name) {
                    case 'name':
                        that.search.name = target.value;

                        break;
                }

                getFunds({
                    name: that.search.name,
                }).then(response => {
                    this.funds = first_response.data.data.funds;
                    this.pageCount = first_response.data.data.meta_data.last_page;
                });
            },

            report(id) {
                const that = this;

                confirmDialog('Xác nhận', 'Bạn chắc chắn muốn xóa?', function () {
                    deleteFund(id).then(response => {
                        that.funds = that.funds.filter(item => item.id !== id);
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>
