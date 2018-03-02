<template lang="pug">
    span ${{ amountDue }}
            
</template>

<script>
    export default {
      name: 'SubTotal',
      props: [
        'products',
        'tax',
        'transactions'
      ],
      computed: {
        subTotal: function() {
          return parseFloat(
            this.products.reduce(
              (subTotal, product) => subTotal + product.price,
              0
            )
          ).toFixed(2);
        },
        total: function() {
          let tax = this.tax/10;
          let subTotal = +this.subTotal;
          return parseFloat(Math.round((subTotal * tax)/10 + subTotal)).toFixed(2);
        },
        payments: function() {
          return parseFloat(
            Math.round(
              this.transactions.reduce(
                (Payments, transaction) => Payments + Number(transaction.amount),
                0
              )
            )
          ).toFixed(2);
        },
        amountDue: function() {
          let total = +this.total;
          let payments = +this.payments;
          return parseFloat(Math.round(total - payments)).toFixed(2);
        }
      }
    };
</script>

<style lang="sass" scoped></style>