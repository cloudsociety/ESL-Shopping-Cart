<template>
  <h1 class="cart__header">
    <img src="./assets/logo.png">
  </h1>
</template>

<script>
  export default {
    data: function() {
      return {
        // someKey: someItem
      }
    }
  }
</script>

<style lang="scss">
.cart__header {
  text-align:center;

  & img {
    max-height: 100px;
  }
}
</style>
