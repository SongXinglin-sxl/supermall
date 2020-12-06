<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"
                    :is-check="selectAll"
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:￥{{totalPrice}}
    </div>
    <div class="calculate" @click="calClick">
        结算({{totalCount}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton,
    },
    computed: {
      totalPrice() {
        return this.$store.getters.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      totalCount() {
        return this.$store.getters.cartList.filter(item => item.checked).length
      },
      selectAll() {
        return this.$store.getters.cartList.length === 0 ? false : !this.$store.getters.cartList.find(item => !item.checked)
      }
    },
    methods: {
      checkClick() {
        // console.log('aaa');
        if (this.selectAll){
          this.$store.getters.cartList.forEach(item => item.checked = false)
        } else {
          this.$store.getters.cartList.forEach(item => item.checked = true)
        }
      },
      calClick () {
        if (this.$store.getters.cartList.length === 0 || !this.sellectAll){
          this.$toast.show('请选择购买的商品', 1500)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    bottom: 49px;
    height: 40px;
    width: 100%;
    background-color: rgb(238, 238, 238);
  }

  .check-content {
    display: flex;
    width: 60px;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    font-size: 14px;

  }

  .check-button {
    margin-right: 6px;
    /*background-color: rgb(238, 238, 238);*/
  }

  .price {
    flex: 1;
    color: rgb(123, 123, 123);
    font-size: 15px;
    margin-left: 12px;
  }

  .calculate {
    width: 100px;
    height: 100%;
    color: #fff;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 82, 0);
    border-radius: 20px;
  }
</style>
