<template>
  <div class="cart-btm-btn">
    <div class="left">
      <check-button v-model="isActive1" :isActive="isActive" @changeActive="isAllShop"></check-button>
      <span>全选</span>
    </div>
    <div class="center">总金额：¥{{getCartPrice.countPrice}}</div>
    <div class="right">去计算({{getCartPrice.countNum}})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  name: 'cart-btm-btn',
  data() {
    return {
      isActive: false
    }
  },
  components: {
    CheckButton
  },
  methods: {
    isAllShop() {
      // this.$emit('isAllShop');
      console.log("wowowo",this.getCart);
      this.isActive = !(this.getCart.filter(item => item.isActive).length)
      this.isNull();
      this.$store.dispatch('isAll',this.isActive);
    },
    isNull() {
      if(this.getCart.length === 0){
        this.isActive = false
        // alert('没有东西')
      }
    },
    ...mapActions(['isAll'])
  },
  computed: {
    ...mapGetters(['getCartPrice','getCart']),
    isActive1() {
      // this.isActive = !(!(this.getCart.filter(item => item.isActive).length))
      this.isActive = this.getCart.every(item => {
        return item.isActive
      })
      this.isNull();
      
    }
  },
  mounted() {
  },
}
</script>

<style lang="scss" scoped>
.cart-btm-btn{
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  width: 100%;
  background-color: rgb(240, 240, 240);
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  .left {
    display: flex;
    width: 90px;
    padding-left: 10px;
    align-items: baseline;
    span {

    }
  }
  .center{ 
  }
  .right{
    width: 100px;
    background-color: var( --color-tint);
    color: #fff;
    height: 40px;
    line-height: 40px;
    padding-left: 5px;
  }
}
</style>