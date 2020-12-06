<template>
  <div class="check-button" :class="{check: isCheck}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isCheck: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1.5px solid #aaa;
  }

  .check {
    border: 1.5px solid var(--color-tint);
    background-color: var(--color-tint);
  }

</style>
