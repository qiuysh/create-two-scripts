/** @format */

const MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  cssLoader = require.resolve("css-loader"),
  styleLoader = require.resolve("style-loader"),
  postcssLoader = require.resolve("postcss-loader");
const defaultPaths = require("./defaultPaths"),
  defultPresets = require("./presets")();

module.exports = function () {
  const devMode = process.env.NODE_ENV === "development";

  return [
    {
      test: /\.(js|ts[x]?)$/,
      include: defaultPaths.appSrc,
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: {
            cacheDirectory: true,
            configFile: false,
            babelrc: false,
            presets: [
              [
                defultPresets,
                {
                  useAbsoluteRuntime: true,
                },
              ],
            ],
          },
        },
        {
          loader: require.resolve("thread-loader"),
          options: {
            workers: 3,
          },
        },
      ],
    },
    {
      test: /\.css$/,
      include: defaultPaths.appSrc,
      use: [
        devMode ? styleLoader : MiniCssExtractPlugin.loader,
        cssLoader,
        postcssLoader,
      ],
    },
    {
      test: /\.less$/,
      exclude: /node_modules\/(!antd)/,
      use: [
        devMode ? styleLoader : MiniCssExtractPlugin.loader,
        cssLoader,
        {
          loader: require.resolve("less-loader"), // compiles Less to CSS
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ],
    },
    {
      test: /\.(woff|woff2|ttf|eot)$/,
      type: "asset/resource",
      generator: {
        filename: "fonts/[hash][ext][query]",
      },
    },
    {
      test: /\.(png|jpg|jpeg|gif|webp|svg)$/i,
      type: "asset/resource",
      generator: {
        filename: "images/[hash][ext][query]",
      },
    },
  ];
};
