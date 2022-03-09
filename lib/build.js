const webpack = require("webpack");
const getProdWebpackConf = require("../config/prod.js");
const { error } = require("../utils");

module.exports = function (opts) {
  try {
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
    error(err);
    process.exit(1);
  }
};
