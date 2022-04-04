const { merge } = require("webpack-merge");
const path = require("path");
const paths = require("./defaultPaths");
const getWebpackBaseConfig = require("./base");

module.exports = function (opts) {
  const { port, hot } = opts;
  // default webpack config
  const webpackBaseConfig = getWebpackBaseConfig(opts);
  // user custom webpack config
  const appUserConf = paths.getUserConf();
  // devServer config
  const devServer = {
    allowedHosts: "auto",
    client: {
      logging: "info",
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    compress: true,
    hot,
    host: "0.0.0.0",
    historyApiFallback: {
      disableDotRule: true,
      index: paths.appHtml,
    },
    open: true,
    port: port || 3001,
    static: {
      directory: paths.appDirectory,
      publicPath: "/",
    },
  };

  // merge config
  return merge(webpackBaseConfig, {
    devtool: "eval-cheap-module-source-map",
    devServer,
    ...appUserConf,
  });
};
