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
                            <router-link :to="{ name: 'faq_list' }">
                                Quản lý câu hỏi
                            </router-link>
                        </li>
                        <li class="active">Thêm câu hỏi</li>
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
                                        <label class="form-label">Câu hỏi (*)</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div v-bind:class="[errors.question?'form-line focused error':'form-line']">
                                                <input type="text" class="form-control" name="question"
                                                       v-model="faq.question" @input="addEvent"
                                                       placeholder="Câu hỏi"/>
                                            </div>
                                            <div class="help-info">Tối thiểu 3, tối đa 255 ký tự</div>
                                            <label class="error" v-if="errors.question">{{ errors.question }}</label>
                                        </div>
                                    </div>
                                </div>


                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label">Câu trả lời (*)</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div v-bind:class="[errors.answer?'form-line focused error':'form-line']">
                                                <textarea id="answer" name="answer" class="form-control" rows="4"
                                                          @input="addEvent"
                                                          placeholder="Mô tả" v-model="faq.answer"></textarea>
                                            </div>

                                            <label class="error" v-if="errors.answer">
                                                {{ errors.answer }}
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
                                                       @input="addEvent"
                                                       v-model="faq.order"
                                                       placeholder="Sắp xếp"/>
                                            </div>
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
    import {storeFAQ} from '../../models/faq'

    export default {
        name: "FAQCreate",

        data() {
            return {
                errors: {
                    question: '',
                    answer: ''
                },
                faq: {
                    question: '',
                    answer: '',
                    order: 0
                }
            };
        },

        created() {
            this.fetch();
        },

        methods: {
            fetch() {
                setTimeout(() => {
                    loadCKEditor('answer');
                }, 1000);
            },

            addEvent({target}) {
            },

            onSubmit(e) {
                if (window.CKEDITOR) {
                    this.faq.answer = CKEDITOR.instances['answer'].getData();
                }

                if (!this.isValid()) {
                    window.scrollTo(0, 0);

                    return false;
                }

                const formData = new FormData();

                formData.append('question', this.faq.question);
                formData.append('answer', this.faq.answer);
                formData.append('order', this.faq.order);

                storeFAQ(formData).then(({data}) => this.$router.push('/faq'))
                    .catch(({response}) => this.errors = response.data.errors);

                e.preventDefault();
            },

            isValid() {
                let is_valid = true;

                if (!this.faq.question) {
                    this.errors.question = "Vui lòng nhập câu hỏi.";

                    is_valid = false;
                }

                if (!this.faq.answer) {
                    this.errors.answer = "Vui lòng nhập câu trả lời.";

                    is_valid = false;
                }

                return is_valid;
            }
        }
    }
</script>

<style scoped>

</style>