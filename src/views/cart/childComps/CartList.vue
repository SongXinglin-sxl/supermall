<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :item="item"/>
    </scroll>
  </div>
</template>

<script>
  import CartListItem from "./CartListItem";
  import Scroll from "components/common/scroll/Scroll";
  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    components: {
      CartListItem,
      Scroll
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  /*.cart-list {*/
  /*  height: 100vh;*/
  /*}*/

  .content {
    position: absolute;
    top: 44px;
    right: 0;
    left: 0;
    bottom: 89px;
    overflow: hidden;
  }
</style>
