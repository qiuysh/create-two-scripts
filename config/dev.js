const { merge } = require("webpack-merge");
const paths = require("./defaultPaths");
const getWebpackBaseConfig = require("./base");

module.exports = function (opts) {
  // default webpack config
  const webpackBaseConfig = getWebpackBaseConfig({
    ...opts,
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
    port: 3001,
    static: {
      directory: paths.appPublic,
    },
  };

  // 配置合并
  return merge(webpackBaseConfig, {
    devtool: "cheap-module-source-map",
    devServer,
    ...appUserConf,
  });
};
