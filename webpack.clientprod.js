var merge = require('webpack-merge');
var webpack = require('webpack');
var common = require('./webpack.common.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
              'process.env.NODE_ENV': '"production"'
            }),
            new webpack.optimize.AggressiveMergingPlugin(),
            new CompressionPlugin({
              asset: "[path].gz[query]",
              algorithm: "gzip",
              test: /\.js$|\.css$|\.html$|\.svg$/,
              minRatio: 0.8
            }),
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true 
        }),
      new OptimizeCSSAssetsPlugin({})
      ],
    }
});
