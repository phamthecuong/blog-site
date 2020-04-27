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
                            <router-link :to="{ name: 'get_posts' }">
                                Quản lý bài viết
                            </router-link>
                        </li>
                        <li class="active">{{post.title}}</li>
                    </ol>
                </div>
            </div>

            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="body table-responsive">
                            <form class="form-horizontal" id="create_form" method="POST" encType="multipart/form-data"
                                  @submit.prevent="onSubmit">
                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Tiêu đề (*)</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div v-bind:class="[errors.title?'form-line focused error':'form-line']">
                                                <input type="text" class="form-control" name="title"
                                                       v-model="post.title" @input="addEvent"
                                                       placeholder="Tiêu đề"/>
                                            </div>
                                            <div class="help-info">Tối thiểu 3, tối đa 255 ký tự</div>
                                            <label class="error" v-if="errors.title">{{ errors.title }}</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Mô tả (*)</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div v-bind:class="[errors.description?'form-line focused error':'form-line']">
                                                <textarea name="description" class="form-control" rows="4"
                                                          @input="addEvent"
                                                          placeholder="Mô tả" v-model="post.description"></textarea>
                                            </div>

                                            <div class="help-info">Tối thiểu 3 ký tự</div>
                                            <label class="error" v-if="errors.description">
                                                {{ errors.description }}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Danh mục (*)</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div v-bind:class="[errors.category_id?'form-line focused error':'form-line']">
                                                <select name="category_id" class="form-control" @change="addEvent"
                                                        v-model="post.category_id">
                                                    <option value="0">Chọn danh mục</option>
                                                    <template v-for="category in categories">
                                                        <option v-bind:value="category.id">
                                                            {{category.name}}
                                                        </option>

                                                        <option v-for="sub_category in category.categories"
                                                                v-bind:value="sub_category.id"
                                                                :selected="sub_category.id == post.category_id">
                                                            |----- {{sub_category.name}}
                                                        </option>
                                                    </template>
                                                </select>
                                            </div>

                                            <label class="error" v-if="errors.category_id">
                                                {{ errors.category_id }}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Nội dung (*)</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div v-bind:class="[errors.content?'form-line focused error':'form-line']">
                                                <textarea id="post_content" name="content" class="form-control" rows="4"
                                                          @input="addEvent"
                                                          placeholder="Mô tả" v-model="post.content"></textarea>
                                            </div>

                                            <label class="error" v-if="errors.content">
                                                {{ errors.content }}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">SEO Tiêu đề</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="meta_title"
                                                       @input="addEvent"
                                                       v-model="post.meta_title"
                                                       placeholder="SEO Tiêu đề"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">SEO Mô tả</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <textarea name="meta_description" class="form-control" rows="4"
                                                          @input="addEvent" @change="addEvent"
                                                          placeholder="SEO Mô tả"
                                                          v-model="post.meta_description"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">SEO Từ khóa</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                    <textarea name="meta_keywords" class="form-control" rows="4"
                                                              @input="addEvent"
                                                              placeholder="SEO Từ khóa"
                                                              v-model="post.meta_keywords"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 text-right">
                                        <label class="form-label">Ảnh đại diện</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <label class="form-label">
                                                <span class="col-teal">Click để đăng ảnh</span>

                                                <div id="image_preview" class="box-card" style="width: 150px;">
                                                    <div class="box-card--content bg-img-default image_preview_content"
                                                         v-bind:style="{ backgroundImage: 'url(' + post.image_url + ')' }">
                                                    </div>
                                                </div>

                                                <input type="file" name="image" class="hidden" @change="addEvent"/>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">

                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <input type="checkbox" id="is_active" class="filled-in" name="is_active"
                                                   @change="addEvent"
                                                   v-model="post.is_active"/>
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
            </div>
        </div>
    </section>
</template>

<script>
    import axios from 'axios'
    import {loadCKEditor} from '../../utils/ckeditor'
    import {getPost, updatePost} from '../../models/post'
    import {getPostCategories} from '../../models/post.category'

    export default {
        name: "PostEdit",

        data() {
            return {
                errors: {
                    title: '',
                    description: '',
                    content: '',
                    category_id: '',
                },
                post: {
                    title: '',
                    description: '',
                    content: '',
                    category_id: 0,
                    meta_title: '',
                    meta_description: '',
                    meta_keywords: '',
                    image: '',
                    image_medium_url: '',
                    is_active: false
                },
                categories: []
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
                    getPost(id),
                    getPostCategories({
                        parent_id: 0
                    })
                ]).then(axios.spread((first_response, second_response) => {
                    this.post = first_response.data.data.post;

                    this.categories = second_response.data.data.post_categories;

                    loadCKEditor('post_content');

                    setTimeout(() => {
                        $('select[name=category_id]').selectpicker("refresh");
                    }, 1000);
                })).catch(errors => {
                    if (errors.response.is_active == 404) {
                        this.$router.push('/404');
                    }
                });
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

                        that.post.image = image;

                        reader.onload = function (e) {
                            that.post.image_url = e.target.result;
                        };

                        if (/\.(jpe?g|png|gif)$/i.test(image.name)) {
                            reader.readAsDataURL(image);
                        }

                        break;
                }
            },

            onSubmit(e) {
                $('#create_form button[type=submit]').attr('disabled', 'disabled');

                if (window.CKEDITOR) {
                    this.post.content = CKEDITOR.instances['post_content'].getData();
                }

                if (!this.isValid()) {
                    window.scrollTo(0, 0);

                    return false;
                }

                const formData = new FormData();

                formData.append('title', this.post.title);
                formData.append('description', this.post.description);
                formData.append('content', this.post.content);
                formData.append('category_id', this.post.category_id);
                formData.append('meta_title', this.post.meta_title);
                formData.append('meta_description', this.post.meta_description);
                formData.append('meta_keywords', this.post.meta_keywords);
                formData.append('image', this.post.image != undefined ? this.post.image : '');
                formData.append('is_active', this.post.is_active ? 1 : 0);
                // formData.append('_method', 'patch');

                updatePost(this.post.id, formData).then(({data}) => {
                    $('#create_form button[type=submit]').removeAttr('disabled');

                    this.$router.push('/post')
                }).catch(({response}) => this.errors = response.data.errors);

                e.preventDefault();
            },

            isValid() {
                let is_valid = true;

                if (!this.post.title) {
                    this.errors.title = "Vui lòng nhập tiêu đề bài viết.";

                    is_valid = false;
                }

                if (!this.post.description) {
                    this.errors.description = "Vui lòng nhập mô tả bài viết.";

                    is_valid = false;
                }

                if (!this.post.content) {
                    this.errors.content = "Vui lòng nhập nội dung bài viết.";

                    is_valid = false;
                }

                if (this.post.category_id == 0) {
                    this.errors.category_id = "Vui lòng chọn danh mục.";

                    is_valid = false;
                } else {
                    this.errors.category_id = '';
                }

                return is_valid;
            }
        }
    }
</script>

<style scoped>

</style>
