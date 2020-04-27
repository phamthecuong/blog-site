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
                            <router-link :to="{ name: 'product_list' }">
                                Quản lý sản phẩm
                            </router-link>
                        </li>
                        <li class="active">Thêm sản phẩm</li>
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
                                                       v-model="product.title" @input="addEvent"
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
                                                          placeholder="Mô tả" v-model="product.description"></textarea>
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
                                                        v-model="product.category_id">
                                                    <option value="0">Chọn danh mục</option>
                                                    <template v-for="category in categories">
                                                        <option v-bind:value="category.id">
                                                            {{category.name}}
                                                        </option>

                                                        <option v-for="sub_category in category.categories"
                                                                v-bind:value="sub_category.id"
                                                                :selected="sub_category.id == product.category_id">
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
                                                <textarea id="product_content" name="content" class="form-control" rows="4"
                                                          @input="addEvent"
                                                          placeholder="Mô tả" v-model="product.content"></textarea>
                                            </div>

                                            <label class="error" v-if="errors.content">
                                                {{ errors.content }}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Từ khoá</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="tags"
                                                       data-role="tagsinput" @input="addEvent" @change="addEvent"
                                                       v-model="product.tags"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Giá</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="price"
                                                       @input="addEvent"
                                                       v-model="product.price"
                                                       placeholder="Giá"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Giá gốc</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="price_origin"
                                                       @input="addEvent"
                                                       v-model="product.price_origin"
                                                       placeholder="Giá gốc"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Link xem trước</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="preview_url"
                                                       @input="addEvent"
                                                       v-model="product.preview_url"
                                                       placeholder="Link xem trước"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Nguồn</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="source_url"
                                                       @input="addEvent"
                                                       v-model="product.source_url"
                                                       placeholder="Nguồn"/>
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
                                                       v-model="product.meta_title"
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
                                                          v-model="product.meta_description"></textarea>
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
                                                              v-model="product.meta_keywords"></textarea>
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
                                                       v-model="product.view"
                                                       placeholder="Lượt xem"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Ảnh đại diện</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="source_url"
                                                       @input="addEvent"
                                                       v-model="product.image_url"
                                                       placeholder="Ảnh đại diện"/>
                                            </div>
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
                                                   v-model="product.status"/>
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
    import {storeProduct} from '../../models/product'
    import {getProductCategories} from '../../models/product.category'

    export default {
        name: "ProductCreate",

        data() {
            return {
                errors: {
                    title: '',
                    description: '',
                    content: '',
                    category_id: '',
                },
                product: {
                    title: '',
                    description: '',
                    content: '',
                    category_id: 0,
                    meta_title: '',
                    meta_description: '',
                    meta_keywords: '',
                    view: 0,
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
                    loadCKEditor('product_content');

                    $('input[name=tags]').on('itemAdded', function (event) {
                        that.product.tags = $('input[name=tags]').val();
                    });

                    $('input[name=tags]').on('itemRemoved', function (event) {
                        that.product.tags = $('input[name=tags]').val();
                    });
                }, 1000);

                getProductCategories({
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

                        that.product.image = image;

                        reader.onload = function (e) {
                            that.product.image_medium_url = e.target.result;
                        };

                        if (/\.(jpe?g|png|gif)$/i.test(image.name)) {
                            reader.readAsDataURL(image);
                        }

                        break;
                }
            },

            onSubmit(e) {
                if (window.CKEDITOR) {
                    this.product.content = CKEDITOR.instances['product_content'].getData();
                }

                if (!this.isValid()) {
                    window.scrollTo(0, 0);

                    return false;
                }

                const formData = new FormData();

                formData.append('title', this.product.title);
                formData.append('description', this.product.description);
                formData.append('content', this.product.content);
                formData.append('category_id', this.product.category_id);
                formData.append('meta_title', this.product.meta_title);
                formData.append('meta_description', this.product.meta_description);
                formData.append('meta_keywords', this.product.meta_keywords);
                formData.append('view', this.product.view);
                formData.append('image', this.product.image != undefined ? this.product.image : '');
                formData.append('tags', this.product.tags);
                formData.append('status', this.product.status ? 1 : 0);

                storePost(formData).then(({data}) => this.$router.push('/product'))
                    .catch(({response}) => this.errors = response.data.errors);

                e.preventDefault();
            },

            isValid() {
                let is_valid = true;

                if (!this.product.title) {
                    this.errors.title = "Vui lòng nhập tiêu đề bài viết.";

                    is_valid = false;
                }

                if (!this.product.description) {
                    this.errors.description = "Vui lòng nhập mô tả bài viết.";

                    is_valid = false;
                }

                if (!this.product.content) {
                    this.errors.content = "Vui lòng nhập nội dung bài viết.";

                    is_valid = false;
                }

                if (this.product.category_id == 0) {
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