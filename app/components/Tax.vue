<template lang="pug">
    span ${{ taxAmount }}
            
</template>

<script>
    export default {
      name: 'Tax',
      props: [
        'products',
        'tax'
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
        taxAmount: function() {
          let total = +this.total;
          let subTotal = +this.subTotal;
          return parseFloat(+this.total - +this.subTotal).toFixed(2);
        }
      }
    };
</script>

<style lang="sass" scoped></style>