const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const paths = require("./defaultPaths");
const getPresets = require("./presets");

module.exports = function (opts) {
  // 参数
  const { esbuild, devMode } = opts;
  const { presets, plugins } = getPresets(opts);
  const CssLoader = require.resolve("css-loader");
  const StyleLoader = require.resolve("style-loader");
  const PostcssLoader = require.resolve("postcss-loader");
  const esbuildLoader = {
    loader: require.resolve("esbuild-loader"),
    options: {
      loader: "tsx",
      target: "es2015",
    },
  };
  const babelLoader = {
    loader: require.resolve("babel-loader"),
    options: {
      cacheDirectory: true,
      configFile: false,
      babelrc: false,
      presets,
      plugins,
    },
  };
  const stylesLoader = devMode
    ? StyleLoader
    : MiniCssExtractPlugin.loader;

  return [
    {
      test: /\.(js|ts[x]?)$/,
      include: paths.appSrc,
      use: [
        esbuild ? esbuildLoader : babelLoader,
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
      exclude: /node_modules\/(!antd)/,
      use: [stylesLoader, CssLoader, PostcssLoader],
    },
    {
      test: /\.less$/,
      exclude: /node_modules\/(!antd)/,
      use: [
        stylesLoader,
        CssLoader,
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
      test: /\.s[ac]ss$/i,
      exclude: /node_modules/,
      use: [
        stylesLoader,
        CssLoader,
        {
          loader: require.resolve("sass-loader"),
          options: {
            // Prefer `dart-sass`
            implementation: require.resolve("sass"),
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
