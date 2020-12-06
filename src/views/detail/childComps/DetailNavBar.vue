<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" class="back">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles"
             class="item"
             @click="itemClick(index)"
             :class="{active: index === currentIndex}">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('itemClick', index)
      },
      backClick() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 12px;
  }

  .item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back {
    margin-top: 12px;
  }
</style>
