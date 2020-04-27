<template>
    <div>
        <search-bar/>

        <nav-bar/>

        <side-bar/>

        <template v-if="error.code != 0">
            <section class="content">
                <div class="container-fluid">
                    <div class="alert alert-danger">
                        <strong>Lỗi {{error.code}}:</strong> {{error.message}}
                    </div>
                </div>
            </section>
        </template>

        <template v-else>
            <router-view></router-view>
        </template>
    </div>
</template>

<script>
    import SearchBar from '../SearchBar'
    import NavBar from '../NavBar'
    import SideBar from '../SideBar'

    export default {
        name: "AppLayout",

        components: {
            SearchBar,
            NavBar,
            SideBar
        },

        computed: {
            isLoading() {
                return this.$store.getters.isLoading
            },

            error() {
                return this.$store.getters.error
            }
        },

        created() {
            this.$store.dispatch("SET_USER_INFO");
        },
    }
</script>