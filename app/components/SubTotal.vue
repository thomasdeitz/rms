<template lang="pug">
    span ${{ subTotal }}
            
</template>

<script>
    export default {
      name: 'SubTotal',
      props: [
        'products',
      ],
      computed: {
          subTotal: function() {
          return parseFloat(
            this.products.reduce(
              (subTotal, product) => subTotal + product.price,
              0
            )
          ).toFixed(2);
        }
      }
    };
</script>

<style lang="sass" scoped></style>