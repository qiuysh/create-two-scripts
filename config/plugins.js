/** @format */

const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const defaultPaths = require("./defaultPaths");

module.exports = function (params) {
  const defaultPlugins = [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),

    new CopyPlugin(
      [
        {
          from: defaultPaths.appPublic,
        },
      ],
      {
        ignore: [
          "json/*.ts",
          "imgs/*",
          "styles/*",
          "fonts/emfont/*",
          "sw.js",
        ],
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
      filename: "[name].[contenthash].css",
      chunkFilename:
        "assets/styles/[name].[contenthash].css",
    }),
  ];

  return defaultPlugins;
};
