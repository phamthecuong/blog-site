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
                        <li class="active">Quản lý trang</li>
                    </ol>
                </div>
            </div>

            <div class="card">

                <div class="body">
                    <form method="get" class="form-inline">
                        <div class="row clearfix">
                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 m-b-0">
                                <div class="form-group m-0">
                                    <div class="form-line">
                                        <label>Tiêu đề</label>
                                        <input type="text" class="form-control" name="title" v-on:keyup="searchEvent"
                                               placeholder="Nhập tiêu đề bài viết" value=""/>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 m-b-0">
                                <div class="form-group">
                                    <div class="form-line">
                                        <label>Trạng thái</label>
                                        <select name="status" class="form-control" title="Chọn trạng thái"
                                                @change="searchEvent">
                                            <option value="-1">Tất cả</option>
                                            <option value="1">Hoạt động</option>
                                            <option value="0">Không hoạt động</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="body table-responsive">
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tiêu đề</th>
                                    <th>Thời gian tạo</th>
                                    <th width="120">Trạng thái</th>
                                    <th width="100"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item in pages">
                                    <td>
                                        {{item.id}}
                                    </td>
                                    <td>
                                        <a :href="item.url" target="_blank">{{item.title}}</a>
                                    </td>
                                    <td>{{item.created_at}}</td>
                                    <td>
                                        <span v-if="item.status == 1" class="font-bold col-teal">Hoạt động</span>
                                        <span v-else class="font-bold col-pink">Không hoạt động</span>
                                    </td>
                                    <td class="text-right">
                                        <router-link class="item-tool" :to="{path: '/page/'+item.id}">
                                            <i class="material-icons">edit</i>
                                        </router-link>
                                        <a href="#" class="item-tool" @click="report(item.id)">
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
            <router-link class="item-tool" :to="{path: '/page/create'}">
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
    import {getPages, deletePage} from '../../models/page'

    export default {
        name: "PageList",

        data() {
            return {
                search: {
                    title: '',
                    status: -1
                },
                pages: [],
                categories: [],
                page: 1,
                pageCount: 1,
                pageLimit: 25
            };
        },

        created() {
            console.info('Fuck...');

            this.fetch();
        },

        methods: {
            fetch(page = 1) {
                axios.all([
                    getPages({
                        page: page
                    })
                ]).then(axios.spread((first_response) => {
                    this.pages = first_response.data.data;
                    this.pageCount = first_response.data.meta.last_page;
                }));
            },

            searchEvent({target}) {
                const that = this;

                switch (target.name) {
                    case 'title':
                        that.search.title = target.value;

                        break;
                    case 'status':
                        that.search.status = target.value;

                        break;
                }

                getPages({
                    title: that.search.title,
                    status: that.search.status
                }).then(response => {
                    this.pages = response.data.data;
                    this.pageCount = response.data.meta.last_page;
                });
            },

            report(id) {
                const that = this;

                confirmDialog('Xác nhận', 'Bạn chắc chắn muốn xóa?', function () {
                    deletePage(id).then(response => {
                        that.pages = that.pages.filter(item => item.id !== id);
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>