<template>
  <div id="Home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <tab-control 
    :tabs="tabs" 
    @itemIndex="itemIndex" 
    ref="TabControl1" 
    class="tab-control"
    v-show="isShowTab">
    </tab-control>

    <b-scroll 
    class="content homecontent" 
    ref="scroll" 
    @getPosition="contentScroll"
    :probe-type="3"
    :pull-up-load="true"
    @getLoadGoods="getLoadGoods"
    >
      <home-swiper @getImageLoad="getImageLoad"/>
      <re-commend-view :recommend="recommends"></re-commend-view>
      <re-commend-bg></re-commend-bg>
      <tab-control :tabs="tabs" @itemIndex="itemIndex" ref="TabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </b-scroll>

    <back-top @click.native="backClick(0,0)" v-show="isShowBackTop" ></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import ReCommendView from './childComps/ReCommendView'
import ReCommendBg from './childComps/ReCommendBG'

import TabControl from 'components/content/tabcontrol/TabControl'
import NavBar from 'components/common/navbar/NavBar'
import GoodsList from 'components/content/goodslist/GoodsList'
import BScroll from 'components/common/bscroll/BScroll'
import BackTop from 'components/common/backtop/BackTop'

import {itemListenerMixin} from "common/mixin"
import { debounce } from 'common/utils/Utils'

import {
  getHomeMultidata,
  getHomeGoods
  } from "network/home.js"
export default {
  name: 'Home',
  // mixins: [itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      tabs: ['流行','新款','精选'],
      goods: {
        'pop': {page: 0, list: [], scrollY: 0},
        'new': {page: 0, list: [], scrollY: 0},
        'sell': {page: 0, list: [], scrollY: 0}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isShowTab:false,
      saveY: 0,
    }
  },
  components: {
    HomeSwiper,
    ReCommendView,
    ReCommendBg,
    TabControl,
    NavBar,
    GoodsList, 
    BScroll,
    BackTop
  },
  created() {
    // 获取muldata数据
    this.getHomeMultidata();
    // 获取goods数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    },
    // haha() {
    //   // return this.$refs.TabControl.$el.getBoundingClientRect()
    // }
  },
  // 挂载完了图片不一定挂载完了
  destroyed() {
    this.saveY = this.$refs.scroll.getScrollY();

    console.log("销毁了");
    // 监听item中图片加载完成
    // this.$bus.$on('itemImageLoad', () => {
    //   const refresh = this.debance(this.$refs.scroll.refresh, 200);
    //   this.$refs.scroll && refresh();
    // })
    
  },
  mounted() {
    setTimeout(() => {
      for(let type in this.goods) {
        this.goods[type].scrollY = -this.tabOffsetTop;
      }
      console.log("mounted:",this.goods);
    }, 1000);
  },

  /**
   * 使用keep-alive保存Home组件的状态
   * 重新回到home组件时，停留在离开时的位置
   */
  activated() {
    // this.$refs.scroll.scrollTo(0, this.goods[this.currentType].scrollY, 1);
    this.$refs.scroll.scrollTo(0, this.saveY, 1)
    this.$refs.scroll.refresh();
    // console.log("activated",this.goods);

  },
  deactivated() {
    // this.goods[this.currentType].scrollY = this.$refs.scroll.getScrollY();
    this.saveY = this.$refs.scroll.getScrollY();
    // 取消全局事件的监听
    // this.$bus.$off("item")
    // console.log(this.currentType);
    // console.log("deactivated",this.goods);
  },
  
  watch: {
  },
  methods: {
    /**
     * 事件监听方法
     */
    itemIndex(index){
      switch(index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      this.$refs.TabControl1.currentIndex = index;
      this.$refs.TabControl2.currentIndex = index;
    //   console.log(this.goods[this.currentType].scrollY);
    //   console.log("====",this.goods[this.currentType].scrollY);
    // this.$refs.scroll.scrollTo(0, this.goods[this.currentType].scrollY, 1)
    //   this.$refs.scroll.refresh()

    console.log("methods",this.goods);
    },
    // 回到顶部监听
    backClick(x, y, time = 300) {
      this.$refs.scroll.scrollTo(x, y, time);
    },
    // 监听页面滚动
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > this.tabOffsetTop; 
      
      this.isShowTab = (-position.y) >= this.tabOffsetTop;

      // this.throttle(function() {
    // this.goods[this.currentType].scrollY = this.$refs.scroll.getScrollY()
      // },500)


    },
    // 上拉加载更多
    getLoadGoods() {

      this.getHomeGoods(this.currentType);

    },
    getImageLoad() {
      // 获取tabControl的offsetTop滚动到多少时就吸顶
      // 但是，在轮播图没有加载完成时候，offsetTop计算不准确
      // 我们应该加一个监听图片是否加载完成的事件。
        this.tabOffsetTop = this.$refs.TabControl2.$el.offsetTop
        // console.log(this.tabOffsetTop);
    },
    // 监听图片加载完成
    // imageLoad() {
    //   // 刷新防抖
    //   const refresh = debounce(this.$refs.scroll.refresh, 200);
    //   // 对监听器进行保存
    //   this.itemImgListener = () => {
    //     refresh();
    //   };
    //   this.$bus.$on("itemImageLoad", this.itemImgListener);
    //   // 取消监听器
    //   // this.$bus.$off("itemImageLoad", this.itemImgListener);
    // },
    /**
     * 网络请求相关
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      this.banners = res.data.data.banner.list;
      this.recommends = res.data.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page++;
        this.$refs.scroll.finishPullUp();
      })

    }
  },
}
</script>

<style lang="scss" scoped>
#home {
  height: 100vh;
  position: relative;
}
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: sticky;
    height: 44px;
    top: 0;
    z-index: 99;
  }
  .homecontent {
    position: absolute;
    top: 44px;
    bottom: 44px;
    left: 0;
    right: 0;
    overflow: hidden;

    height: calc(100% - 88px);

  }
  .tab-control{
    position: relative;
    top: -10px;
    z-index: 999;
  }

</style>