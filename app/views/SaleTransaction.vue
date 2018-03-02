<template lang="pug">
    div#saleTransaction
      h2(v-if="sale.customer") Amount Due - 
        AmountDue(v-bind="sale")
      p(v-if="sale.customer") {{ sale.customer.name }}
      input(ref="amount" type="number" v-model="transaction.amount")
      button(:disabled="transaction.amount ? false : true" v-on:click="patchSale()") Process Transaction
</template>

<style lang="sass" scoped>
    #saleTransaction
        color: white;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        max-width: 500px;
        left: 50%;
        transform: translateX(-50%);

        input
            font-size: em;
            text-align: center;
            border-radius: 2px;
            border: none;
            padding: 20px;
            width: 100%;
            color: rgb(1,32,50);
            outline: none;
            margin-bottom: 20px;

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
        button
            padding: 20px;
            width: 100%;
            font-weight: bold;
            display: block;
            border: none;
            border-radius: 2px;
            cursor: pointer;
            background-color: darkorange;
            color: white;
            margin-bottom: 20px;

            &[disabled]
                opacity: .5;
</style>

<script>
import router from "@/router";
import AmountDue from "@/components/AmountDue";
export default {
  name: "SaleTransaction",
  components: {
    AmountDue
  },
  data() {
    return {
      transaction: {
        amount: "",
        date: new Date(),
        type: "payment",
        method: "Cash"
      },
      sale: {}
    };
  },
  created() {
    this.getSale();
  },
  mounted() {
    this.amountSearch();
  },
  methods: {
    amountSearch() {
      this.$refs.amount.focus();
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
    patchSale() {
      this.sale.transactions.push(this.transaction);
      var transactions = { transactions: this.sale.transactions };
      console.log(transactions);
      const myRequest = new Request(
        "http://0.0.0.0:3000/sales/" + this.sale.id,
        {
          cache: "no-cache",
          headers: {
            "content-type": "application/json"
          },
          referrer: "no-referrer",
          method: "PATCH",
          body: JSON.stringify(transactions)
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
          console.log(json);
          router.push({ name: "Sales" });
        })
        .catch(error => {
          console.error(error);
        });
      console.log("post sale run");
    }
  }
};
</script>