const webpack = require("webpack");
const getProdWebpackConf = require("../config/prod.js");
const { message } = require("../utils");

module.exports = function (opts) {
  try {
    opts.ts = opts.ts || true;
    // get base webpack config
    const webpackProdConfig = getProdWebpackConf(opts);
    // get webpack instance
    const compiler = webpack(webpackProdConfig);
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
