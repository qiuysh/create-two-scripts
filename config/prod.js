const { merge } = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { ESBuildMinifyPlugin } = require("esbuild-loader");
const webpack = require("webpack");
const getWebpackBase = require("./base");
const { getUserConf } = require("./defaultPaths");

module.exports = function (opts) {
  const { esbuild } = opts,
    // default webpack config
    webpackBaseConfig = getWebpackBase({
      ...opts,
      devMode: false,
    }),
    // split plugin
    { plugins = [], optimization } = webpackBaseConfig,
    // user custom webpack config
    appUserConf = getUserConf();

  if (Array.isArray(optimization?.minimizer)) {
    optimization.minimize = true;
    // support esbuild compress
    if (esbuild) {
      const esBuildMinify = new ESBuildMinifyPlugin({
        target: "es2015",
        css: true,
      });
      optimization.minimizer.push(esBuildMinify);
    } else {
      const terserOptions = {
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
        },
        terserPlugin = new TerserPlugin(terserOptions),
        cssMiniPlugin = new CssMinimizerPlugin();
      optimization.minimizer.push(terserPlugin);
      optimization.minimizer.push(cssMiniPlugin);
    }
  }

  if (Array.isArray(plugins)) {
    // cache options
    const cacheOptions = {
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
      splitPlugin = new webpack.optimize.SplitChunksPlugin({
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
        cacheGroups: cacheOptions,
      });
    plugins.push(splitPlugin);
  }

  return merge(webpackBaseConfig, {
    ...appUserConf,
    devServer: {},
  });
};
