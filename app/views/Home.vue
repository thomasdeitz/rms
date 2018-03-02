<template lang="pug">
    div#home
        ul
            li(:class="[tile.size]" v-for="tile in tiles" v-if="tile.column == 0")
                router-link(:to="{ name: tile.route }")
                    span.fa(:class="[tile.icon]")
                    span {{ tile.label }}
</template>

<script>
    console.log(this);
    import AppData from '@/data/AppData'
    export default {
        name: 'Home',
        data () {
            return {
                tiles: []
            }
        },
        mounted() {
            this.getTiles();
        },
        methods: {
            getTiles() {
                const myRequest = new Request('http://0.0.0.0:3000/appdata', {
                    cache: 'no-cache',
                    headers: {
                        'content-type': 'application/json'
                    },
                    referrer: 'no-referrer',
                    method: 'GET'
                });

                fetch(myRequest)
                .then(response => {
                    if (response.status === 200 || response.status === 304) {
                    return response.json();
                    } else {
                    throw new Error('Something went wrong on api server!');
                    }
                })
                .then(json => {
                    console.log(json.tiles);
                    this.tiles = json.tiles;
                }).catch(error => {
                    console.error(error);
                });
            },
        }
    }
</script>

<style scoped lang="sass">
    ul
        position: absolute;
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        align-items: center;
        align-content: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 0px;

        li
            display: flex;
            align-items: stretch;
            align-content: stretch;
            text-align: center;
            flex-grow: 0;
            width: 50%;
            margin: 10px;

            .fa
                margin-bottom: 10px;

            &.lg
                height: 200px;
                
                .fa
                    font-size: 2.5em;
            &.md 
                height: 100px;
                
                .fa 
                    font-size: 2em;

            & a 
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 100%;
                padding: 10px;
                background-color: rgba(white, .125);
                text-decoration: none;
                color: white;
                transition: transform .1s ease-in-out;

                &:hover
                    transform: scale(1.05);
                &:active
                    transform: scale(.95);

</style>