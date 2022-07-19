<template>
  <div
    class="Detail"
    id="Detail"
    
  >
    <detail-item class="detail-item" @getCurrentIndex="getCurrentIndex" ref="detailItem"></detail-item>
    <!-- <div v-for="(item, index) of $store.state.cartList" :key="index">item</div> -->
    <b-scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @getPosition="contentScroll"
    >
      <swiper
        :banner="swiperImage"
        :isshow="false"
        ref="swiper"
      ></swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" ref="goodsInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="commentInfo"></detail-comment-info>
      <goods-list :goods="reCommends" ref="goodsList"></goods-list>
    </b-scroll>
    <back-top @click.native="backClick(0,0)" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>

  </div>
</template>

<script>
import { getDetail, getRecommend, Goods, Shop } from 'network/detail.js'

import DetailItem from './childComps/DetailItem.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import swiper from 'components/common/swiper/Swiper'
import BScroll from 'components/common/bscroll/BScroll'
import GoodsList from 'components/content/goodslist/GoodsList'
import {debounce, throttle} from 'common/utils/Utils'
import BackTop from 'components/common/backtop/BackTop'

import { mapActions } from 'vuex'

// import cart from 'view/cart/Cart'
// import router from 'router'
// import store from '../../store'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      swiperImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      reCommends: [],
      detailTop: 0,
      commentTop: 0,
      themeTops: [],
      getThemeTopYs: null,
      currentIndex: 0,
      isShowBackTop: false
    }
  },
  activated() {
  },
  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid;

    // 2. 根据iid请求详情数据
    getDetail(this.iid).then(res => {

      // console.log(res);
      const data = res.data.result;
      this.swiperImage = res.data.result.itemInfo.topImages;
      console.log(this.swiperImage);

      // 3. 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      // 4. 创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // 5. 获取商品详细信息
      this.detailInfo = data.detailInfo

      // 6. 获取商品参数信息
      this.paramInfo = data.itemParams

      // 7. 获取评论信息
      if(data.rate.cRate) {
        this.commentInfo = data.rate.list[0]
      }

      // 
    })

    // 3. 请求推荐详情数据
    getRecommend().then(res => {
      console.log(res);
      this.reCommends = res.data.data.list;

      // this.reCommend = data.
    })

    // 把当导航条的高度存储起来
    this.getThemeTopYs = debounce(() => {
      this.themeTops = [];
      this.themeTops.push(0);
      this.themeTops.push(this.$refs.goodsInfo.$el.offsetTop);
      this.themeTops.push(this.$refs.commentInfo.$el.offsetTop);
      this.themeTops.push(this.$refs.goodsList.$el.offsetTop);
      this.themeTops.push(Number.MAX_VALUE);
      console.log("防抖成功获取数据：",this.themeTops);
    },100)
    
  },
  components: {
    DetailItem,
    swiper,
    DetailBaseInfo, 
    DetailShopInfo, 
    BScroll, 
    DetailGoodsInfo, 
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
  },
  methods: {
    // 等所有图片都加在好即触发回调
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopYs(); 
    },
    getCurrentIndex(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTops[index], 500);
      this.currentIndex = index;
      console.log("themeTops[1]",this.themeTops[1]);
    },
    contentScroll(position) {
      const positionY = -position.y;
      this.isShowBackTop = positionY > this.themeTops[1];
      let length = this.themeTops.length;
      for(let i = 0; i< length-1; i++){
        // if(this.currentIndex !== i 
        // && (i < length - 1 
        // && positionY >= this.themeTops[i] 
        // && positionY < this.themeTops[i+1]) 
        // || (i === length - 1 
        // && positionY >= this.themeTops[i])){
          // 简化判断，在数组多添加一个大的数，避免数组越界
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTops[i] &&
          positionY < this.themeTops[i + 1]
        ) {
          // console.log(i);
          this.currentIndex = i;
          // 传递到 NavBar 组件中
          this.$refs.detailItem.currentIndex = this.currentIndex;
        }
      }
      
      // console.log("positionY",positionY);
      // console.log("正：",this.themeTops[this.currentIndex]);
      // console.log("加一：",this.themeTops[this.currentIndex-1]);
      // if(positionY < this.themeTops[this.currentIndex] && positionY >= this.themeTops[this.currentIndex-1]){
      //   this.$refs.detailItem.itemClick(this.currentIndex);
      //   this.currentIndex++
      //   console.log("11");
      // }
    },
    backClick(x, y, time = 300) {
      this.$refs.scroll.scrollTo(x, y, time);
    },
    addToCart() {
      // 1. 构造数据结构
      const product = {};
      product.image = this.swiperImage[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.iid = this.iid;
      product.isActive = true;
      // this.$router.push('/cart')
      // console.log("添加购物车");
      // this.$store.commit('addCart', product)
      // 2. 发送数据
      this.addCart(product).then(res => {
        console.log(res);
      })
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })
      
    }
  },
  mounted() {
    // setTimeout(() => {
    //   console.log("offsetTop2",this.$refs.goodsInfo.$el.offsetTop);
    //   this.themeTops[1] = this.$refs.goodsInfo.$el.offsetTop;
    //   this.themeTops[2] = this.$refs.commentInfo.$el.offsetTop;
    //   this.themeTops[3] = this.$refs.goodsList.$el.offsetTop;
    // },500)
  },
}
</script>

<style lang="scss" scoped>
.swiper-demo {
  height: 60vh;
}
.Detail {
  width: 100%;

  .content {
    position: absolute;
    top: 44px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
}
</style>