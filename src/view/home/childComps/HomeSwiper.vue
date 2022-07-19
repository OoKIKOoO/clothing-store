<template>
  <swiper :banner="image" :isshow="true" v-on="$listeners"></swiper>

</template>

<script>
import Swiper from 'components/common/swiper/Swiper'
import {getHomeMultidata} from 'network/home.js'

export default {
  name: 'HomwSwiper',
  data() {
    return {
      banner: [],
      image:[]
    }
  },
  components: {
    Swiper
  },
  created() {
    getHomeMultidata().then(res => {
      this.banner = res.data.data.banner.list;
      for(let i of this.banner) {
        this.image.push(i.image)
      }
    }).catch(err => {
      console.log(err);
    })
    
  },
  methods: {
  },

}
</script>

<style scoped>
.swiper-demo,.swiper-container {
  height: 44vw;
}
.swiper-container {
  width: 100%;
  margin: 0 auto;
  --swiper-theme-color: #fff;
}
.swiper-slide img{
  width: 100%;
  height: 44vw;
}
</style>