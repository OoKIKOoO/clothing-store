<template>
  <div class="GoodsList">
    <goods-list-item v-for="(item, id) in goods" :key="id" :goodsItem="item">
    </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  name: 'GoodsList',
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  }
}
</script>

<style scoped>

.GoodsList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content:space-around;
    align-items: bas;
  }
</style>