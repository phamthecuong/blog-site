<template>
    <component v-bind:is="layout"></component>
</template>

<script>
    import AppLayout from './layout/AppLayout'
    import SimpleLayout from './layout/SimpleLayout'

    export default {
        computed: {
            layout() {
                return this.$store.getters.layout
            }
        },
        components: {
            'app-layout': AppLayout,
            'simple-layout': SimpleLayout
            // define as many layouts you want for the application
        }
    }
</script>