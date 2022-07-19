<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" :key="showImage" alt="">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">¥ {{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {
          
        }
      }
    }
  },
  computed: {
    showImage() {
      // 顺序不能错，因为如果show.img在前，但是却获取不到show，是undefind，点不出img所以会报错
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods: {
    // imageLoad() {
    //   this.$bus.$emit('itemImageLoad')
    // }
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  },
  
}
</script>

<style lang="scss" scoped>
.goods-item {
  position: relative;
  width: 47%;
  padding-bottom: 10px;
  z-index: 1;
  img {
    width: 100%;
    height: 70vw;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    p {
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      // 设置文本不换行
      white-space:nowrap;
      padding: 2px 5px;
    }
    span {
      width: 50px;
      text-align: center;
    }
    .price {
      color: var(--color-high-text);
    }
    .collect {
      position: relative;
      text-align: left;
      padding-left: 13px;
      &::before{
        position: absolute;
        content: '';
        left: 0px;
        top: 0px;
        width: 14px;
        height: 14px;
        background: url('~assets/img/common/collect.svg') 0 0/13px no-repeat;
      }
    }
  }
}

  /* .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  } */
</style>