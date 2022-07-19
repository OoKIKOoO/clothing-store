<template>
  <div class="swiper-demo" v-if="banner.length">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in banner" :key="index" >
          <img :src="item" alt="" @load="imageLoad">
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev" v-if="isNavigation"></div>
      <div class="swiper-button-next" v-if="isNavigation"></div>

    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  name: 'Swiper',
  props: {
    banner: {
      type: Array,
      default() {
        return []
      }
    },
    isshow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isLoad: false,
      isNavigation: true,
      isPagination: true,
      haha: null
    }
  },
  activated() {
    if(!this.isshow){
      this.isPagination = this.isNavigation = false;
    }
    
  },
  created() {
    if(!this.isshow){
      this.isPagination = this.isNavigation = false;
    }
  },
  beforeDestroy() {
    
  },
  updated() {
    console.log("====");
    this.haha = new Swiper('.swiper-container', {
      // direction: 'vertical', // 垂直切换选项 默认横向
      loop: true, // 循环模式选项
      initialSlide: 0,  
      // history: true,

      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // 自动切换
      autoplay:true,
      
    })
  },
  methods: {
    imageLoad() {
      if(!this.isLoad){
        this.$emit('getImageLoad')
        this.isLoad = true;
      }
    },
  },
}
</script>

<style scoped>
.swiper-demo,.swiper-container {
  height: 44vw;
}
.swiper-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  --swiper-theme-color: #fff;
}
.swiper-slide img{
  width: 100%;
  height: 100%;
}

</style>