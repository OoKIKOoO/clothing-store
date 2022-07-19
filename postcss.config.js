module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 320,  // 视窗的宽度
      viewportHeight: 667, // 视窗的高度
      unitPrecision: 5, // 指定'px'转换为视窗单位值的小数位数
      unitToConvert: 'px', // 要转化的单位
      viewportUnit: 'vw', // 指定需要转换成的视窗单位
      fontViewportUnit: 'vw', //指定字体需要转换成的视窗单位
      propList: ["*"], // 指定转换的css属性的范围，*代表全部css属性的单位都进行转换
      selectorBlackList: ['ignore','tab-bar','TabControl','tab-control','bottom-menu','check-button','nav-bar','cart-btm-btn','homecontent','cartcontent'], // 指定不需要转换的类
      minPixelValue: 1, // 小于或等于'1px'不转换为视窗单位
      mediaQuery: false, // 允许在媒体查询中转换'px'
      exclude: [/TabBar$/] // 忽略某些特定文件，不转换（正则格式）
    }
  }
}

/**
 * 在js中使用正则：/正则/
 * 在exclude中存放的元素必须是正则表达式
 * 按照排除的文件写对应的正则
 */