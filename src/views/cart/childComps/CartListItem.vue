<template>
  <div class="cart-item">
    <div class="item-selector">
      <check-button :is-check="item.checked" @click.native="checkClick"/>
    </div>
    <div class="item-image">
      <img :src="item.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{item.title}}</div>
      <div class="item-desc">商品描述: {{item.desc}}</div>
      <div class="item-price">￥{{item.price}}</div>
      <div class="item-count">x{{item.count}}</div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  export default {
    name: "CartListItem",
    components: {
      CheckButton
    },
    props: {
      item: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      checkClick() {
        this.item.checked = !this.item.checked
      }
    }
  }
</script>

<style scoped>
  .cart-item {
    width: 100%;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-image {
    padding: 5px;
  }

  .item-image img {
    width: 80px;
    height: 100px;
    border-radius: 5px;
    display: block;
  }

  .item-info {
    font-size: 18px;
    color: #333;
    position: relative;
    overflow: hidden;
    padding: 5px 10px;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

  }

  .item-desc {
    color: rgb(139, 110, 107);
    margin-top: 12px;
    font-size: 13px;
  }

  .item-count {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  .item-price {
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: rgb(255, 69, 0);
  }

</style>
