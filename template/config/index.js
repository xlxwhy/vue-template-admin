'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const fs = require('fs');
const path = require('path')
const ip = require('ip')
const glob = require('glob'); 
const VUE_PUBLIC_PATH = "/admin"

const allEntries = getAllEntries(path.resolve(__dirname, '../src/**/main.js'))
const entries = getEntries(allEntries, process.env.entry)

module.exports = {
  dev: {
    entries: entries,
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: VUE_PUBLIC_PATH,
    openPage: `${VUE_PUBLIC_PATH.substring(1)}/${Object.keys(entries)[0]}/index.html`,

    vuePublicPath: VUE_PUBLIC_PATH,
    // Various Dev Server settings
    host: ip.address(), // can be overwritten by process.env.HOST
    port: process.env.port, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    // domain: 'http://www.mwt315.com', 
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true,
    proxyTable: {
    },

  },

  build: {
    entries: entries,

    // Paths
    assetsRoot: path.resolve(__dirname, `../app/public${VUE_PUBLIC_PATH}`),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}






// 获取所有js入口文件
function getAllEntries(globPath, type) {
  var entries = {}
  glob.sync(globPath).forEach(function (entry) {
    var tmp = entry.split('/').splice(-3)
    var moduleName = tmp[1];
    entries[moduleName] = entry
  });
  return entries;

}

// 获取生效的js入口文件
function getEntries(allEntry, entryParam) {
  var entries = {}
  if (entryParam) {
    var entryNames = entryParam.split(",");
    for (let index = 0; index < entryNames.length; index++) {
      const entryName = entryNames[index];
      if (!allEntry[entryName]) {
        console.log(`WARNING: entry [${entryName}] not found! `)
        process.exit(1);
        continue;
      } else {
        entries[entryName] = allEntry[entryName];
      }
    }
  } else {
    entries = allEntry;
  }
  return entries;
}









