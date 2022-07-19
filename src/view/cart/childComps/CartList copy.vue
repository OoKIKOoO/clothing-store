<template>
  
  <div class="cart-list">
    <!-- <b-scroll
      class="content"
      ref="scroll"
  > -->
    <cart-list-item
    v-for="item in getCart" :key="item.iid" :item-info="item"
    ></cart-list-item>
    <!-- </b-scroll> -->
  </div>
</template>

<script>
// import BScroll from 'components/common/bscroll/BScroll'

import CartListItem from './CartListItem.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'CartList',
  components: {
    CartListItem, 
  },
  computed: {
    ...mapGetters(['getCart'])
  },
  methods: {
  },
}
</script>

<style>
/* .content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 50px;
} */
.cart-list {
height: calc(100% - 44px - 49px - 44px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>