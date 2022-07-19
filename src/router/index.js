import Vue from 'vue'
import VueRouter from 'vue-router'

const Cart = () => import('view/cart/Cart')
const Home  = () => import('view/home/Home')
const Category = () => import('view/category/Category')
const Profile = () => import('view/profile/Profile')
const Detail = () => import('view/detail/Detail')

// 1. 安装插件
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/home',
    meta: {
      title: '首页',
      footShow:true
    }
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页',
      footShow:true
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: '购物车',
      footShow:true
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: '分类',
      footShow:true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '我的',
      footShow:true
    }
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta: {
      title: '详情页'
    }
  }
]

// 2. 创建router
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 导出路由
export default router
