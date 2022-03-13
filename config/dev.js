const { merge } = require("webpack-merge");
const paths = require("./defaultPaths");
const getWebpackBaseConfig = require("./base");

module.exports = function (opts) {
  const { port } = opts;
  // default webpack config
  const webpackBaseConfig = getWebpackBaseConfig({
    ...opts,
    hot: true,
    devMode: true,
  });
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
    host: "0.0.0.0",
    historyApiFallback: true,
    open: true,
    port: port || 3001,
    static: {
      directory: paths.appDirectory,
      publicPath: "/",
      watch: true,
    },
  };

  // merge config
  return merge(webpackBaseConfig, {
    devtool: "eval-cheap-module-source-map",
    devServer,
    ...appUserConf,
  });
};
