const webpack = require("webpack");
const getProdWebpackConf = require("../config/prod.js");
const { error } = require("../utils");

module.exports = function (args) {
  try {
    // get base webpack config
    const webpackProdConfig = getProdWebpackConf(...args),
      // get webpack instance
      compiler = webpack(webpackProdConfig);

    // start a webpack compiler
    compiler.run((err, stats) => {
      if (err) {
        throw err;
      }
    });
  } catch (err) {
    error(err);
    process.exit(1);
  }
};
