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
                        <li class="active">Quản lý danh mục sản phẩm</li>
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
                                        <label>Danh mục</label>
                                        <input type="text" class="form-control" name="name" v-on:keyup="searchEvent"
                                               placeholder="Nhập danh mục sản phẩm" value=""/>
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
                                    <th>Danh mục</th>
                                    <th>Sắp xếp</th>
                                    <th>Thời gian tạo</th>
                                    <th>Trạng thái</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody v-for="category in categories">
                                <tr>
                                    <td>{{category.id}}</td>
                                    <td>
                                        <a :href="category.url" target="_blank"><b>{{category.name}}</b></a>
                                    </td>
                                    <td><b>{{category.order}}</b></td>
                                    <td>{{category.created_at}}</td>
                                    <td>
                                        <span v-if="category.status == 1" class="font-bold col-teal">Hoạt động</span>
                                        <span v-else class="font-bold col-pink">Không hoạt động</span>
                                    </td>
                                    <td class="text-right">
                                        <router-link class="item-tool" :to="{path: '/product-category/'+category.id}">
                                            <i class="material-icons">edit</i>
                                        </router-link>
                                        <a href="#" class="item-tool" @click="report(category.id)">
                                            <i class="material-icons">delete</i>
                                        </a>
                                    </td>
                                </tr>

                                <tr v-for="sub_category in category.categories">
                                    <td>{{sub_category.id}}</td>
                                    <td>
                                        <a :href="sub_category.url" target="_blank">|----- {{sub_category.name}}</a>
                                    </td>
                                    <td>|----- {{sub_category.order}}</td>
                                    <td>{{sub_category.created_at}}</td>
                                    <td>
                                        <span v-if="sub_category.status == 1"
                                              class="font-bold col-teal">Hoạt động</span>
                                        <span v-else class="font-bold col-pink">Không hoạt động</span>
                                    </td>
                                    <td class="text-right">
                                        <router-link class="item-tool" :to="{path: '/product-category/'+sub_category.id}">
                                            <i class="material-icons">edit</i>
                                        </router-link>
                                        <a href="#" class="item-tool" @click="report(sub_category.id)">
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
            <router-link class="item-tool" :to="{path: '/product-category/create'}">
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
    import {getProductCategories, deleteProductCategory} from '../../models/product.category'

    export default {
        name: "ProductCategoryList",

        data() {
            return {
                search: {
                    name: '',
                    status: -1
                },
                categories: [],
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
                    getProductCategories({
                        parent_id: 0,
                        page: page
                    })
                ]).then(axios.spread((first_response) => {
                    this.categories = first_response.data.data;
                    this.pageCount = first_response.data.meta.last_page;
                }));
            },

            searchEvent({target}) {
                const that = this;

                switch (target.name) {
                    case 'name':
                        that.search.name = target.value;

                        break;
                    case 'status':
                        that.search.status = target.value;

                        break;
                }

                getProductCategories({
                    name: that.search.name,
                    status: that.search.status,
                    parent_id: 0
                }).then(response => {
                    this.categories = response.data.data;
                    this.pageCount = response.data.meta.last_page;
                });
            },

            report(id) {
                const that = this;

                confirmDialog('Xác nhận', 'Bạn chắc chắn muốn xóa?', function () {
                    deleteProductCategory(id).then(response => {
                        that.categories = that.categories.filter(item => item.id !== id);
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>