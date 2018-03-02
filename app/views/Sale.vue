<template lang="pug">
  div#sale
    form#productSearch
      div
        input(type="text" ref="search" v-model="thisProduct" v-on:keydown.enter="onAddProduct(thisProduct)" placeholder="Find a Product" @input="onChange")
        span.fa.fa-search

      div.items
        ul
          li.empty(v-if="filteredProducts.length == 0")
            p Search for or scan an item
          li(v-for="product in filteredProducts" v-if="filteredProducts")
            a(href="#" v-on:click="onClick(product)")
              img(:src="product.image" height="29px" width="40px")
              span {{ product.name }}
              small Size {{ product.size }}
              small: strong ${{ product.price }}
    div#right
      div#productCart
        div.empty(v-if="sale.products.length == 0")
          p Add an item to this sale.
        ul
          li(v-for="product in sale.products" v-if="sale.products")
            //img(:src="product.image" height="29px" width="40px")
            small: strong {{ product.name }} 
              span(style="float:right;") ${{product.price}}
            br
            small {{ product.id }} | Size: {{ product.size }}

    div#farRight
      div#customer(v-if="sale.customer.address")
          span {{ sale.customer.name }}
          br
          small {{ sale.customer.phone }}
          br
          small {{ sale.customer.email }}
      div#totals
        small Sub Total: 
          span(style="float: right;")
            SubTotal(v-bind:products="sale.products")

        small Tax:
          span(style="float: right;")
            Tax(v-bind="sale")

        span: strong Total:
          span(style="float: right;")
            Total(v-bind="sale")

        hr

        small(v-for="transaction in sale.transactions" v-if="sale.transactions")
          span(style="color:#52a152;" :title="moment(transaction.date).format('M-D-YYYY')") Payment: 
            span(style="float: right;") - ${{ parseFloat(transaction.amount).toFixed(2) }}

        hr(v-if="sale.transactions.length > 0")

        span(style="color:darkorange;"): strong Amount Due: 
          span(style="float: right;")
            AmountDue(v-bind="sale")
      div#actions
        button(:disabled="sale.products.length != 0 ? false : true" v-on:click="$route.params.saleId ? updateSale('save', $route.params.saleId) : postSale('save')") Save
        button(:disabled="sale.products.length != 0 ? false : true" v-on:click="$route.params.saleId ? updateSale('pay', $route.params.saleId) : postSale('pay')") Pay
</template>

<style lang="sass" scoped>
  #sale
    position: absolute;
    height: 100%;
    width: 100%;
    padding: 80px 20px 20px 20px;
    display: flex;
    align-content: stretch;
    align-items: stretch;
    justify-content: stretch;

    form
      display: block;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      margin-right: 20px;

      div
        position: relative;
        margin-bottom: 20px;

        input
          border-radius: 2px;
          border: none;
          padding: 20px;
          width: 100%;
          color: rgb(1,32,50);
          outline: none;

          &::placeholder
            color: rgba(1,32,50, .25);

        .fa
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 20px;
          color: rgba(1,32,50, .25);
          pointer-events: none;

      div.items
        display: block;
        flex-grow: 1;
        overflow: hidden;
        overflow-y: scroll;
        margin-bottom: 0px;
        background-color: white;
        border-radius: 2px;

        ul
          margin: 0px;
          padding: 0px;
          list-style: none;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          align-content: flex-start;
          align-items: flex-start;

          li
            position: relative;
            max-width: 30%;
            flex-grow: 1;
            background-color: white;
            position: relative;

            &.empty
              position: absolute;
              top: 50%;
              width: 100%;
              max-width: 100%;
              text-align: center;
              transform: translateY(-50%);

            a
              display: block;
              padding: 20px;
              text-align: center;
              text-decoration: none;
              color: rgba(1,32,50, .75);
              outline: none;
              img
                opacity: .75;

              &:hover, &:focus
                img
                  opacity: 1;

              & > *
                  display: block
                  margin-bottom: 10px;

              img 
                height: auto;
                width: 100%;
                display: block;

    #right 
      flex-shrink: 0;
      width: 300px;
      display: flex;
      flex-direction: column;
      margin-right: 20px;

      #productCart
        position: relative;
        background-color: white;
        border-radius: 2px;
        flex-grow: 1;
        color: rgba(1,32,50, .75);
        display: flex;
        overflow: hidden;
        flex-direction: column;

        div
          position: absolute;
          width: 100%;
          top: 50%;
          text-align: center;
          transform: translateY(-50%);

        & > ul
          flex-grow: 1;
          height: calc(100% - 130px);
          list-style: none;
          margin: 0px;
          padding: 0px;

          li
            padding: 10px 20px 10px 0;
            margin-left: 20px
            border-bottom: 1px solid rgba(1,32,50, .25);

    #farRight
      width: 300px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;

      #customer
        background-color: white;
        padding: 20px;
        border-radius: 2px;
        color: rgba(1,32,50, .75);
        line-height: 1.5
        margin-bottom: 20px;
        flex-grow: 0;

        span:first-child
          font-weight: bold;
      
      #totals
        height: 100%;
        background-color: white;
        margin-bottom: 20px;
        padding: 20px;
        border-radius: 2px;

        & > *
          display: block;
          padding-bottom: 20px;

        & > hr
          border: none;
          border-bottom: 1px solid rgb(1,32,50);
          padding: 0px;
          margin-bottom: 20px;

      #actions
        button
          padding: 20px;
          width: 100%;
          font-weight: bold;
          display: block;
          border: none;
          border-radius: 2px;
          cursor: pointer;

          &[disabled]
            opacity: .5;

          &:first-child
            background-color: rgba(white, .5);
            color: white;
            margin-bottom: 20px;

          &:last-child
            background-color: darkorange;
            color: white;
