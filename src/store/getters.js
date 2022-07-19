const getters = {
  getCart: state => {
    return state.cartList;
  },
  getCartLength: state => {
    return state.cartList.length;
  },
    // 2. 汇总价格、数量
  getCartPrice: state => {
    // 购物车总价格
    let countPrice = 0.0;
    // 购物车总数量
    let countNum = 0
    for(let item of state.cartList) {
      if(item.isActive) {
        console.log("单价",item.price);
        // 将价格数据通过正则表达式获取正确格式然后转换成partInt格式；
        let price = item.price.split(/¥|~/)
        countPrice += parseFloat(price[1]) * item.count
        countNum += item.count
      }
    }
    countPrice = countPrice.toFixed(2);
    console.log("总金额",countPrice);
    return { countPrice, countNum }
  },

}

export default getters;