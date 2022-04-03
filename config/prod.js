const { merge } = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { ESBuildMinifyPlugin } = require("esbuild-loader");
const webpack = require("webpack");
const getWebpackBase = require("./base");
const { getUserConf } = require("./defaultPaths");

module.exports = function (opts) {
  const { esbuild } = opts;
  // default webpack config
  const webpackBaseConfig = getWebpackBase(opts);
  // split plugin
  const { plugins = [], optimization } = webpackBaseConfig;
  // user custom webpack config
  const appUserConf = getUserConf();

  if (Array.isArray(optimization?.minimizer)) {
    optimization.runtimeChunk = true;
    optimization.minimize = true;
    optimization.moduleIds = "deterministic";
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
      };
      const terserPlugin = new TerserPlugin(terserOptions);
      const cssMiniPlugin = new CssMinimizerPlugin();
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
    };
    const splitPlugin =
      new webpack.optimize.SplitChunksPlugin({
        chunks: "all",
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
