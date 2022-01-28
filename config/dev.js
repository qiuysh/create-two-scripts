const { merge } = require('webpack-merge');
const webpack = require('webpack');
const getWebpackBase = require('./base');
const devServer = require('./devServer');

module.exports = function (program) {
  const plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ];
  
  const baseConfig = getWebpackBase(program);
  // 配置合并 开发环境下 publicPath 指定为 / 与 webpack server 一致
  return merge(baseConfig, {
    devtool: 'cheap-module-source-map',
    plugins,
    devServer
  });
};
