/** @format */

const MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  cssLoader = require.resolve("css-loader"),
  styleLoader = require.resolve("style-loader"),
  postcssLoader = require.resolve("postcss-loader");
const paths = require("./defaultPaths");
const getPresets = require("./presets");

module.exports = function (params) {
  const devMode = process.env.NODE_ENV === "development",
    { presets, plugins } = getPresets({
      ...params,
      devMode,
    }),
    loaderConfigs = [],
    defaultBabelOptions = {
      cacheDirectory: true,
      configFile: false,
      babelrc: false,
      presets,
      plugins,
    },
    jsLoader = {
      test: /\.(js|ts[x]?)$/,
      include: paths.appSrc,
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: defaultBabelOptions,
        },
        {
          loader: require.resolve("thread-loader"),
          options: {
            workers: 3,
          },
        },
      ],
    },
    css3Loader = {
      test: /\.css$/,
      include: paths.appSrc,
      use: [
        devMode ? styleLoader : MiniCssExtractPlugin.loader,
        cssLoader,
        postcssLoader,
      ],
    },
    lessLodaer = {
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
    fontsLoader = {
      test: /\.(woff|woff2|ttf|eot)$/,
      type: "asset/resource",
      generator: {
        filename: "fonts/[hash][ext][query]",
      },
    },
    staticLoader = {
      test: /\.(png|jpg|jpeg|gif|webp|svg)$/i,
      type: "asset/resource",
      generator: {
        filename: "images/[hash][ext][query]",
      },
    };

  if (jsLoader) {
    loaderConfigs.push(jsLoader);
  }

  if (css3Loader && lessLodaer) {
    loaderConfigs.push(css3Loader);
    loaderConfigs.push(lessLodaer);
  }

  if (fontsLoader) {
    loaderConfigs.push(fontsLoader);
  }

  if (staticLoader) {
    loaderConfigs.push(staticLoader);
  }

  return loaderConfigs;
};
