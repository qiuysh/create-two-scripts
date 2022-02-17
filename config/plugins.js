/** @format */

const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const paths = require("./defaultPaths");

module.exports = function () {
  const ignore = ["imgs/*", "styles/*", "fonts/*"];

  return [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),

    new webpack.ProgressPlugin(),

    new CopyPlugin(
      [
        {
          from: paths.appPublic,
        },
      ],
      {
        ignore,
      },
    ),

    new HtmlWebpackPlugin({
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
  ];
};
