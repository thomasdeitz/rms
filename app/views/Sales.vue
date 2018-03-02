<template lang="pug">
    div#sales
        ul
          li: h2 Sales
          li(v-for="sale in sales" v-if="sale.date")
            router-link(:to="{name: 'Sale', params: { saleId: sale.id } }")
              span {{ sale.customer.name }}
              span Order# {{ sale.id }}
              span {{ moment(sale.date).format('M-D-YYYY – ddd hh:mm A') }}
              span {{ sale.products.length }} {{ sale.products.length <= 1 ? 'Item': 'Items' }}
              span(style="float: right;")
                Total(v-bind="sale")
              span(style="float: right; color:darkorange;")
                AmountDue(v-bind="sale")
</template>

<script>
var moment = require("moment");
import Total from "@/components/Total";
import AmountDue from "@/components/AmountDue";
export default {
  name: "Sales",
  components: {
    Total, AmountDue
  },
  data() {
    return {
      moment: moment,
      sales: []
    };
  },
  mounted() {
    this.getSales();
  },
  methods: {
    getSales() {
      const myRequest = new Request("http://0.0.0.0:3000/sales", {
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
          this.sales = json;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped lang="sass">
  #sales
    position: absolute;
    height: 100%;
    width: 100%;
    padding: 80px 20px 20px 20px;

    ul
      list-style: none;
      padding: 0px;
      margin: 0px;
      background-color: white;
      margin-bottom: 130px;
      
      li
        & > *
          color: rgba(1,32,50, .75);
          text-decoration: none;
          border-bottom: 1px solid rgba(1,32,50, .25);
          padding: 20px 20px 20px 0px;
          margin-left: 20px;
          display: flex;
          justify-content: stretch;

        h2
          margin: 0px;
          margin-left: 20px;

        a
          &:hover
            background-color: solid rgba(1,32,50, .2);

          span:not(:last-child)
              flex-grow: 1;
</style>