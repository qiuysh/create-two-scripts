/** @format */

const paths = require("./defaultPaths");

module.exports = function () {
  return {
    static: {
      directory: paths.appDirectory,
      staticOptions: {},
      serveIndex: true,
      watch: true,
    },
    client: {
      logging: "info",
      overlay: true,
      progress: true,
    },
    host: "0.0.0.0",
    port: 3001,
    historyApiFallback: true,
    allowedHosts: "all",
    compress: true,
    open: true,
  };
};
