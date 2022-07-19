import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import vueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.prototype.$store = store

Vue.use(vueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
});

// 事件总线  GoodsItem -》事件总线 -》 Home
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
