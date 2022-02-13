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
      { port, host } = defaultDevServer,
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

    compiler.hooks.done.tap("done", stats => {
      if (stats.hasErrors()) {
        error(
          stats.toString({
            colors: true,
          }),
        );
      }
    });

    server.startCallback(err => {
      if (err) {
        error(err);
        process.exit(500);
      }
      log(`server start: http://${host}:${port}`);
    });
  } catch (err) {
    error(err);
    process.exit(500);
  }
};
