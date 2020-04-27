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
                            <router-link :to="{ name: 'page_list' }">
                                Quản lý trang
                            </router-link>
                        </li>
                        <li class="active">Thêm trang</li>
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
                                                       v-model="page.title" @input="addEvent"
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
                                                          placeholder="Mô tả" v-model="page.description"></textarea>
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
                                        <label class="form-label">Nội dung (*)</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div v-bind:class="[errors.content?'form-line focused error':'form-line']">
                                                <textarea id="page_content" name="content" class="form-control" rows="4"
                                                          @input="addEvent"
                                                          placeholder="Mô tả" v-model="page.content"></textarea>
                                            </div>

                                            <label class="error" v-if="errors.content">
                                                {{ errors.content }}
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
                                                   v-model="page.status"/>
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
    import {storePage} from '../../models/page'

    export default {
        name: "PageCreate",

        data() {
            return {
                errors: {
                    title: '',
                    description: '',
                    content: ''
                },
                page: {
                    title: '',
                    description: '',
                    content: '',
                    status: false
                }
            };
        },

        created() {
            this.fetch();
        },

        methods: {
            fetch() {
                const that = this;

                setTimeout(() => {
                    loadCKEditor('page_content');
                }, 1000);
            },

            addEvent({target}) {
                const that = this;
            },

            onSubmit(e) {
                if (window.CKEDITOR) {
                    this.page.content = CKEDITOR.instances['page_content'].getData();
                }

                if (!this.isValid()) {
                    window.scrollTo(0, 0);

                    return false;
                }

                const formData = new FormData();

                formData.append('title', this.page.title);
                formData.append('description', this.page.description);
                formData.append('content', this.page.content);
                formData.append('status', this.page.status ? 1 : 0);

                storePage(formData).then(({data}) => this.$router.push('/page'))
                    .catch(({response}) => this.errors = response.data.errors);

                e.preventDefault();
            },

            isValid() {
                let is_valid = true;

                if (!this.page.title) {
                    this.errors.title = "Vui lòng nhập tiêu đề trang.";

                    is_valid = false;
                }

                if (!this.page.description) {
                    this.errors.description = "Vui lòng nhập mô tả trang.";

                    is_valid = false;
                }

                if (!this.page.content) {
                    this.errors.content = "Vui lòng nhập nội dung trang.";

                    is_valid = false;
                }

                return is_valid;
            }
        }
    }
</script>

<style scoped>

</style>