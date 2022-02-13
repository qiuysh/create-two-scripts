/** @format */

const { merge } = require("webpack-merge");
const webpack = require("webpack");
const getWebpackBase = require("./base");

module.exports = function (program) {
  const baseConfig = getWebpackBase(program),
    { plugins } = baseConfig;

  // 配置合并 开发环境下 publicPath 指定为 / 与 webpack server 一致
  return merge(baseConfig, {
    mode: "development",
    devtool: "cheap-module-source-map",
    plugins,
  });
};
