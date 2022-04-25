const webpack = require("webpack");
const { merge } = require("webpack-merge");
const webpackDevServer = require("webpack-dev-server");
const detectPort = require("detect-port");
const getDevWebpackConf = require("../webpack/base.js");
const defaultServer = require("../webpack/devServer");
const { getUserConf } = require("../webpack/defaultPaths");
const { message, inquirerPrompt } = require("../utils");

/**
 * check port
 * @param {*} port
 * @returns
 */
async function checkPort(port) {
  const newPort = await detectPort(port);
  const option = [
    {
      type: "confirm",
      message: `the port ${port} has been used, use a new port ${newPort} instead ? `,
      name: "changePort",
      default: true,
    },
  ];
  if (newPort === port) {
    return newPort;
  }
  const { changePort } = await inquirerPrompt(option);
  if (!changePort) {
    throw "process has reject!";
  }
  return newPort;
}

module.exports = async function (opts) {
  const { port } = opts;

  opts.hot = true;

  opts.ts = opts.ts || true;

  try {
    // user custom webpack config
    const appUserConf = getUserConf();
    // webpack config
    const webpackDevConfig = getDevWebpackConf(opts);

    const webpackConf = merge(webpackDevConfig, {
      devtool: "eval-cheap-module-source-map",
      ...appUserConf,
    });
    // webpack config instance
    const compiler = webpack(webpackConf);

    const finallyDevServer = {
      ...defaultServer,
      ...appUserConf.devServer,
    };
    // inline port overwrite devServer port
    const realPort = await checkPort(
      port || finallyDevServer.port
    );
    // get real server port
    finallyDevServer.port = realPort;

    // devServer config
    const server = new webpackDevServer(
      finallyDevServer,
      compiler
    );
    // devServer start callback
    server.startCallback(err => {
      if (err) {
        throw err;
      }
    });
  } catch (err) {
    message("error", err);
    process.exit(500);
  }
};
