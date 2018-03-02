<template lang="pug">
    div#app
        Nav
        router-view
</template>

<script>
    import Nav from '@/partials/Nav'
    import AppData from '@/data/AppData'
    export default {
        name: 'App',
        components: { Nav },
        data () {
            return {
                colors: AppData.colors
            }
        }
    }
</script>

<style lang="sass">
    @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
    @import "./assets/normalize";
    @import "./assets/main";
    *
        box-sizing: border-box;

    body
        background-color: rgb(1,32,50);
        font-family: Lato;
        font-weight: 300;
</style>