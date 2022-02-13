/** @format */

const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const getDevConf = require("../config/dev");
const getDevServer = require("../config/devServer");
const { getUserConf } = require("../config/defaultPaths"),
  { log, error } = console;

module.exports = function (args) {
  try {
    const defaultDevServer = getDevServer(),
      appUserConf = getUserConf(),
      { devServer } = appUserConf,
      defaultDevConf = getDevConf(...args),
      compiler = webpack(defaultDevConf),
      server = new webpackDevServer(
        {
          ...defaultDevServer,
          ...devServer,
        },
        compiler,
      );

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
