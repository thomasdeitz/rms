<template lang="pug">
  nav
    router-link(to="/" v-if="$route.name != 'Home'"): span.fa.fa-home
    router-link(to="/"): span.fa.fa-cogs
</template>

<script>
  export default {
    name: 'Nav',
    data () {
      return {}
    }
  }
</script>

<style lang="sass" scoped>
  nav
    a 
      position: absolute;
      top: 0px;
      left: 0px;
      display: block;
      font-size: 2em;
      padding: 20px;
      color: rgba(white, .25);
      text-decoration: none;
      z-index: 10000;

      &:last-child
        left: auto;
        right: 0px;
</style>