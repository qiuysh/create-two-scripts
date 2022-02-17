/** @format */

const webpack = require("webpack");
const chalk = require("chalk");
const webpackDevServer = require("webpack-dev-server");
const getDevWebpackConf = require("../config/dev");
const { getUserConf } = require("../config/defaultPaths");
const { error } = require("../utils");

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
        throw err;
      }
    });
  } catch (err) {
    error(chalk.red(err));
    process.exit(500);
  }
};
