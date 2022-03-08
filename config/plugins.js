const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const { ESBuildPlugin } = require("esbuild-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const paths = require("./defaultPaths");

module.exports = function (opts) {
  const { esbuild, hot } = opts;

  const ignore = ["imgs/*", "styles/*", "fonts/*"];

  return [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),

    new webpack.ProgressPlugin(),

    new CopyPlugin({
      patterns: [
        {
          from: paths.appPublic,
          to: paths.appDist,
          globOptions: {
            ignore,
          },
        },
      ],
    }),

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
