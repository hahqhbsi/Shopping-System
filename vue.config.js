const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  productionSourceMap:false,
  //代理跨域
  devServer:{
    proxy: {
      '/api': {
        target: 'http://39.98.123.211:8170/',//数据来自
        
      },
      // '/product': {
      //   target: 'http://39.98.123.211:8510',
      //   pathRewrite: { '^/product': '' }
      // }
    }
  }
})
