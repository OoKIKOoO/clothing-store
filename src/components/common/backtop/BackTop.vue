<template>
  <div class="BackTop">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  data() {
    return {
      
    }
  },
  methods: {
    backtop() {

    }
  },
}
</script>

<style lang="scss" scoped>
.BackTop {
  position: fixed;
  z-index: 99;
  right: 10px;
  bottom: 50px;
  img{
    width: 50px;
    height: 50px;
  }
}
</style>