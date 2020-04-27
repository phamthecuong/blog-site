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
                            <router-link :to="{ name: 'banner_list' }">
                                Quản lý banner
                            </router-link>
                        </li>
                        <li class="active">Thêm banner</li>
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
                                        <label class="form-label">Banner (*)</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div v-bind:class="[errors.name?'form-line focused error':'form-line']">
                                                <input type="text" class="form-control" name="name"
                                                       v-model="banner.name" @input="addEvent"
                                                       placeholder="Banner"/>
                                            </div>
                                            <div class="help-info">Tối thiểu 3, tối đa 255 ký tự</div>
                                            <label class="error" v-if="errors.name">{{ errors.name }}</label>
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
                                                          placeholder="Mô tả" v-model="banner.description"></textarea>
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
                                        <label class="form-label">Url (*)</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div v-bind:class="[errors.url?'form-line focused error':'form-line']">
                                                <input type="text" class="form-control" name="url"
                                                       v-model="banner.url" @input="addEvent"
                                                       placeholder="Url"/>
                                            </div>
                                            <label class="error" v-if="errors.url">{{ errors.url }}</label>
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
                                                         v-bind:style="{ backgroundImage: 'url(' + banner.image_medium_url + ')' }">
                                                    </div>
                                                </div>

                                                <input type="file" name="image" class="hidden" @change="addEvent"/>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Sắp xếp</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="order"
                                                       v-model="banner.order" @input="addEvent"
                                                       placeholder="Sắp xếp<"/>
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
                                                   v-model="banner.status"/>
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
    import {storeBanner} from '../../models/banner'

    export default {
        name: "BannerCreate",

        data() {
            return {
                errors: {
                    name: '',
                    url: ''
                },
                banner: {
                    name: '',
                    description: '',
                    url: '',
                    image: '',
                    image_medium_url: '',
                    order: 0,
                    status: false
                }
            };
        },

        created() {
            this.fetch();
        },

        methods: {
            fetch() {

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

                        that.banner.image = image;

                        reader.onload = function (e) {
                            that.banner.image_medium_url = e.target.result;
                        };

                        if (/\.(jpe?g|png|gif)$/i.test(image.name)) {
                            reader.readAsDataURL(image);
                        }

                        break;
                }
            },

            onSubmit(e) {
                if (!this.isValid()) {
                    window.scrollTo(0, 0);

                    return false;
                }

                const formData = new FormData();

                formData.append('name', this.banner.name);
                formData.append('description', this.banner.description);
                formData.append('url', this.banner.url);
                formData.append('image', this.banner.image);
                formData.append('order', this.banner.order);
                formData.append('status', this.banner.status ? 1 : 0);

                storeBanner(formData)
                    .then(({data}) => this.$router.push('/banner'))
                    .catch(({response}) => this.errors = response.data.errors);

                e.preventDefault();
            },

            isValid() {
                let is_valid = true;

                if (!this.banner.name) {
                    this.errors.name = "Vui lòng nhập tên banner.";

                    is_valid = false;
                }

                if (!this.banner.url) {
                    this.errors.url = "Vui lòng nhập url.";

                    is_valid = false;
                }

                return is_valid;
            }
        }
    }
</script>

<style scoped>

</style>