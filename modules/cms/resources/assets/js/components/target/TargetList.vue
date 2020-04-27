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
                        <li class="active">Quản lý Gói đầu tư</li>
                    </ol>
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
                                    <th>Tên gói</th>
                                    <th width="150">Lợi nhuận/năm</th>
                                    <th>Thời gian tạo</th>
                                    <th width="150">Trạng thái</th>
                                    <th width="100"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="target in targets">
                                    <td>
                                        <img :src="target.image_url" style="width: 100%"/>
                                    </td>
                                    <td>
                                        {{target.id}}<br/>
                                    </td>
                                    <td>{{target.name}}</td>
                                    <td>{{target.rate}}%</td>
                                    <td>{{target.created_at}}</td>
                                    <td>
                                        <span v-if="target.is_active == 1" class="font-bold col-teal">Hoạt động</span>
                                        <span v-else class="font-bold col-pink">Không hoạt động</span>
                                    </td>
                                    <td class="text-right">
                                        <router-link class="item-tool" :to="{path: '/target/'+target.id}">
                                            <i class="material-icons">edit</i>
                                        </router-link>
                                        <a href="#" class="item-tool" @click="report(target.id)">
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
            <router-link class="item-tool" :to="{path: '/target/create'}">
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
    import {deleteTarget, getTargets} from '../../models/target'

    export default {
        name: "TargetList",

        data() {
            return {
                search: {
                    name: '',
                    is_active: -1
                },
                targets: [],
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
                    getTargets({
                        page: page
                    }),
                ]).then(axios.spread((first_response) => {
                    this.targets = first_response.data.data.targets;
                    this.pageCount = first_response.data.data.meta_data.last_page;
                }));
            },

            searchEvent({target}) {
                const that = this;

                switch (target.name) {
                    case 'name':
                        that.search.name = target.value;

                        break;

                    case 'is_active':
                        that.search.is_active = target.value;

                        break;
                }

                getTargets({
                    name: that.search.name,
                    is_active: that.search.is_active
                }).then(response => {
                    this.targets = response.data.data;
                    this.pageCount = response.data.data.meta_data.last_page;
                });
            },

            report(id) {
                const that = this;

                confirmDialog('Xác nhận', 'Bạn chắc chắn muốn xóa?', function () {
                    deleteTarget(id).then(response => {
                        that.targets = that.targets.filter(item => item.id !== id);
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>
