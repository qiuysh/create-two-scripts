/** @format */

const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const getDevWebpackConf = require("../config/dev");
const { getUserConf } = require("../config/defaultPaths"),
  { log, error } = console;

module.exports = function (args) {
  try {
    // user custom webpack config
    const { devServer } = getUserConf(),
      // webpack config
      webpackDevConfig = getDevWebpackConf(...args),
      // webpack config instance
      compiler = webpack(webpackDevConfig),
      // devServer config
      server = new webpackDevServer(devServer, compiler);
    // devServer start callback
    server.startCallback(err => {
      if (err) {
        error(err);
        process.exit(500);
      }
    });
  } catch (err) {
    error(err);
    process.exit(500);
  }
};
