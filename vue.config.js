module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'view': '@/view',
        'router': '@/router'
        
      }
    },
    devtool: 'source-map'
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/init.scss";`
      }
    }
  }
}