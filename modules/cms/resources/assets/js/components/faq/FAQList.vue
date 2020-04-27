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
                        <li class="active">Quản lý câu hỏi</li>
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
                                    <th>Câu hỏi</th>
                                    <th width="120">Sắp xếp</th>
                                    <th width="100"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="faq in faqs">
                                    <td>{{faq.question}}</td>
                                    <td>{{faq.order}}</td>
                                    <td class="text-right">
                                        <router-link class="item-tool" :to="{path: '/faq/'+faq.id}">
                                            <i class="material-icons">edit</i>
                                        </router-link>
                                        <a href="#" class="item-tool" @click="report(faq.id)">
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
            <router-link class="item-tool" :to="{path: '/faq/create'}">
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
    import {getFAQs, deleteFAQ} from '../../models/faq'

    export default {
        name: "FAQList",

        data() {
            return {
                faqs: [],
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
                    getFAQs({
                        page: page
                    })
                ]).then(axios.spread((first_response) => {
                    this.faqs = first_response.data.data;
                    this.pageCount = first_response.data.meta.last_page;
                }));
            },

            report(id) {
                const that = this;

                confirmDialog('Xác nhận', 'Bạn chắc chắn muốn xóa?', function () {
                    deleteFAQ(id).then(response => {
                        that.faqs = that.faqs.filter(item => item.id !== id);
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>