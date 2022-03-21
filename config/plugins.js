const webpack = require("webpack");
const { ESBuildPlugin } = require("esbuild-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const paths = require("./defaultPaths");

module.exports = function (opts) {
  const { esbuild, hot } = opts;

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

    esbuild && new ESBuildPlugin(),

    hot && new ReactRefreshPlugin(),
  ].filter(e => e);
};
