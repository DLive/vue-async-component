const webpack = require('webpack');
const path = require('path');
const utils = require('./utils');
const TerserPlugin = require("terser-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    AsyncComponent: resolve('/src/components/async-component')
  },
  output: {
    path: resolve('/'),
    filename: '[name].min.js',
    library: "AsyncComponent",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  externals: {
    vue: 'vue'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
        exclude: /node_modules/
      }
    ]
  },
  mode:"development",
  plugins: [
    new VueLoaderPlugin()
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': '"production"'
    // })
    // UglifyJs do not support ES6+, you can also use babel-minify for better treeshaking: https://github.com/babel/minify
    // new webpack.optimize.UglifyJsPlugin({
    //   minimize : true,
    //   sourceMap : false,
    //   mangle: true,
    //   compress: {
    //     warnings: false
    //   }
    // })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
