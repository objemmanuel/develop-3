const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = defineConfig({
  // 减少包大小，可以加密源码。这样打包后文件小而且别人看不到你的源码了。(相当于直接不编译map文件)
  productionSourceMap: false,
  transpileDependencies: true,
  css: {
    sourceMap: true,
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }

      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://test.meertalk.org/',
        // target: 'https://qitmeer.io/',
        changeOrigin: true
      },
      '/resource': {
        target: 'https://test.meertalk.org/',
        // target: 'https://qitmeer.io/',
        changeOrigin: true
      }
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config.plugin('html').tap((args) => {
      args[0].title = 'Qitmeer-BMS'
      return args
    })
  },
  configureWebpack: {
    resolve: {
      fallback: { path: require.resolve('path-browserify') }
    },
    plugins: [
      new NodePolyfillPlugin(),
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css/,
        threshold: 10240,
        deleteOriginalAssets: false
      })
    ]
  }
})
