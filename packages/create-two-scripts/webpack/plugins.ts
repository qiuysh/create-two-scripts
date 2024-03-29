import webpack from "webpack";
import { ESBuildPlugin } from "esbuild-loader";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { readJsonSync } from "../utils";
import { appHtml, appPackageJson } from "../utils/paths";
import { PackageProps } from "../typings";
export interface CacheOptionsProps {
  [index: string]:
    | string
    | number
    | boolean
    | RegExp
    | void;
}

function createPlugins({ esbuild, isDev }) {
  // app package
  const appPackage: PackageProps =
    readJsonSync(appPackageJson);

  // cache options
  const cacheOptions: { [key: string]: CacheOptionsProps } =
    {
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
      template: appHtml,
      title: appPackage.name,
      templateParameters: {
        configPath: "config.js",
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

    isDev && new ReactRefreshPlugin(),
  ].filter(Boolean);
}

export default createPlugins;
