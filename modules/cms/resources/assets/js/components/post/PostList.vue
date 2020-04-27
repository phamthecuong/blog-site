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
                        <li class="active">Quản lý bài viết</li>
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
                                        <label>Danh mục</label>
                                        <select name="category_id" class="form-control" title="Chọn danh mục"
                                                @change="searchEvent">
                                            <option value="-1">Tất cả</option>
                                            <template v-for="category in categories">
                                                <option v-bind:value="category.id">
                                                    {{category.name}}
                                                </option>

                                                <option v-for="sub_category in category.categories"
                                                        v-bind:value="sub_category.id">
                                                    |----- {{sub_category.name}}
                                                </option>
                                            </template>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 m-b-0">
                                <div class="form-group">
                                    <div class="form-line">
                                        <label>Trạng thái</label>
                                        <select name="is_active" class="form-control" title="Chọn trạng thái"
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
                                    <th width="80">Hình ảnh</th>
                                    <th>ID</th>
                                    <th>Tiêu đề</th>
                                    <th>Danh mục</th>
                                    <th>Thời gian tạo</th>
                                    <th width="120">Trạng thái</th>
                                    <th width="100"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="post in posts">
                                    <td>
                                        <img :src="post.image_url" style="width: 100%"/>
                                    </td>
                                    <td>
                                        {{post.id}}<br/>
                                        <small class="col-blue-grey">{{post.eid}}</small>
                                    </td>
                                    <td>
                                        <a :href="post.url" target="_blank">{{post.title}}</a>
                                    </td>
                                    <td>{{post.category.name}}</td>
                                    <td>{{post.created_at}}</td>
                                    <td>
                                        <span v-if="post.is_active == 1" class="font-bold col-teal">Hoạt động</span>
                                        <span v-else class="font-bold col-pink">Không hoạt động</span>
                                    </td>
                                    <td class="text-right">
                                        <router-link class="item-tool" :to="{path: '/post/'+post.id}">
                                            <i class="material-icons">edit</i>
                                        </router-link>
                                        <a href="#" class="item-tool" @click="report(post.id)">
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
            <router-link class="item-tool" :to="{path: '/post/create'}">
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
    import {getPosts, deletePost} from '../../models/post'
    import {getPostCategories} from '../../models/post.category'

    export default {
        name: "PostList",

        data() {
            return {
                search: {
                    title: '',
                    category_id: -1,
                    type: -1,
                    is_active: -1
                },
                posts: [],
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
                    getPosts({
                        page: page
                    }),
                    getPostCategories({
                        parent_id: 0
                    })
                ]).then(axios.spread((first_response, second_response) => {
                    this.posts = first_response.data.data.posts;
                    this.pageCount = first_response.data.data.meta_data.last_page;

                    this.categories = second_response.data.data.post_categories;

                    setTimeout(() => {
                        $('select[name=category_id]').selectpicker("refresh");
                    }, 1000);
                }));
            },

            searchEvent({target}) {
                const that = this;

                switch (target.name) {
                    case 'title':
                        that.search.title = target.value;

                        break;
                    case 'category_id':
                        that.search.category_id = target.value;

                        break;
                    case 'type':
                        that.search.type = target.value;

                        break;
                    case 'is_active':
                        that.search.is_active = target.value;

                        break;
                }

                getPosts({
                    title: that.search.title,
                    category_id: that.search.category_id,
                    type: that.search.type,
                    is_active: that.search.is_active
                }).then(response => {
                    this.posts = response.data.data.posts;
                    this.pageCount = response.data.data.meta_data.last_page;
                });
            },

            report(id) {
                const that = this;

                confirmDialog('Xác nhận', 'Bạn chắc chắn muốn xóa?', function () {
                    deletePost(id).then(response => {
                        that.posts = that.posts.filter(item => item.id !== id);
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>
