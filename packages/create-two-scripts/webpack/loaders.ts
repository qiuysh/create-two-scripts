import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { appSrc } from "../utils/defaultPaths";

function createLoaders({ esbuild, ts, hot }) {
  const CssLoader = require.resolve("css-loader");
  const PostcssLoader = require.resolve("postcss-loader");
  const isDev: boolean =
    process.env.NODE_ENV === "development";

  const esbuildLoader = {
    loader: require.resolve("esbuild-loader"),
    options: {
      loader: ts ? "tsx" : "jsx",
      target: "es2015",
    },
  };

  const babelLoader = {
    loader: require.resolve("babel-loader"),
    options: {
      cacheDirectory: true,
      configFile: false,
      babelrc: false,
      presets: [
        [
          require.resolve("babel-preset-two-app"),
          {
            ts,
            development: isDev,
          },
        ],
      ],
      plugins: hot
        ? [require.resolve("react-refresh/babel")]
        : [],
    },
  };

  const StylesLoader = isDev
    ? require.resolve("style-loader")
    : MiniCssExtractPlugin.loader;

  return [
    {
      oneOf: [
        {
          test: /\.(j|t)s[x]?$/,
          include: appSrc,
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
          use: [StylesLoader, CssLoader, PostcssLoader],
        },
        {
          test: /\.less$/,
          exclude: /node_modules\/(!antd)/,
          use: [
            StylesLoader,
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
            StylesLoader,
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
      ],
    },
  ];
}

export default createLoaders;
