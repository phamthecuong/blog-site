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
                            <router-link :to="{ name: 'group_list' }">
                                Quản lý nhóm người dùng
                            </router-link>
                        </li>
                        <li class="active">Thêm nhóm người dùng</li>
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
                                        <label class="form-label">Tên nhóm (*)</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div class="form-group">
                                            <div v-bind:class="[errors.name?'form-line focused error':'form-line']">
                                                <input type="text" class="form-control" name="name"
                                                       v-model="group.name" @input="addEvent"
                                                       placeholder="Tên nhóm"/>
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
                                            <div
                                                v-bind:class="[errors.description?'form-line focused error':'form-line']">
                                                <textarea name="description" class="form-control" rows="4"
                                                          @input="addEvent"
                                                          placeholder="Mô tả" v-model="group.description"></textarea>
                                            </div>

                                            <div class="help-info">Tối thiểu 3 ký tự</div>
                                            <label class="error" v-if="errors.description">
                                                {{ errors.description }}
                                            </label>
                                        </div>
                                    </div>
                                </div>


                                <div class="row clearfix">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-5 form-control-label">
                                        <label class="form-label m-0">Phân quyền</label>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 col-xs-7">
                                        <div v-for="scope in scopes">
                                            <input type="checkbox" v-bind:id="scope.code" name="scope[]"
                                                   v-model="scope.is_allow"
                                                   class="filled-in chk-col-teal"/>
                                            <label v-bind:for="scope.code">{{scope.name}}</label>
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
                                                   v-model="group.is_active"/>
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
    import {storeGroup} from '../../models/group'
    import {getRoles} from '../../models/role'

    export default {
        name: "GroupCreate",

        data() {
            return {
                errors: {
                    name: ''
                },
                group: {
                    name: '',
                    description: '',
                    status: false
                },
                scopes: [],
            };
        },

        created() {
            this.fetch();
        },

        methods: {
            fetch() {
                axios.all([
                    getRoles()
                ]).then(axios.spread((first_response) => {
                    this.scopes = first_response.data.data.admin_group_scopes;
                }));
            },

            addEvent({target}) {
                console.log(target.name);
            },

            onSubmit(e) {
                if (!this.isValid()) {
                    window.scrollTo(0, 0);

                    return false;
                }

                const formData = new FormData();

                formData.append('name', this.group.name);
                formData.append('description', this.group.description);
                formData.append('is_active', this.group.is_active ? 1 : 0);

                const scopes = [];
                this.scopes.forEach(item => {
                    if (item.is_allow == 1) {
                        scopes.push(item.code);
                    }
                });
                formData.append('scopes', scopes);

                storeGroup(formData).then(({data}) => {
                    this.$router.push('/admin-group')
                }).catch(({response}) => this.errors = response.data.errors);

                e.preventDefault();
            },

            isValid() {
                let is_valid = true;

                if (!this.group.name) {
                    this.errors.name = "Vui lòng nhập tên nhóm.";

                    is_valid = false;
                }

                return is_valid;
            }
        }
    }
</script>

<style scoped>

</style>