</style>

<script>
var moment = require("moment");
import router from "@/router";
import SubTotal from "@/components/SubTotal";
import Tax from "@/components/Tax";
import Total from "@/components/Total";
import AmountDue from "@/components/AmountDue";
export default {
  name: "Sale",
  data() {
    return {
      thisProduct: "",
      moment: moment,
      filteredProducts: [],
      products: [],
      sale: {
        date: new Date(),
        id: "",
        tax: 5.5,
        customer: [],
        products: [],
        transactions: []
      }
    };
  },
  created() {
    if (this.$route.params.saleId) {
      this.getSale();
    } else {
      this.getCustomer();
    }
    this.getProducts();
  },
  mounted() {
    this.focusSearch();
  },
  components: {
    SubTotal, Tax, Total, AmountDue
  },
  methods: {
    focusSearch() {
      this.$refs.search.focus();
    },
    onClick(product) {
      this.sale.products.push(product);
      this.filteredProducts = [];
      this.thisProduct = "";
      this.focusSearch();
      console.log("on click run");
    },
    onAddProduct(productIdentifier) {
      this.scannedProduct = this.products.filter(
        product => product.id.toString().toLowerCase() == productIdentifier
      );
      console.log("on add run");
      if (this.scannedProduct[0]) {
        this.sale.products.push(this.scannedProduct[0]);
        this.filteredProducts = [];
        this.thisProduct = "";
      } else {
        alert("No Product Found! Please Try Scanning Again.");
      }
      this.focusSearch();
    },
    onChange() {
      this.filterResults();
      console.log("on change run");
    },
    filterResults() {
      this.filteredProducts = this.products.filter(
        product =>
          product.name.toLowerCase().indexOf(this.thisProduct.toLowerCase()) >
            -1 ||
          product.id
            .toString()
            .toLowerCase()
            .indexOf(this.thisProduct.toLowerCase()) > -1
      );
      console.log("filter results run");
    },
    getProducts() {
      const myRequest = new Request("http://0.0.0.0:3000/products", {
        cache: "no-cache",
        headers: {
          "content-type": "application/json"
        },
        referrer: "no-referrer",
        method: "GET"
      });

      fetch(myRequest)
        .then(response => {
          if (response.status === 200 || response.status === 304) {
            return response.json();
          } else {
            throw new Error("Something went wrong on api server!");
          }
        })
        .then(json => {
          this.products = json;
        })
        .catch(error => {
          console.error(error);
        });
      console.log("get products run");
    },
    getSale() {
      const myRequest = new Request(
        "http://0.0.0.0:3000/sales/" + this.$route.params.saleId,
        {
          cache: "no-cache",
          headers: {
            "content-type": "application/json"
          },
          referrer: "no-referrer",
          method: "GET"
        }
      );

      fetch(myRequest)
        .then(response => {
          if (response.status === 200 || response.status === 304) {
            return response.json();
          } else {
            throw new Error("Something went wrong on api server!");
          }
        })
        .then(json => {
          this.sale = json;
        })
        .catch(error => {
          console.error(error);
        });
      console.log("get products run");
    },
    getCustomer() {
      const myRequest = new Request(
        "http://0.0.0.0:3000/customers/" + this.$route.params.customerId,
        {
          cache: "no-cache",
          headers: {
            "content-type": "application/json"
          },
          referrer: "no-referrer",
          method: "GET"
        }
      );

      fetch(myRequest)
        .then(response => {
          if (response.status === 200 || response.status === 304) {
            return response.json();
          } else {
            throw new Error("Something went wrong on api server!");
          }
        })
        .then(json => {
          this.sale.customer = json;
        })
        .catch(error => {
          console.error(error);
        });
      console.log("get customer run");
    },
    updateSale(route, id) {
      const myRequest = new Request("http://0.0.0.0:3000/sales/" + id, {
        cache: "no-cache",
        headers: {
          "content-type": "application/json"
        },
        referrer: "no-referrer",
        method: "PUT",
        body: JSON.stringify(this.sale)
      });

      fetch(myRequest)
        .then(response => {
          if (response.status === 200 || response.status === 304) {
            return response.json();
          } else {
            throw new Error("Something went wrong on api server!");
          }
        })
        .then(json => {
          console.log(json);
          if (route == "save") {
            router.push({ name: "Sales" });
          } else if (route == "pay") {
            router.push({ name: "Sale Transaction", params: { saleId: id } });
          }
        })
        .catch(error => {
          console.error(error);
        });
      console.log("post sale run");
    },
    postSale(route) {
      const myRequest = new Request("http://0.0.0.0:3000/sales", {
        cache: "no-cache",
        headers: {
          "content-type": "application/json"
        },
        referrer: "no-referrer",
        method: "POST",
        body: JSON.stringify(this.sale)
      });

      fetch(myRequest)
        .then(response => {
          if (response.status === 201) {
            return response.json();
          } else {
            throw new Error("Something went wrong on api server!");
          }
        })
        .then(json => {
          console.log(json);
          if (route == "save") {
            router.push({ name: "Sales" });
          } else if (route == "pay") {
            router.push({
              name: "Sale Transaction",
              params: { saleId: json.id }
            });
          }
        })
        .catch(error => {
          console.error(error);
        });
      console.log("post sale run");
    }
  }
};
</script>