<template lang="pug">
    div#customerLookup
        h2 Find a Customer
        form
            input(type="text" ref="search" v-model="thisCustomerName" @input="onChange" placeholder="Name or ID")
            span.fa.fa-search

            ul
                li(v-for="(customer, index) in results" v-if="thisCustomerName")
                    router-link(:ref="index" :to="{name: 'New Sale', params: { customerId: customer.id } }") 
                        strong {{ customer.name }}
                        br 
                        small {{ customer.email }} | {{ customer.phone }}
            
</template>

<script>
    export default {
        name: 'CustomerLookup',
        data () {
            return {
                thisCustomerName: "",
                results: [],
                customers: []
            }
        },
        created(){
            this.getCustomers();
        },
        mounted() {
            var vm = this;
            window.addEventListener('keyup', function(event) {
                if (event.keyCode == 40) { vm.downArrowPressed(); }
                if (event.keyCode == 38) { vm.upArrowPressed(); }
            });
            this.focusSearch();
        },
        methods: {
            focusSearch() { this.$refs.search.focus(); console.log('focus search run'); },
            downArrowPressed() {},
            upArrowPressed() {},
            onChange() {
                this.filterResults();
            },
            filterResults() {
                this.results = this.customers.filter(customer => customer.name.toLowerCase().indexOf(this.thisCustomerName.toLowerCase()) > -1);
            },
            getCustomers() {
                const myRequest = new Request('http://0.0.0.0:3000/customers', {
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
                    console.log(json);
                    this.customers = json;
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    };
</script>

<style lang="sass" scoped>
    #customerLookup
        color: white;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        
        form
            position: relative;
            width: calc(100% - 40px);
            max-width: 500px;

            .fa
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 20px;
                color: rgba(1,32,50, .25);
                pointer-events: none;

            input
                font-size: em;
                border-radius: 2px;
                border: none;
                padding: 20px;
                width: 100%;
                color: rgb(1,32,50);
                outline: none;
                max-width: 500px;

                &::placeholder
                    color: rgba(1,32,50, .25);

            ul
                position: absolute;
                max-height: 200px;
                width: 100%;
                list-style: none;
                padding: 0px;
                margin: 20px 0 0 0;
                overflow: hidden;
                overflow-y: scroll;
                border-radius: 2px;

                li a
                    display: block;
                    color: white;
                    text-decoration: none;
                    padding: 20px;
                    background-color: rgba(white, .25);

                    &:hover, &:focus
                        background-color: white;
                        color: rgba(1,32,50, .75);
                        outline: none;

</style>