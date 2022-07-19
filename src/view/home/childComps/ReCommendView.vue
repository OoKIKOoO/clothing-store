<template>
  <div class="re-com-view">
    <div class="rcv-item" v-for="item in recommend" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReCommendView',
  props: {
    recommend: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.re-com-view{
  display: flex;
  width: 100%;
  height: 35vw;
  text-align: center;
  align-items: center;
  font-size: 14px;
  border-bottom: rgba(100, 100, 100, .1) 10px solid;
  .rcv-item{
    width: 15vw;
    flex: 1;
    height: 15vw;
    margin-top: -20px;
    img {
      width: 18vw;
    }
    p{
      padding-top: 5px;
    }
}
}

</style>