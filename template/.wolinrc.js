const path = require('path');
const webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');
const VERSION = JSON.stringify(require("./package.json").version); // app version.

const isProd = process.env.NODE_ENV === "production";

module.exports = {

  entry: {
    app: './src/app.tsx',
  },

  module: {
    rules: [
      {
        test: /\.(js|ts[x]?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: 'thread-loader',
            options: {
              workers: 3,
            },
          }
        ]
      }
    ]
  },

  optimization: {
    usedExports: true,
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          },
          format: {
            comments: false
          }
        },
        extractComments: false
      }),
    ],
  },

  resolve: {
    fallback: {
      "@": path.resolve(__dirname, './src'),
      "public": path.resolve(__dirname, './public'),
    },
  },


  devServer: {
    host: '0.0.0.0',
    port: 3001,
    open: false,
  },
};