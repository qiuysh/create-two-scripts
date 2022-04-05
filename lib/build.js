const webpack = require("webpack");
const { merge } = require("webpack-merge");
const getProdWebpackConf = require("../config/base.js");
const { getUserConf } = require("../config/defaultPaths");
const { message } = require("../utils");

module.exports = function (opts) {
  try {
    opts.ts = opts.ts || true;
    // get base webpack config
    const webpackProdConfig = getProdWebpackConf(opts);

    const appUserConf = getUserConf();

    const webpackConfig = merge(webpackProdConfig, {
      ...appUserConf,
      devServer: {},
    });
    // get webpack instance
    const compiler = webpack(webpackConfig);
    // start a webpack compiler
    compiler.run(err => {
      if (err) {
        throw err;
      }
    });
  } catch (err) {
    message("error", err);
    process.exit(1);
  }
};
