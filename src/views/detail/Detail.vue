<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav"
                    ref="navBar"
                    @itemClick="itemClick"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment ref="comment" :comment="comment"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar class="detail-bottom-bar" @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

<!--    <toast :message="message" :isShow="isShow"/>-->
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailComment from "./childComps/DetailComment";
  import GoodsList from "components/content/goods/GoodsList";
  import DetailBottomBar from "./childComps/DetailBottomBar";


  import {backTopMixin, itemListenerMixin} from "../../common/mixin";
  import Scroll from "components/common/scroll/Scroll";

  import {getDetail, Goods, GoodsParam, Shop, getRecommend} from "../../network/detail";
  import {debounce} from "../../common/utils";

  import {mapActions} from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailComment,
      GoodsList,
      DetailBottomBar,


    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        comment: {},
        recommends: [],
        detailTopYs: [],
        getDetailTopYs: null,
        // message: '',
        // isShow: false
      }
    },
    created() {
      // 1. 保存传入的iid
      this.iid = this.$route.params.iid

      // 2. 根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1. 获取顶部的轮播图数据
        // console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3. 获取店铺信息
        this.shop = new Shop(data.shopInfo)

        // 4. 保存商品的详情数据
        this.detailInfo = data.detailInfo

        // 4. 获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //获取评论
        if (data.rate.cRate != 0) {
          this.comment = data.rate.list[0];
        }

      })

      // 3. 请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      this.getDetailTopYs = debounce(() => {
        this.detailTopYs = []
        this.detailTopYs.push(0)
        this.detailTopYs.push(this.$refs.param.$el.offsetTop)
        this.detailTopYs.push(this.$refs.comment.$el.offsetTop)
        this.detailTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.detailTopYs)
      })
    },
    mounted() {
    },
    updated() {
    },
    destroyed() {
      // console.log('aa');
      // 2. 取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getDetailTopYs()
      },
      itemClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.detailTopYs[index], 200)
      },
      contentScroll(position) {
        const positionY = -position.y
        // console.log(positionY);
        if (positionY <= this.detailTopYs[1]){
          this.$refs.navBar.currentIndex = 0
        }else if ((positionY > this.detailTopYs[1]) && (positionY <= this.detailTopYs[2])){
          this.$refs.navBar.currentIndex = 1
        }else if ((positionY > this.detailTopYs[2]) && (positionY <= this.detailTopYs[3])){
          this.$refs.navBar.currentIndex = 2
        }else if ((positionY > this.detailTopYs[3])){
          this.$refs.navBar.currentIndex = 3
        }

        this.listenShowBackTop(position)
      },
      addToCart() {
        console.log('---');
        // 1. 获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.price = this.goods.realPrice
        product.desc = this.goods.desc
        product.iid = this.iid
        console.log(product)
        console.log(this.goods)
        // 2. 将商品添加到购物车里
        this.addCart(product).then(res => {
          // this.isShow = true;
          // this.message = res;
          // setTimeout(() => {
          //   this.isShow = false;
          //   this.message = '';
          // }, 1500)
          // console.log(res)
          this.$toast.show('加入购物车成功', 1500)
        })

        // this.$store.dispatch('addCart',product).then( res => {
        //    console.log(res)
        // })
      }
    }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }

  .detail-bottom-bar {

  }
</style>
