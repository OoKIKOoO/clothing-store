<template>
  <div class="DetailItem">
    <nav-bar>
      <div slot="left" class="left" @click="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="center">
        <div 
        v-for="(item, index) in detailTitle" 
        :key="index" class="title" 
        :class="{Active: index === currentIndex}"
        @click="itemClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'DetailItem',
  data() {
    return {
      detailTitle: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  // props: {
  //   indexa
  // },
  components: {
    NavBar
  },
  // props: {
  //   currentI
  // },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('getCurrentIndex',index)
    },
    back() {
      this.$router.back()
    }
  },
}
</script>

<style lang="scss" scoped>
.DetailItem {
  width: 100%;
  position: fixed;
  z-index: 999;
  background-color: #fff;
  .left{
      margin-top: 5px;
  }
  .center {
    display: flex;
    .title{
      flex: 1
    }
    .Active {
      color: var(--color-high-text);
    }
  }
}

</style>