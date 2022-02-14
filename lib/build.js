/** @format */

const webpack = require("webpack");
const getProdConf = require("../config/prod.js"),
  { log, error } = console;

module.exports = function (args) {
  try {
    const defaultProdConf = getProdConf(...args),
      compiler = webpack(defaultProdConf);

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
