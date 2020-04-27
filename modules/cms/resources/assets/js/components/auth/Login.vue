<template>
    <div class="login-box">
        <div class="card">
            <div class="body">
                <form id="sign_in" method="POST" @submit.prevent="onSubmit">
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">person</i>
                        </span>
                        <div class="form-line">
                            <input type="text" class="form-control" name="username" placeholder="Tài khoản"
                                   v-model="user.username"/>
                        </div>
                        <label class="error" v-if="errors.username">{{ errors.username }}</label>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">lock</i>
                        </span>
                        <div class="form-line">
                            <input type="password" class="form-control" name="password" placeholder="Mật khẩu"
                                   v-model="user.password"/>
                        </div>
                        <label class="error" v-if="errors.password">{{ errors.password }}</label>
                    </div>
                    <div class="row">
                        <div class="col-xs-6 p-t-5">
                            <input type="checkbox" name="remember_me" id="remember_me" class="filled-in chk-col-pink"
                                   v-model="user.remember_me"
                                   checked/>
                            <label for="remember_me">Nhớ mật khẩu</label>
                        </div>
                        <div class="col-xs-6"></div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12 p-t-5">
                            <button class="btn btn-block bg-pink waves-effect" type="submit">ĐĂNG NHẬP</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",

        data() {
            return {
                errors: {
                    username: '',
                    password: ''
                },
                user: {
                    username: '',
                    password: '',
                    remember_me: true
                }
            };
        },

        created() {
            this.$store.commit('SET_LAYOUT', 'simple-layout')
        },

        methods: {
            onSubmit(e) {
                if (!this.user.username) {
                    this.errors.username = "Vui lòng nhập tài khoản."
                }

                if (!this.user.password) {
                    this.errors.password = "Vui lòng nhập mật khẩu."
                }

                if (!this.user.username || !this.user.password) {
                    return false;
                }

                let username = this.user.username;
                let password = this.user.password;
                let remember_me = this.user.remember_me;

                this.$store.dispatch('login', {username, password, remember_me}).then(() => {
                    this.$store.commit('SET_LAYOUT', 'app-layout');

                    //this.$router.push('/');

                    location.href = '/';
                });

                e.preventDefault();
            }
        }
    }
</script>

<style scoped>

</style>