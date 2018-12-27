'use strict'
const fs = require('fs')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)


const devWebpackConfig = merge(baseWebpackConfig, {
  entry: config.dev.entries,
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      // rewrites: [
      //   { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      // ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    inline: true,
    host: '0.0.0.0',
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    public: `${config.dev.host}:${config.dev.port}`,
    publicPath: config.dev.assetsPublicPath,
    disableHostCheck: true,
    proxy: config.dev.proxyTable,
    openPage: config.dev.openPage,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
  ]
})


for (var moduleName in config.dev.entries) {
  var conf = {
    filename: moduleName + '/index.html',             // html文件输出路径
    template: `./src/${moduleName}/index.html`, // 模板路径 
    inject: 'body',
    chunks: [moduleName, 'vendor'],
    hash: false,
    minify: {
      //压缩设置
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  };

  devWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf));

  // CopyWebpackPlugin：处理静态资源
  let copyWebpackPluginItems = []
  if (fs.existsSync(path.resolve(__dirname, '../static'))) {
    copyWebpackPluginItems.push(
      //共享static资源
      {
        from: path.resolve(__dirname, '../static'),
        to: moduleName + "/" + config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    )
  }
  if (fs.existsSync(path.resolve(__dirname, `../src/${moduleName}/static`))) {
    copyWebpackPluginItems.push(
      //独享static资源
      {
        from: path.resolve(__dirname, "../src/" + moduleName + "/static"),
        to: moduleName + "/" + config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    )
  }
  devWebpackConfig.plugins.push(new CopyWebpackPlugin(copyWebpackPluginItems))

}



function p(v, c) {
  let space = "";
  let len = 10 - v.length
  for (let index = 0; index < len; index++) {
    space += (c ? c : " ")
  }
  return space;
}


module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      let hostA = `http://${devWebpackConfig.devServer.public}`;
      let hostB = `${config.dev.domain}`;
      let messages = ['Your applications is running here:'];
      messages.push(`----------------------------------------------------------------------------------------------------`);
      for (var entry in devWebpackConfig.entry) {
        let netAddressA = `${hostA}${config.dev.vuePublicPath}/${entry}/index.html${p(entry)}`;
        let netAddressB = `${hostB}${config.dev.vuePublicPath}/${entry}/index.html`;
        if (config.dev.domain) { 
          messages.push(`${netAddressA}${p(entry)}or ${netAddressB}`);
        } else {
          messages.push(netAddressA)
        }
      }
      messages.push(`----------------------------------------------------------------------------------------------------`);
      if (config.dev.domain) {
        messages.push(`pls remember start your nginx service!!! [xsh nginx start]`);
      }
      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: { 
          messages: messages,
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
