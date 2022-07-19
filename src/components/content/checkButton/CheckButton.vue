<template>
  <div class="check-button" :class="{styActive: isActive}" @click="changeActive">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'CheckButoon',
  props: {
    isActive: {
      type: Boolean,
      default: true
    }
  },
  computed: {

  },
  methods: {
    changeActive() {
      this.$emit('changeActive')
    }
  },
}
</script>

<style>
.check-button{
  width: 20px;
  height: 20px;
  display: flex;
  padding: 2px 2px;
  border-radius: 3px;
  background-color: rgba(100, 100, 100, .2);
}
.styActive{
  background-color: var(--color-high-text);
}
</style>