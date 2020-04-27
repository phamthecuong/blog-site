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
                            <router-link :to="{ name: 'contact_list' }">
                                Quản lý liên hệ
                            </router-link>
                        </li>
                        <li class="active">{{contact.name}}</li>
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
                                        <label class="form-label">Họ tên</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="text" class="form-control" name="name"
                                                       v-model="contact.name" @input="addEvent"
                                                       placeholder="Họ tên" disabled/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Email</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div class="form-line">
                                                <input type="email" class="form-control" name="email"
                                                       v-model="contact.email" @input="addEvent"
                                                       placeholder="Email" disabled/>
                                            </div>
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
                                                <textarea name="description" class="form-control" rows="4"
                                                          @input="addEvent"
                                                          placeholder=">Nội dung" v-model="contact.content"></textarea>
                                            </div>

                                            <div class="help-info">Tối thiểu 3 ký tự</div>
                                            <label class="error" v-if="errors.content">
                                                {{ errors.content }}
                                            </label>
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
    import {getContact, updateContact} from '../../models/contact'

    export default {
        name: "ContactEdit",

        data() {
            return {
                errors: {
                    content: ''
                },
                contact: {
                    name: '',
                    email: '',
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
                const {id} = this.$route.params;

                axios.all([
                    getContact(id)
                ]).then(axios.spread((first_response) => {
                    this.contact = first_response.data.data;
                })).catch(errors => {
                    if (errors.response.status == 404) {
                        this.$router.push('/404');
                    }
                });
            },

            addEvent({target}) {
                const that = this;
            },

            onSubmit(e) {
                if (!this.isValid()) {
                    window.scrollTo(0, 0);

                    return false;
                }

                const formData = new FormData();

                formData.append('content', this.contact.content);
                formData.append('_method', 'patch');

                updateContact(this.contact.id, formData)
                    .then(({data}) => this.$router.push('/contact'))
                    .catch(({response}) => this.errors = response.data.errors);

                e.preventDefault();
            },

            isValid() {
                let is_valid = true;

                if (!this.contact.content) {
                    this.errors.content = "Vui lòng nhập tên banner.";

                    is_valid = false;
                }

                return is_valid;
            }
        }
    }
</script>

<style scoped>

</style>