import { ADD_CART, ADD_CART_COUNT, CHANGE_ACTIVE, IS_ALL } from './mutationsType'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = null;
      for(let item of context.state.cartList) {
        if(item.iid === payload.iid) {
          oldProduct = item;
        }
      }
      if(oldProduct) {
        context.commit(ADD_CART_COUNT, oldProduct);
        resolve("当前商品数量+1")
      }else {
        payload.count = 1;
        context.commit(ADD_CART, payload);
        resolve("添加购物车成功")
      }
    })
  },
  // 是否全选
  isAll(context, isActive) {
    console.log(context.state.cartList);

    for(let item of context.state.cartList) {
      // console.log(payload);
      context.commit(IS_ALL, {item, isActive})
      
    }
  },
  // // 汇总价格、数量
  // getCartCount(context) {
  //   let countPrice = 0.0;
  //   let countNum = 0
  //   for(let item in context.state.cartList) {
  //     if(item.isActive) {
  //       // 将价格数据通过正则表达式获取正确格式然后转换成partInt格式；
  //       let price = item.price.split(/¥|~/)
  //       countPrice += parseFloat(price[1]) * item.count
  //       countNum += item.count
  //     }
  //   }
  //   console.log("总金额",count);
  // }
  
}