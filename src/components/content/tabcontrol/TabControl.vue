<template>
    <div class="TabControl" >
      <div class="TabControlItem" v-for="(item, index) in tabs" :key="index" :class="{active: index === currentIndex}" @click="tabClick(index)">
        <span>{{item}}</span>
      </div>
    </div>
    <!-- <div class="TabsView"></div> -->
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      currentIndex: 0,
      isFixed: false
    }
  },
  props: {
    tabs: {
      type: Array,
      default() {
        return []
      }
    }
  },

  methods: {
    tabClick(index) {
      this.currentIndex = index
      this.$emit('itemIndex',index)
    },
    TabFixed() {
      this.isFixed = true
    }
  },
}
</script>

<style lang="scss" scoped>

.TabControl {
  margin-top: 10px;
  // box-shadow:0px -10px 1px rgba(100,100,100,.1);
  width: 100%;
  height: 45px;
  display: flex;
  text-align: center;
  top: 44px;
  background-color: #fff;
  align-items: center;
  z-index: 99;
  .TabControlItem {
    flex: 1;
    span {
      padding-bottom: 5px;
    }
  }
  .active span{
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-high-text);
  }
}
.TabsView {
  height: 700px;
  width: 100%;
  background-color: rosybrown;
}

// fixed\strick最好在使用原生滚动时使用
.isFixed {
  // position: fixed;
  // top: 44px;

}

</style>