import { ADD_CART, ADD_CART_COUNT, CHANGE_ACTIVE, IS_ALL } from './mutationsType'
const mutations = {
  [ADD_CART_COUNT](state, payload) {
    payload.count++;
  },
  [ADD_CART](state, payload) {
    // payload.isActive = true;
    state.cartList.push(payload);
  },
  [CHANGE_ACTIVE](state, iid) {
    for(let item in state.cartList) {
      console.log(item);
      if(item.iid = iid){
        item.isActive = !item.isActive;
      }
    }
  },
  [IS_ALL](state, payload) {
    // for(let item in state.cartList) {
      // 1. 将购物车所有数据的isActive进行转换
      // console.log(payload);
      payload.item.isActive = payload.isActive
      console.log("isAll",payload);
    // }
  },
  

}

export default mutations;