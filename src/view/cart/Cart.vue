<template>
  <div>
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{getCartLength}})</div>
    </nav-bar>

    <!-- 商品的列表  -->
      <bscroll class="content cartcontent" ref="scroll">
      <cart-list :itemInfo="getCart"></cart-list>
      </bscroll>
    <!-- 底部汇总 -->
    <cart-btm @isAllShop="isAllShop"></cart-btm>
  </div>
</template>

<script>
import CartList from './childComps/CartList.vue'
import CartBtm from './childComps/CartBottomBtn.vue'
import bscroll from 'components/common/bscroll/BScroll'
import NavBar from 'components/common/navbar/NavBar'
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  data() {
    return {

    }
  },
  components: {
    NavBar,
    CartList,
    bscroll,
    CartBtm
  },
  computed: {
    ...mapGetters(['getCart','getCartLength'])
  },
  methods: {
    isAllShop() {
    }
    
  },
  activated() {
    this.$refs.scroll.refresh();
  },
}
</script>

<style lang="scss" scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.cartcontent {
  position: absolute;
  top: 44px;
  bottom: 90px;
  left: 0;
  right: 0;
  overflow: hidden;
}

</style>