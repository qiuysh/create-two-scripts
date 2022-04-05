const webpack = require("webpack");
const { ESBuildPlugin } = require("esbuild-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const paths = require("./defaultPaths");

module.exports = function (opts) {
  const { esbuild, hot } = opts;
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
      test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|js-cookie)[\\/]/,
      name: "default-vendors",
      chunks: "all",
    },
    default: {
      minChunks: 2,
      priority: -20,
      reuseExistingChunk: true,
    },
  };

  return [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),

    new webpack.ProgressPlugin(),
    // https://github.com/Urthen/case-sensitive-paths-webpack-plugin#readme
    new CaseSensitivePathsPlugin(),

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: paths.appHtml,
      title: paths.appPackageJson.name,
      templateParameters: {
        configPath: `config.js`,
      },
      inject: "body",
    }),

    new MiniCssExtractPlugin({
      filename: "./styles/[name].[contenthash].css",
      chunkFilename: "./styles/[id].[contenthash].css",
    }),

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
    }),

    esbuild && new ESBuildPlugin(),

    hot && new ReactRefreshPlugin(),
  ].filter(e => e);
};
