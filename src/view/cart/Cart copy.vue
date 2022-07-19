<template>
  <div>
    <!-- 导航 -->
    <!-- <nav-bar class="nav-bar">
      <div slot="center">购物车({{getCartLength}})</div>
    </nav-bar> -->
    <!-- 商品的列表 -->
    <div class="cart-list-box">
      <!-- <bscroll class="content" ref="scroll" > -->
      <cart-list></cart-list>
      <!-- </bscroll> -->
    </div>
    
    <!-- 底部汇总 -->

  </div>
</template>

<script>
import CartList from './childComps/CartList.vue'
import NavBar from 'components/common/navbar/NavBar'
// import bscroll from 'components/common/bscroll/BScroll'
import { mapGetters } from 'vuex'
export default {
  name: 'Cart',
  data() {
    return {
      cartLength:0
    }
  },
  components: {
    NavBar, 
    // bscroll,
    CartList
  },
  computed: {
    ...mapGetters(['getCart', 'getCartLength'])
  },
  methods: {
    // contentScroll(position) {

    // }
  },
}
</script>

<style lang="scss" scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
// .cart-list-box{
//   height: calc(100% - 44px);
// }
</style>