
<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item) in detailInfo.detailImage[0].list" :src="item" alt="" :key="item" @load="imgLoad">
    </div>
  </div>
</template>

<script>
import {debounce} from 'common/utils/Utils'

	export default {
		name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object
      },
    },
    data() {
      return {
        counter: 0,
        imagesLength: 0
      }
    },
    methods: {
      imgLoad(){
        // 性能优化：等图片全部加载完了，进行一次回调即可
        // 设置一个计数器，每加载完一张图片计数器加1
        if(++this.counter === this.imagesLength){
          this.$emit('imageLoad')
        }
      },
      // debounce(fun, delay) {
      //   let timer = null;
      //   return (...args) => {
      //     if(timer) clearTimeout(timer);
      //     timer = setTimeout(() => {
      //       fun.apply(this, ...args)
      //     },delay)
      //   }

      // }


    },
    /*
     * 监听某个属性的变化
     */
    watch: {
      detailInfo(){
        // imagesLength 初始为 0，通过监听 this.detailInfo.detailImage[0].list.length，更新 imagesLength
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    }
	}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-desc {
    padding: 0 15px;
  }
  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }
  .info-desc .start {
    float: left;
  }
  .info-desc .end {
    float: right;
  }
  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }
  .info-desc .end::after {
    right: 0;
  }
  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }
  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }
  .info-list img {
    width: 100%;
  }
</style>
Footer
© 2022 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
