<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'BScroll',
  data() {
    return {
      scroll: null,
      isShow: false
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 1. 创建BScroll实例
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true,
      observeImage: true,
      observeDOM: true,
      disableTouch: false
    })

    // 2. 监听滑动值
    if(this.probeType === 2 || this.probeType ===3) {
      this.scroll.on('scroll',(position) => {
      this.$emit('getPosition',position)
    })
    }
    

    // 3.监听上拉加载更多商品的事件
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp',() => {
      this.$emit('getLoadGoods');

      // setTimeout(() => {
      //   this.scroll.finishPullUp()
      // }, 2000);
    })
    }
    
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  },

}
</script>

<style lang="scss" scoped>

</style>