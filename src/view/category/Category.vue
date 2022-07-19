<template>
  <div class="wrapper" ref="wrapper">
    <div class="Category">
      分类
    </div>
    
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Category',
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{

    })
  },
}
</script>

<style lang="scss" scoped>
.Category {
  width: 100%;
  height: 1000px;
  background-color: palegoldenrod;
  overflow: hidden;
}

</style>