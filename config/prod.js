/** @format */

const { merge } = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const getWebpackBase = require("./base");
const { getUserConf } = require("./defaultPaths");

module.exports = function (program) {
  // default webpack config
  const webpackBaseConfig = getWebpackBase(program),
    // user custom webpack config
    appUserConf = getUserConf(),
    // split plugin
    { plugins = [], optimization } = webpackBaseConfig;

  if (Array.isArray(optimization?.minimizer)) {
    optimization.minimize = true;
    const jsTerserPlugin = new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      cssMini = new CssMinimizerPlugin();
    optimization.minimizer.push(jsTerserPlugin);
    optimization.minimizer.push(cssMini);
  }

  if (Array.isArray(plugins)) {
    const splitPlugin =
      new webpack.optimize.SplitChunksPlugin({
        // webpack 5.x 推荐使用默认配置或使用 optimization.splitChunks: { chunks: 'all' } 配置；
        chunks: "all",
        // （默认值：30000s）块的最小大小
        minSize: 30000,
        maxSize: 600000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          antd: {
            name: "antd",
            test: /[\\/]node_modules[\\/]antd[\\/]/,
            chunks: "initial",
          },
          lodash: {
            name: "lodash",
            test: /[\\/]node_modules[\\/]lodash[\\/]/,
            chunks: "initial",
            // 默认组的优先级为负数，以允许任何自定义缓存组具有更高的优先级（默认值为0）
            priority: -10,
          },
          defaultVendors: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-redux|react-router-dom|moment|js-cookie)[\\/]/,
            name: "default-vendors",
            chunks: "all",
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      });
    plugins.push(splitPlugin);
  }

  return merge(webpackBaseConfig, {
    ...appUserConf,
    mode: "production",
    devtool: false,
    devServer: {},
  });
};
