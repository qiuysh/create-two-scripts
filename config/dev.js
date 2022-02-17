/** @format */

const { merge } = require("webpack-merge");
const paths = require("./defaultPaths");
const getWebpackBaseConfig = require("./base");

module.exports = function (program) {
  // default webpack config
  const webpackBaseConfig = getWebpackBaseConfig(program),
    // user custom webpack config
    appUserConf = paths.getUserConf(),
    // devServer config
    serverConf = {
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
      static: paths.appDirectory + "/public",
    },
    webpackDevConfig = {
      mode: "development",
      devtool: "cheap-module-source-map",
      devServer: serverConf,
    };

  // 配置合并
  return merge(webpackBaseConfig, {
    ...webpackDevConfig,
    ...appUserConf,
  });
};
