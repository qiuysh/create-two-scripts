/** @format */

const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const defaultPaths = require("./defaultPaths");

module.exports = function (params) {
  return [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),

    new webpack.ProgressPlugin(),

    new CopyPlugin(
      [
        {
          from: defaultPaths.appPublic,
        },
      ],
      {
        ignore: ["imgs/*", "styles/*", "fonts/*"],
      },
    ),

    new HtmlWebpackPlugin({
      template: defaultPaths.appHtml,
      title: defaultPaths.appPackageJson.name,
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
