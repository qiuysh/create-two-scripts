/** @format */

const webpack = require("webpack");
const prodWebpackConf = require("../config/prod.js");

module.exports = function (args) {
  try {
    process.env.NODE_ENV = "production";
    const compiler = webpack(prodWebpackConf(...args));
    compiler.run((err, stats) => {
      if (err) {
        throw err;
      } else {
        console.log(stats.toJson());
        console.log("build success!");
      }
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
