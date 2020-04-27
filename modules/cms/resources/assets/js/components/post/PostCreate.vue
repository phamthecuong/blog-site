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
                            <router-link :to="{ name: 'post_list' }">
                                Quản lý bài viết
                            </router-link>
                        </li>
                        <li class="active">Thêm bài viết</li>
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
                                        <label class="form-label">Tag</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="tags"
                                                       data-role="tagsinput" @input="addEvent" @change="addEvent"
                                                       v-model="post.tags"/>
                                            </div>
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
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Lượt xem</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="view"
                                                       @input="addEvent"
                                                       v-model="post.view"
                                                       placeholder="Lượt xem"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Youtube ID</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="youtube_id"
                                                       @input="addEvent"
                                                       v-model="post.youtube_id"
                                                       placeholder="Youtube ID"/>
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
                                                         v-bind:style="{ backgroundImage: 'url(' + post.image_medium_url + ')' }">
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
                                            <input type="checkbox" id="status" class="filled-in" name="status"
                                                   @change="addEvent"
                                                   v-model="post.status"/>
                                            <label for="status">Trạng thái</label>
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
    import {loadCKEditor} from '../../utils/ckeditor'
    import {storePost} from '../../models/post'
    import {getPostCategories} from '../../models/post.category'

    export default {
        name: "PostCreate",

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
                    type: 'post',
                    meta_title: '',
                    meta_description: '',
                    meta_keywords: '',
                    view: 0,
                    youtube_id: '',
                    image: '',
                    tags: '',
                    image_medium_url: '',
                    status: false
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

                setTimeout(() => {
                    loadCKEditor('post_content');

                    $('input[name=tags]').on('itemAdded', function (event) {
                        that.post.tags = $('input[name=tags]').val();
                    });

                    $('input[name=tags]').on('itemRemoved', function (event) {
                        that.post.tags = $('input[name=tags]').val();
                    });
                }, 1000);

                getPostCategories({
                    parent_id: 0
                }).then(({data}) => {
                    this.categories = data.data;

                    setTimeout(() => {
                        $('select[name=category_id]').selectpicker("refresh");
                    }, 1000);
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
                            that.post.image_medium_url = e.target.result;
                        };

                        if (/\.(jpe?g|png|gif)$/i.test(image.name)) {
                            reader.readAsDataURL(image);
                        }

                        break;
                }
            },

            onSubmit(e) {
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
                formData.append('type', this.post.type);
                formData.append('meta_title', this.post.meta_title);
                formData.append('meta_description', this.post.meta_description);
                formData.append('meta_keywords', this.post.meta_keywords);
                formData.append('view', this.post.view);
                formData.append('youtube_id', this.post.youtube_id != undefined ? this.post.youtube_id : '');
                formData.append('image', this.post.image != undefined ? this.post.image : '');
                formData.append('tags', this.post.tags);
                formData.append('status', this.post.status ? 1 : 0);

                storePost(formData).then(({data}) => this.$router.push('/post'))
                    .catch(({response}) => this.errors = response.data.errors);

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