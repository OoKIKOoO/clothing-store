<template>
  <div>
    <cart-list-item v-for="item in getCart" :key="item.iid" :item-info="item" ></cart-list-item>
  </div>
</template>

<script>
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

</style>